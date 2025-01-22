/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { FormTextData } from './form-text';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { MatHint } from '@angular/material/form-field';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
@Component({
  selector: 'softbar-app-form-text',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule,MatHint,CdkTextareaAutosize],
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponentDirective<T, FormTextData<T, K>, K, FormControl>
  implements OnInit
{
  constructor(private cd: ChangeDetectorRef) {
    super();
  }
  selectedElement;
  onFocus(event?: any) {
    if (event) {
      this.selectedElement = event.target;
    } else {
      this.selectedElement = null;
    }
  }

  public get disabled(): boolean {
    return this.config?.disabled || this.control?.disabled || null;
  }
  override ngOnInit(): void {
    super.ngOnInit();
    // console.log('this.ngOnInit control:', this.control);
    if (this.config?.disabled) {
      this.control.disable();
    }
    this.control?.registerOnDisabledChange!?.((/*isDisabled*/) => {
      this.cd.markForCheck();
    });
  }

  // public onChange({ value: val }: any) {
  // this.config?.onChange!?.({ currentValue: val, control: this.control });
  // }

  public keyUp(evt: any) {
    if (!!this.config?.data?.enterClicked && evt.keyCode === '13') {
      this.config.data.enterClicked(evt.target.value, this.control);
    }
  }
}
