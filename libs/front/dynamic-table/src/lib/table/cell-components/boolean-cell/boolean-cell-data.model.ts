import { BaseCellData } from '../table.types.helpers';
export interface BooleanCellDataModel<T = any, K extends keyof T = keyof T>
  extends BaseCellData<T, K> {}
