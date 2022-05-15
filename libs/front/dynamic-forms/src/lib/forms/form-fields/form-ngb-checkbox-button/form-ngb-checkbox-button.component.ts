// import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { BaseFieldDirective } from '../../@core/directives/base-field.directive';
// import { Field, FieldConfig } from '../../@core/interfaces';
// import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
// import { NgbCheckbox } from './ngb-checkbox';
// import { map, takeWhile } from 'rxjs/operators';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-form-ngb-checkbox-button',
//   templateUrl: './form-ngb-checkbox-button.component.html',
//   styleUrls: ['./form-ngb-checkbox-button.component.scss'],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class FormNgbCheckboxButtonComponent extends BaseFieldDirective<FormGroup> implements Field, OnInit {
//   public controlNames: string[];
//   public deleted: boolean = false;
//   public _config: FieldConfig<NgbCheckbox>;
//   public set config(conf: FieldConfig<NgbCheckbox>) {
//     this.controlNames = conf && conf.data && conf.data.controlNames;
//     this._config = conf;
//   }
//   public get config(): FieldConfig<NgbCheckbox> {
//     return this._config;
//   }
//   public group: FormGroup;
//   public id: string;
//   public allChecked$: Observable<boolean>;

//   constructor(private fb: FormBuilder) {
//     super();
//   }

//   ngOnInit(): void {
//     for (let i = 0; i < this.controlNames.length; i++) {
//       const name = this.controlNames[i];
//       this.control.addControl(name, this.fb.control(false));
//     }

//     this.allChecked$ = this.control.valueChanges.pipe(
//       map((value) => this.controlNames.every((n) => !!value[n])),
//       takeWhile((x) => this.isActive)
//     );

//     if (!!this.config?.data?.editMode) {
//       this.control.addControl('isCustom', this.fb.control(true));
//     }
//   }

//   onChange(name: string, val: boolean) {
//     if (this.config.onChange) {
//       this.config.onChange({ [name]: val }, this.control);
//     }
//   }

//   toggleAll(allChecked: boolean) {
//     for (let i = 0; i < this.controlNames.length; i++) {
//       const name = this.controlNames[i];
//       this.control.controls[name].setValue(allChecked);
//     }
//   }

//   public deleteGroup(control: AbstractControl) {
//     this.deleted = true;
//     setTimeout(() => {
//       delete control.parent.controls[this.config.name];
//     }, 0);
//   }

//   public deleteControl(index: number) {
//     this.controlNames.splice(index, 1);
//     if (!this.controlNames?.length) {
//       this.deleteGroup(this.control);
//     }
//   }
// }
