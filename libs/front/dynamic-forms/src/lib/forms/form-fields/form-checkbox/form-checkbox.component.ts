import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormCheckboxData } from './form-checkbox-data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicComponentComponent } from '../../core/components/dynamic-component/dynamic-component.component';
@Component({
  selector: 'softbar-app-form-checkbox',
  templateUrl: 'form-checkbox.component.html',
  standalone: true,
  styleUrls: ['form-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[CommonModule,ReactiveFormsModule,DynamicComponentComponent]
})
export class FormCheckboxComponent<
  T = any,
  K extends keyof T = keyof T
> extends BaseFieldComponentDirective<T, FormCheckboxData<T, K>, K, FormControl> {}
