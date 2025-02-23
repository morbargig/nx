import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormCheckboxData } from './form-checkbox-data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicComponentComponent } from '../../core/components/dynamic-component/dynamic-component.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'softbar-app-form-checkbox',
  template: `
    <span
      *ngIf="data?.classTemplate as Temp; else defaultTemp"
      class="custom-control custom-radio"
    >
      <input
        type="checkbox"
        class="radio-control-input"
        [id]="id"
        [formControl]="control"
      />
      <label class="custom-control-label" [for]="id">
        <ng-container>
          <softbar-dynamic-component
            [dynamicComponent]="Temp"
          ></softbar-dynamic-component>
        </ng-container>
        <ng-template #defaultLabelTemp>
          {{ data?.label }}
        </ng-template>
      </label>
    </span>
    <ng-template #defaultTemp>
      <mat-checkbox [formControl]="control"></mat-checkbox>
    </ng-template>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DynamicComponentComponent,
    MatCheckboxModule,
  ],
})
export class FormCheckboxComponent<
  T = any,
  K extends keyof T = keyof T
> extends BaseFieldComponentDirective<
  T,
  FormCheckboxData<T, K>,
  K,
  FormControl
> {}
