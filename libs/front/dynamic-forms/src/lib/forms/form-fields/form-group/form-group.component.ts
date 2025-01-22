import { FormGroup, FormArray } from '@angular/forms';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormGroupData } from './form-group';
import { Component } from '@angular/core';
import { DynamicFormGroupComponent } from '../../core/components/dynamic-form-group/dynamic-form-group.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'softbar-app-form-group',
  standalone: true,
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss'],
  imports:[CommonModule,DynamicFormGroupComponent]
})
export class FormGroupComponent<
  T = any,
  K extends keyof T = keyof T
> extends BaseFieldComponentDirective<T, FormGroupData<T, K>, K, FormGroup> {
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
