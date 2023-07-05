// export interface LoadingCellDataModel<T = any, K extends keyof T = keyof T>
//   extends BaseCellData<T, K> {}

import { BaseCellData } from '../table.types.helpers';

export type LoadingCellDataModel<
  T = any,
  K extends keyof T = keyof T
> = BaseCellData<T, K>;
