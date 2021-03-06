/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseFieldComponent } from '../../core/directives/base-field.directive';
import { FormTextData } from './form-text';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'fnx-nx-app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponent<T, FormTextData<T, K>, K, FormControl>
  implements OnInit
{
  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  public get disabled(): boolean {
    return this.config?.disabled || this.control?.disabled || null;
  }
  ngOnInit(): void {
    console.log('this.ngOnInit control:', this.control);
    if (this.config?.disabled) {
      this.control.disable();
    }
    this.control?.registerOnDisabledChange((/*isDisabled*/) => {
      this.cd.markForCheck();
    });
    // this.control.valueChanges
    //   .pipe(
    //     takeWhile(() => this.isActive),
    //     debounceTime(200)
    //   )
    //   .subscribe(() => {
    //     this.cd.detectChanges();
    //     this.cd.markForCheck();
    //   });
  }

  public onChange({ value: val }: any) {
    this.config?.onChange!?.({ currentValue: val, control: this.control });
  }

  public keyUp(evt: any) {
    if (!!this.config?.data?.enterClicked && evt.keyCode === '13') {
      this.config.data.enterClicked(evt.target.value, this.control);
    }
  }
}
