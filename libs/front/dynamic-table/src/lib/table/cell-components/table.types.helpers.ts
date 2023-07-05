import { ITableColumn } from './cell-components';

export type GetColumnType<C> = C extends ITableColumn<infer T>[] ? T : never;


// tslint:disable-next-line:no-empty-interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseCellData<
  T = any,
  K extends keyof T = keyof T /** will have used on extends components */
> {}