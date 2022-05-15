// import {
//   Component,
//   OnInit,
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
// } from '@angular/core';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { DynamicFormStepMode, Field, FieldConfig } from '../../@core/interfaces';
// import { FormGroup, Validators, FormControl } from '@angular/forms';
// import { FormSwitcher } from './form-switcher';
// import { FormNgbRadioButtonsComponent } from '../form-ngb-radio-buttons/form-ngb-radio-buttons.component';
// import { filter } from 'rxjs/operators';
// import { DynamicFormControl } from '../../@core/interfaces/dynamic-form-control';
// @Component({
//   selector: 'app-form-switcher',
//   templateUrl: './form-switcher.component.html',
//   styleUrls: ['./form-switcher.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormSwitcherComponent extends BaseFieldDirective<FormGroup> implements Field<FormSwitcher>, OnInit {
//   public config: FieldConfig<FormSwitcher>;
//   public group: FormGroup;
//   public id: string;

//   public title: string;
//   public switcherConfig: DynamicFormControl;
//   public switchableForm: DynamicFormControl[];
//   constructor(private cd: ChangeDetectorRef) {
//     super();
//   }

//   ngOnInit(): void {
//     this.title = this.config.data?.title;
//     this.switcherConfig = {
//       type: FormNgbRadioButtonsComponent,
//       config: {
//         name: this.config.name,
//         optionsArr: this.config.optionsArr,
//         label: this.config.label,
//         mode: DynamicFormStepMode.Inline,
//         onChange: (val, ctrl: FormControl) => {
//           this.switchableForm = this.config.data.switchDynamicForm(val, ctrl);
//         },
//         validation: [Validators.required],
//       },
//     };
//     if (this.config.setter) {
//       this.config.setter.pipe(filter((evt) => evt.type == 'setValue')).subscribe(({ value }) => {
//         this.switchableForm = this.config.data.switchDynamicForm(value, this.group.controls[this.config.name]);
//         this.cd.markForCheck();
//       });
//     }
//   }
// }
