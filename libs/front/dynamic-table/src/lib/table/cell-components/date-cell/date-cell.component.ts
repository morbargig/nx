import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  DefaultCellComponent,
  imports,
} from '../default-cell/default-cell.component';
import { DatePipe } from '@angular/common';
import { DateCellDataModel } from './date-cell-data.model';

@Component({
  selector: 'softbar-app-date-cell',
  templateUrl: '../default-cell/default-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports,
  providers: [DatePipe],
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
    return this.datePipe.transform(
      super.generateDataValue(),
      this.data?.format ?? 'dd.MM.yy'
    );
  }
}
