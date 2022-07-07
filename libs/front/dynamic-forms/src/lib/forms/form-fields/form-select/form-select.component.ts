// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { FormControl, FormGroup } from '@angular/forms';
// import { tap } from 'rxjs/operators';
// import { FormSelectData } from './form-select';
// import { FieldConfig } from '../../@core/interfaces/field-config';
// import { Field } from '../../@core/interfaces/field';

// @Component({
//   selector: 'app-form-select',
//   templateUrl: './form-select.component.html',
//   styleUrls: ['./form-select.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormSelectComponent extends BaseFieldDirective<FormControl> implements Field<FormSelectData>, OnInit {
//   public config: FieldConfig<any>;
//   public group: FormGroup;
//   public id: string;

//   public ngOnInit(): void {
//     const valid = this.config.data && this.config.data.autoSelect != false;
//     if (this.config.optionsArr$ && !!valid) {
//       this.config.optionsArr$ = this.config.optionsArr$.pipe(
//         tap((res) => {
//           if (res?.length === 1) {
//             this.control.setValue(res[0].value);
//           }
//         })
//       );
//     }
//   }
// }
