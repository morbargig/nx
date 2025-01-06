import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormCheckboxData } from './form-checkbox-data';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'softbar-app-form-checkbox',
  templateUrl: 'form-checkbox.component.html',
  styleUrls: ['form-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCheckboxComponent<
  T = any,
  K extends keyof T = keyof T
> extends BaseFieldComponentDirective<T, FormCheckboxData<T, K>, K, FormControl> {}
