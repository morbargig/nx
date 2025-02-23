import { BaseCellData } from '../table.types.helpers';
export interface JsonCellDataModel<T = any, K extends keyof T = keyof T>
  extends BaseCellData<T, K> {}
