import { Directive, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableComponent } from '../table.component';
import { ITableColumn } from '../cell-components/cell-components';
import {
  LazyLoadEvent,
  FilterDataResponse,
} from '../components/table-filters/lazy-load-event.type';
import { BaseComponent } from '../core/components/base-component.directive';

export type ITabledPage<T, E> = Partial<
  Pick<
    TableComponent<T, E>,
    | 'loading'
    | 'loadingRowsLength'
    | 'extendsColumns'
    | 'getExtendsColumnsArr'
    | 'getExtendsData'
    | 'hideHeader'
    | 'tableBodyStyle'
    | 'columns'
    | 'items'
  >
>;

@Directive()
export abstract class TableBasePager<T = any, E = T>
  extends BaseComponent
  implements ITabledPage<T, E>
{
  protected dataEvent: BehaviorSubject<LazyLoadEvent> =
    new BehaviorSubject<LazyLoadEvent>(null);
  @ViewChild('tc', { static: false }) public tc: TableComponent;

  public loadingRowsLength?: number;
  public loading = true;
  public hideHeader?: boolean;
  public columns: ITableColumn<T>[];
  public items: T[];
  public totalRecords: number;

  //  public abstract filters: TableFilter<T>[];

  public abstract getDataProvider(
    evt: LazyLoadEvent
  ): Observable<FilterDataResponse<T>>;

  protected constructor() {
    super();
    // this.dataEvent
    //   .pipe(
    //     this.takeUntilDestroy(),
    //     debounceTime(100),
    //     switchMap((evt) => {
    //       console.log('TableBasePager dataEvent.pipe evt', evt);
    //       this.loading = true;
    //       return this.getDataProvider(evt) || EMPTY;
    //     })
    //   )
    //   .pipe(tap((data) => {
    //     console.log('table-page dataEvent', data);
    //     debugger;
    //   }))
    //   .subscribe(({ data, totalRecords }) => {
    //     this.items = data || [];
    //     this.totalRecords = totalRecords;
    //     this.loading = false;
    //   });
  }
}
