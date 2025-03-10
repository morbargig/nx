import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import {
  FilterDataResponse,
  LazyLoadEvent,
  TableFiltersServiceService,
} from '@softbar/front/dynamic-table';
import {
  ExtractPaths,
  BFF_ROUTES_TYPE,
  ResolvePath,
} from '@softbar-bff-routes';

type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

@Injectable({
  providedIn: 'root',
})
export abstract class LocalStorageHttpService<
  C extends ExtractPaths<BFF_ROUTES_TYPE> = ExtractPaths<BFF_ROUTES_TYPE>,
  T extends { id: number } = { id: number }
> implements Omit<BaseHttpService<C>, 'httpClient' | 'getUrl'>
{
  constructor(
    public controllerPath: C,
    protected tableFiltersServiceService: TableFiltersServiceService
  ) {}
  public get apiUrl(): string {
    throw new Error('Method not implemented.');
  }

  key<
    H extends keyof {
      [key in keyof ResolvePath<
        BFF_ROUTES_TYPE,
        ExtractPaths<BFF_ROUTES_TYPE>
      > as `${ExtractPaths<BFF_ROUTES_TYPE>}/${Extract<key, string>}`]?: key;
    },
    K extends keyof ResolvePath<BFF_ROUTES_TYPE, ExtractPaths<BFF_ROUTES_TYPE>>
  >(key: K): H {
    return `${this.controllerPath}/${key}` as H;
  }

  static collections: Mutable<{
    [key in keyof ResolvePath<
      BFF_ROUTES_TYPE,
      ExtractPaths<BFF_ROUTES_TYPE>
    > as `${ExtractPaths<BFF_ROUTES_TYPE>}/${Extract<
      key,
      string
    >}`]?: BehaviorSubject<any[]>;
  }> = {};

  getCollection<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R): BehaviorSubject<T[]> {
    const newKey = this.key(key);
    if (!LocalStorageHttpService.collections[newKey]) {
      const data = this.getDataFromStorage<R, U, T>(key);
      LocalStorageHttpService.collections[newKey] = new BehaviorSubject<T[]>(
        data
      );
    }
    return LocalStorageHttpService.collections[newKey];
  }

  getCollectionLazyLoad<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R, evt: LazyLoadEvent<T>): Observable<FilterDataResponse<T>> {
    const newKey = this.key(key);
    if (!LocalStorageHttpService.collections[newKey]) {
      const data = this.getDataFromStorage<R, U, T>(key);
      LocalStorageHttpService.collections[newKey] = new BehaviorSubject<T[]>(
        data
      );
    }
    return LocalStorageHttpService.collections[newKey]?.pipe(
      map((i) => {
        return this.tableFiltersServiceService.filter(i, evt);
      })
      // delay(300)
    );
  }

  protected getDataFromStorage<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: K;
    }[R] = {
      [K in R]: K;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R): T[] {
    const storedData = localStorage.getItem(`${this.controllerPath}/${key}`);
    return storedData ? JSON.parse(storedData) : [];
  }

  protected saveDataToStorage<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string
  >(key: R, data: any[]): void {
    const newKey = this.key(key);
    localStorage.setItem(`${this.controllerPath}/${key}`, JSON.stringify(data));
    LocalStorageHttpService.collections[newKey]?.next(data);
  }

  get<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'get' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R, { params }: { params: { id: number } }): Observable<T> {
    return this.getCollection<R, U, T>(key)
      .asObservable()
      ?.pipe(map((l) => l?.find((i) => i?.id === Number(params.id))));
  }

  post<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'post' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'post' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R, item: T): Observable<T> {
    const collection = this.getDataFromStorage(key);
    const maxId =
      collection.length > 0
        ? Math.max(...collection.map((obj) => obj.id || 0))
        : 0;
    item.id = maxId + 1;
    collection.push(item);
    this.saveDataToStorage(key, collection);
    return of(item);
  }

  put<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'post' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'post' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R, updatedItem: T): Observable<T> {
    const collection = this.getDataFromStorage(key).map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    this.saveDataToStorage(key, collection);
    return of(updatedItem);
  }

  delete<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'delete' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'delete' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(key: R, { body }: { body: { id: string | number } }): Observable<T> {
    let deletedItem: T;
    const collection = this.getDataFromStorage<R, U, T>(key).filter((item) => {
      if (item.id !== body?.id) {
        return true;
      } else {
        deletedItem = item;
      }
    });
    this.saveDataToStorage(key, collection);
    return of(deletedItem);
  }
}

// @Injectable({
//   providedIn: 'root',
// })
// export class ExamLocalStorageService extends LocalStorageHttpService<'school'> {
//   constructor(tableFiltersServiceService: TableFiltersServiceService) {
//     super('school', tableFiltersServiceService);
//     if (!this.getDataFromStorage('exam')?.length) {
//       this.saveDataToStorage('exam', EXAM_DATA);
//     }
//   }
// }
