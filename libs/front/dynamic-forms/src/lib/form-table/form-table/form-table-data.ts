// import { BaseFieldData } from '../../forms/core/interfaces/field-config';
// import { Observable, BehaviorSubject, ObservedValueOf } from 'rxjs';
// import { LazyLoadEvent, PageDataResponse } from '../../forms/core/interfaces/lazy-load-event';
// // import { ITableColumn } from '../../cell-components/cell-components';
// import { ITableColumn } from '@softbar/dynamic-table';

// // /src/lib/table/cell-components/cell-components

// export interface FormTableData<T = any, K extends keyof T = keyof T>
//   extends BaseFieldData<T, K> {
//   evt$: BehaviorSubject<LazyLoadEvent<T[K]>>;
//   getDataProvider: (
//     evt?: ObservedValueOf<this['evt$']>
//   ) => Observable<PageDataResponse<T[K]>>;
//   columns?: ITableColumn<T>;
//   tableBodyStyle?: ITableColumn<T>['tableBodyStyle'];
// }
