import { Directive, ViewChild } from '@angular/core';
import {
  BehaviorSubject,
  debounceTime,
  EMPTY,
  Observable,
  switchMap,
} from 'rxjs';
import { TableComponent } from '../table.component';
import { ITableColumn } from '../cell-components/cell-components';
import {
  LazyLoadEvent,
  FilterDataResponse,
} from '../components/table-filters/lazy-load-event.type';
import { BaseComponent } from '../core/components/base-component.directive';
import { ITableFilter } from '../components/table-filters/components/table-filters/helpers';

export type ITabledPage<T, E> = Partial<
  Pick<
    TableComponent<T, E>,
    | 'loading'
    | 'loadingRowsLength'
    | 'hideHeader'
    | 'tableBodyStyle'
    | 'columns'
    | 'items'

    | 'extendsColumns'
    | 'getExtendsColumnsArr'
    | 'getExtendsData'
  >
>;

@Directive()
export abstract class TableBasePager<T = any, E = T>
  extends BaseComponent
  implements ITabledPage<T, E>
{
  protected readonly lazyEvent: BehaviorSubject<LazyLoadEvent> =
    new BehaviorSubject<LazyLoadEvent>(null);
  @ViewChild('tc', { static: false }) public tc: TableComponent;

  public loadingRowsLength?: number;
  public loading = true;
  public hideHeader?: boolean;
  public columns: ITableColumn<T>[];
  public items: T[];
  public totalRecords: number;
  public abstract filters: ITableFilter<T>[];

  public abstract getDataProvider(
    evt: LazyLoadEvent
  ): Observable<FilterDataResponse<T>>;

  constructor() {
    super();
    this.lazyEvent
      .pipe(
        this.takeUntilDestroy(),
        debounceTime(100),
        switchMap((evt) => {
          // console.log('TableBasePager dataEvent.pipe evt', evt);
          this.loading = true;
          return this.getDataProvider(evt) || EMPTY;
        })
      )
      .pipe(
        // tap((data) => {
        //   console.log('table-page dataEvent', data);
        // }),
        this.takeUntilDestroy()
      )
      .subscribe(({ data, totalRecords }) => {
        this.items = data || [];
        this.totalRecords = totalRecords;
        this.loading = false;
      });
  }
}
