import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ITableFilter } from '../table-filters/helpers';

@Component({
  selector: 'softbar-app-table-multi-select-filter',
  template: `
    <mat-form-field appearance="outline" class="full-width">
      <mat-label>{{ filterCtl.label }}</mat-label>
      <mat-select [formControl]="$any(selectedValues)" multiple>
        <mat-option
          *ngFor="let option of filterCtl.options"
          [value]="option.value"
        >
          {{ option.label }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
  styles: [
    `
      .mat-mdc-notch-piece.mdc-notched-outline__notch {
        border-right: 0 !important;
      }

      mat-label {
        padding: 0.5em;
        z-index: auto;
        display: block;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TableMultiSelectFilterComponent),
      multi: true,
    },
  ],
})
export class TableMultiSelectFilterComponent<T = any>
  implements ControlValueAccessor, OnInit
{
  @Input() filterCtl: ITableFilter<T>;

  selectedValues = new FormControl<any[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouched: () => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onChanged: (value: any) => void = () => {};

  ngOnInit() {
    if (this.filterCtl?.initialValues) {
      this.selectedValues.setValue(this.filterCtl.initialValues() || []);
    }
  }

  writeValue(value: any[]): void {
    this.selectedValues.setValue(value || [], { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
    this.selectedValues.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
