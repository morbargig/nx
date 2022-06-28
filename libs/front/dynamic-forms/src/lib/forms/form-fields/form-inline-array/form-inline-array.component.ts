// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
// import { FormArrayData } from '../form-array/form-array';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { Field } from '../../@core/interfaces/field';
// import { FieldConfig } from '../../@core/interfaces/field-config';

// @Component({
//   selector: 'app-form-inline-array',
//   templateUrl: './form-inline-array.component.html',
//   styleUrls: ['./form-inline-array.component.scss']
// })
// export class FormInlineArrayComponent extends BaseFieldDirective<FormArray> implements Field<FormArrayData>, OnInit {
//   public config: FieldConfig<FormArrayData>;
//   public group: FormGroup;
//   public id: string;

//   constructor(private fb: FormBuilder) {
//     super();
//   }

//   ngOnInit(): void {
//     if (!(this.control instanceof FormArray)) {
//       this.group.removeControl(this.config.name);
//       this.group.addControl(
//         this.config.name,
//         this.fb.array([], this.config.validation || [], this.config.asyncValidation || [])
//       );
//     }
//   }

// }
