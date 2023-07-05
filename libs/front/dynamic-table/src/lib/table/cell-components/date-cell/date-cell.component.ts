import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { DatePipe } from '@angular/common';
import { DateCellDataModel } from './date-cell-data.model';

@Component({
  selector: 'fnx-nx-app-date-cell',
  //extends DefaultCellComponent html template
  templateUrl: '../default-cell/default-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends DateCellDataModel<T, K> = DateCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {
  constructor(
    private datePipe: DatePipe,
    protected override cd: ChangeDetectorRef
  ) {
    super(cd);
  }
  override generateDataValue() {
    return this.datePipe.transform(super.generateDataValue(), this.data?.format ?? 'dd.MM.yy');
  }
}
