import {Directive} from '@angular/core';
import {ITableCell, BaseCellData} from '../cell-components/cell-components';

@Directive()
export abstract class BaseCellComponent<T, K extends keyof T = keyof T, D extends BaseCellData<T, K> =
  BaseCellData<T, K>, > implements ITableCell<T, D, K> {
  public get value(): T[K] {
    return this.item?.[this.col.field]
  }

  public col: ITableCell<T, D, K>['col'];
  public item: T;
}
