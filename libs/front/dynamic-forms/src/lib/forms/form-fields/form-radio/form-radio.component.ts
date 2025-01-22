/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormRadioData } from './form-radio-data';
import { DynamicComponentComponent } from '../../core/components/dynamic-component/dynamic-component.component';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'softbar-app-form-button',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[DynamicComponentComponent,MatRadioGroup,MatRadioButton,ReactiveFormsModule,CommonModule]
})
export class FormRadioComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponentDirective<T, FormRadioData<T, K>, K, FormControl>
  implements OnInit
{
  constructor(private cd: ChangeDetectorRef) {
    super();
  }
  // buildData: ReturnType<this['data']['buildDataFunc']>;

  public get disabled(): boolean {
    return this.config?.disabled || this.control?.disabled || null;
  }

  // public detectChanges() {
  //   return this.cd.detectChanges();
  // }

  override ngOnInit(): void {
    if (this.config?.disabled) {
      this.control.disable();
    }
    this.control?.registerOnDisabledChange!?.((/*isDisabled*/) => {
      this.cd.markForCheck();
    });
    super.ngOnInit();
    // this.buildData = this.data.buildDataFunc!?.() as any;
  }

  // public onChange({ value: val }: any) {
  //   this.config?.onChange!?.({ currentValue: val, control: this.control });
  // }
}
