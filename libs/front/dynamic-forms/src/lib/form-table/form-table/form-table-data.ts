import { BaseFieldData } from '../../forms/core/interfaces/field-config';
import { LazyLoadEvent, PageDataResponse } from '@fnx-nx/api-interfaces';
import type { TableComponent } from '@fnx-nx/front/dynamic-table/lib/table/table.component';
import { Observable, BehaviorSubject, ObservedValueOf } from 'rxjs';

export interface FormTableData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  evt$: BehaviorSubject<LazyLoadEvent<T[K]>>;
  getDataProvider: (
    evt?: ObservedValueOf<this['evt$']>
  ) => Observable<PageDataResponse<T[K]>>;
  columns?: TableComponent<T[K]>['columns'];
  tableBodyStyle?: TableComponent['tableBodyStyle'];
}
