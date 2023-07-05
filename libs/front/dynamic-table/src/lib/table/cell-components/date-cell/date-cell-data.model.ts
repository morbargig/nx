import { DatePipe } from '@angular/common';
import { BaseCellData } from '../table.types.helpers';
export interface DateCellDataModel<T = any, K extends keyof T = keyof T>
  extends BaseCellData<T, K> {
  format?: Parameters<DatePipe['transform']>[1];
}
