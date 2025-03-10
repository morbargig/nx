import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ITableFilterOption, ITableFilter } from '../table-filters/helpers';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'softbar-app-table-select-filter',
  template: `<div [matMenuTriggerFor]="dropDownMenu" class="cursor-pointer">
      <span>{{ selectedOption?.label || 'Select...' }}</span>
    </div>
    <mat-menu #dropDownMenu="matMenu">
      <ng-container *ngFor="let option of options">
        <button mat-menu-item (click)="handleChange(option)">
          {{ option.label }}
        </button>
      </ng-container>
    </mat-menu> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableSelectFilterComponent),
      multi: true,
    },
  ],
})
export class TableSelectFilterComponent<T = any>
  implements ControlValueAccessor, AfterViewInit
{
  constructor(private cd: ChangeDetectorRef) {}
  public isMenuOpen: boolean;
  public selectedOption: ITableFilterOption<T>;
  @Input({ required: true }) filterCtl: ITableFilter<T>;

  private onTouched: (...args: any[]) => any = () => null;
  private onChanged: (...args: any[]) => any = () => null;

  public get options() {
    return this.filterCtl?.options;
  }

  ngAfterViewInit() {
    this.handleChange(this.filterCtl?.initialValue?.());
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
