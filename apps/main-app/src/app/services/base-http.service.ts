import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ExtractPaths,
  BFF_ROUTES_TYPE,
  ResolvePath,
} from '@softbar-bff-routes';

type SkipFirst<T extends any[]> = T extends [infer _First, ...infer Rest]
  ? Rest
  : never;

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService<
  C extends ExtractPaths<BFF_ROUTES_TYPE> = ExtractPaths<BFF_ROUTES_TYPE>
> {
  public controllerPath: C;

  public get apiUrl() {
    return `${'/api'}/${this.controllerPath}`;
  }

  constructor(protected httpClient: HttpClient) {}

  getUrl<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string
  >(path: R) {
    return `${this.apiUrl}${path?.toString()}`;
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
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['post']>>) {
    return this.httpClient.post<T>(this.getUrl(url), ...params);
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
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['get']>>) {
    return this.httpClient.get<T>(this.getUrl(url), ...params);
  }
  put<
    R extends C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string = C extends ExtractPaths<BFF_ROUTES_TYPE>
      ? keyof ResolvePath<BFF_ROUTES_TYPE, C>
      : string,
    U extends {
      [K in R]: 'put' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R] = {
      [K in R]: 'put' extends ResolvePath<BFF_ROUTES_TYPE, C>[K]['method']
        ? K
        : never;
    }[R],
    T extends ResolvePath<BFF_ROUTES_TYPE, C>[U]['response'] = ResolvePath<
      BFF_ROUTES_TYPE,
      C
    >[U]['response']
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['put']>>) {
    return this.httpClient.put<T>(this.getUrl(url), ...params);
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
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['delete']>>) {
    return this.httpClient.delete<T>(this.getUrl(url), ...params);
  }
}
