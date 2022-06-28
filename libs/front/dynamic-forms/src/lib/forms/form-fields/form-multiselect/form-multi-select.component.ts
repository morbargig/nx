// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { Field, FieldConfig } from '../../@core/interfaces';
// import { FormGroup } from '@angular/forms';
// import { FormMultiSelectDataModel } from './form-multi-select.data.model';

// @Component({
//   selector: 'app-form-multi-select',
//   templateUrl: './form-multi-select.component.html',
//   styleUrls: ['./form-multi-select.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormMultiSelectComponent extends BaseFieldDirective implements Field<FormMultiSelectDataModel> {
//   public config: FieldConfig<any>;
//   public group: FormGroup;
//   public id: string;

//   public get data(): FormMultiSelectDataModel {
//     return this?.config?.data
//   }

//   getValue(evt: any): any[] {
//     return Array.from(evt.target.selectedOptions).map((option: any) => option.value);
//   }

//   valueChange(val: { value: any[], options: any[] }): void {
//     !!Array.isArray(val.value) && !!this.data?.onOptionChange && this.data?.onOptionChange(val?.options);
//     !!Array.isArray(val.value) && !!this.config.onChange && this.config.onChange(val?.value, this.control);
//   }
// }
