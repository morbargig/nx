import {take, takeWhile} from 'rxjs/operators';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BaseFieldComponent} from '../../core/directives/base-field.directive';
import {FormTextData} from './form-text';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'fnx-nx-app-form-text',
  templateUrl: './form-text.component.html',
  styleUrls: ['./form-text.component.scss'],
})
export class FormTextComponent<T = any,
  K extends keyof T = keyof T> extends BaseFieldComponent<T, FormTextData<T, K>, K, FormControl> implements OnInit {
  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  public get disabled(): boolean {
    return this.config?.disabled || this.control?.disabled || null
  }

  ngOnInit(): void {
    if (this.config.disabled) {
      this.control.disable();
    }
    this.control.registerOnDisabledChange((/*isDisabled*/) => this.cd.markForCheck())
  }

  public autoGeneratorClicked() {
    this.config.data.autoGeneratorAction(this.config, this.group);
    this.control.valueChanges
      .pipe(
        takeWhile(() => this.isActive),
        take(1)
      )
      .subscribe(() => {
        this.cd.markForCheck();
      });
  }

  public onChange({value: val}: any) {
    if (this.config.onChange) {
      this.config.onChange({currentValue: val, control: this.control});
    }
  }

  public keyUp(evt: any) {
    if (!!this.config?.data?.enterClicked && evt.keyCode === '13') {
      this.config.data.enterClicked(evt.target.value, this.control);
    }
  }
}
