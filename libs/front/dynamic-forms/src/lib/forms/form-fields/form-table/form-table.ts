// import { Observable, Subject } from 'rxjs';
// import { LazyLoadEvent, FilterDataResponse } from '../../../shared/components/table/table-filters/lazy-load-event.type';
// import { ITableColumn } from '../../../shared/components/table/cell-components/cell-components';

// export class FormTable<T = any> {
//   constructor(obj: FormTable = null) {
//     if (!!obj) {
//       Object.keys(obj).forEach((key) => (this[key] = obj[key]));
//     }
//   }

//   public columns: ITableColumn<T>[];
//   public getDataProvider: (evt: LazyLoadEvent) => Observable<FilterDataResponse<T>>;
//   public dataKey: string;
// }
