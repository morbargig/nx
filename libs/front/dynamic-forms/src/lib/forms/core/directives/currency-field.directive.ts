import {
  AfterViewInit,
  Directive,
  HostListener,
  OnDestroy,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[softBarCurrencyFormatter]',
  standalone: true,
})
export class CurrencyFormatterDirective implements OnDestroy, AfterViewInit {
  private static formatter: Intl.NumberFormat = new Intl.NumberFormat('he-IL', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'ILS',
  });
  private destroy$: Subject<any> = new Subject();

  constructor(@Self() private ngControl: NgControl) {}

  static formatPrice(v: string) {
    return CurrencyFormatterDirective.formatter.format(
      +v?.toString()?.replace(/[^\d.]/g, '') || 0
    );
  }

  static unFormatValue(v: string) {
    return (
      Number.parseFloat(
        v
          ?.toString()
          ?.replace(/,/g, '')
          .replace(/[^\d.]/g, '')
      ) || 0
    )?.toFixed(2);
  }

  static validateDecimalValue(v: string) {
    // Check to see if the value is a valid number or not
    if (Number.isNaN(Number(v))) {
      // strip out last char as this would have made the value invalid
      const strippedValue = v.slice(0, v.length - 1);

      // if value is still invalid, then this would be copy/paste scenario
      // and in such case we simply set the value to empty
      return Number.isNaN(Number(strippedValue)) ? '' : strippedValue;
    }
    return v;
  }

  ngAfterViewInit() {
    this.setValue(CurrencyFormatterDirective.formatPrice(this.ngControl.value));
    this.ngControl.control.valueChanges
      .pipe(takeUntil(this.destroy$), distinctUntilChanged(), debounceTime(50))
      .subscribe(this.updateValue);
  }

  updateValue = (value: string) => {
    const inputVal = value || '';
    this.setValue(
      inputVal
        ? CurrencyFormatterDirective.validateDecimalValue(
            inputVal?.toString()?.replace(/[^\d.]/g, '')
          )
        : ''
    );
  };

  @HostListener('focus') onFocus() {
    this.setValue(
      CurrencyFormatterDirective.unFormatValue(this.ngControl.value)
    );
  }

  @HostListener('focusout') onBlur() {
    const value = this.ngControl.value || '';
    !!value && this.setValue(CurrencyFormatterDirective.formatPrice(value));
  }

  setValue(v: string) {
    this.ngControl.control.setValue(v, { emitEvent: false });
  }

  ngOnDestroy() {
    this.setValue(
      CurrencyFormatterDirective.unFormatValue(this.ngControl.value)
    );
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
