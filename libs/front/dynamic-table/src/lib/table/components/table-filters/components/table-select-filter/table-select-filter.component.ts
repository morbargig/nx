import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ITableFilterOption,
  ITableFilter,
} from '../table-filters/table-filters.component';

@Component({
  selector: 'fnx-nx-app-table-select-filter',
  templateUrl: './table-select-filter.component.html',
  styleUrls: ['./table-select-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableSelectFilterComponent),
      multi: true,
    },
  ],
})
export class TableSelectFilterComponent<T = any>
  implements AfterViewInit, ControlValueAccessor
{
  constructor(private cd: ChangeDetectorRef) {}
  public isMenuOpen: boolean;
  public selectedOption: ITableFilterOption<T>;
  private _filterCtl: ITableFilter<T>;

  private onTouched: (...args: any[]) => any = () => null;
  private onChanged: (...args: any[]) => any = () => null;

  public get options() {
    return this.filterCtl?.options;
  }

  @Input() public set filterCtl(v: ITableFilter<T>) {
    this._filterCtl = v;
  }
  public get filterCtl(): ITableFilter<T> {
    return this._filterCtl;
  }

  ngAfterViewInit() {
    this.handleChange(this.filterCtl.initialValue());
  }

  public toggleOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  handleChange(o: ITableFilterOption<T>) {
    this.onTouched();
    this.selectedOption = o;
    this.onChanged(o.value);
    this.cd.markForCheck();
  }

  writeValue(value: ITableFilterOption<T>): void {
    this.selectedOption = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
