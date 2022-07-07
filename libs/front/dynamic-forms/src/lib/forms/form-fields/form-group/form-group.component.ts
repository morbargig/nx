import { FormGroup, FormArray } from '@angular/forms';
import { BaseFieldComponent } from '../../core/directives/base-field.directive';
import { FormGroupData } from './form-group';
import { Component } from '@angular/core';

@Component({
  selector: 'fnx-nx-app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
})
export class FormGroupComponent<
  T = any,
  K extends keyof T = keyof T
> extends BaseFieldComponent<T, FormGroupData<T, K>, K, FormGroup> {
  setForm(form: FormGroup) {
    switch (this.parentForm.constructor) {
      case FormGroup: {
        this.control.setParent(this.parentForm);
        (this.parentForm as FormGroup).setControl(this.config.field, form);
        this.control = form;
        break;
      }
      case FormArray: {
        break;
      }
    }
  }
}
