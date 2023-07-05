// import {
//   ChangeDetectionStrategy,
//   Component,
//   ViewChild,
//   OnInit,
// } from '@angular/core';
// import { FormControl } from '@angular/forms';
// import { PageDataResponse } from '@fnx-nx/api-interfaces';
// import { catchError, of, Subject, switchMap } from 'rxjs';
// import { BaseFieldComponentDirective } from '../../forms/core/directives/base-field.directive';
// import { takeWhile, tap } from 'rxjs/operators';
// import { FormTableData } from './form-table-data';
// import { TableComponent } from '@fnx-nx/front/dynamic-table';

// @Component({
//   selector: 'fnx-nx-form-table',
//   template: `
//     <fnx-nx-app-table
//       [columns]="data?.columns"
//       [tableBodyStyle]="data?.tableBodyStyle"
//       [items]="(resultSubject | async)?.data"
//     >
//     </fnx-nx-app-table>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormTableComponent<T = any, K extends keyof T = keyof T>
//   extends BaseFieldComponentDirective<T, FormTableData<T, K>, K, FormControl>
//   implements OnInit
// {
//   @ViewChild('tc', { static: false }) public tc: TableComponent;
//   public resultSubject: Subject<PageDataResponse<T[K]>> = new Subject<
//     PageDataResponse<T[K]>
//   >();

//   // public get columnsPlusCheckbox(): this['data']['columns'] {
//   //   return [
//   //     {
//   //       field: '' as any,
//   //       type: 'Default',
//   //       parsedHtmlData: () => '<input type="checkbox" >',
//   //     },
//   //     ...(this.data?.columns || []),
//   //   ];
//   // }

//   public loadingData: boolean;
//   public ngOnInit(): void {
//     this.data?.evt$
//       .pipe(
//         tap(() => (this.loadingData = true)),
//         takeWhile(() => this.isActive),
//         switchMap((evt) => {
//           return this.config.data
//             .getDataProvider(evt)
//             .pipe(catchError((err) => of(err)));
//         })
//       )
//       .subscribe((res) => {
//         this.resultSubject.next(res);
//         this.loadingData = false;
//       });
//   }
// }
