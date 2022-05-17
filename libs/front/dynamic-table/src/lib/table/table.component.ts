/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/member-ordering */
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';
import { ITableColumn } from './cell-components/cell-components';

export type tableElStyleObj = {
  styleClass?: string;
  style?: { [k: string]: string };
  styleClassObj?: { [k: string]: boolean };
};
type tableElementsStyleObj<T extends string = ''> = {
  [key in T]?: tableElStyleObj;
};
type tableElements = 'table' | 'thead' | 'tr' | 'th' | 'td' | 'tbody';

export type tableBodyStylesObj = tableElementsStyleObj<tableElements>;

@Component({
  selector: 'fnx-nx-app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T = any, E = T> {
  // header section
  @Input() hideHeader?: boolean;

  public get shoHeader(): boolean {
    return !this.hideHeader && this.columns?.some((i) => !!i?.label);
  }

  // style and class section
  defaultTableBodyStyle: tableBodyStylesObj = {
    table: { styleClass: 'col-span-12' },
    td: { styleClass: 'col-auto' },
    thead: { styleClass: 'flex' },
  };
  @Input() tableBodyStyle?: tableBodyStylesObj;
  public getElStyleObj = (el: tableElements): tableElStyleObj =>
    [
      this.defaultTableBodyStyle?.[el] || {},
      this.tableBodyStyle?.[el] || {},
    ]?.reduce(
      (p, c) => ({
        style: { ...(p?.style || {}), ...(c?.style || {}) },
        styleClass: (p?.styleClass || '') + ' ' + (c?.styleClass || ''),
        styleClassObj: {
          ...(p?.styleClassObj || {}),
          ...(c?.styleClassObj || {}),
        },
      }),
      {}
    );
  public getElStyleClassString = (
    el: tableElements,
    inputStyleClassObj?: tableElStyleObj['styleClass']
  ): tableElStyleObj['styleClass'] =>
    (inputStyleClassObj || '') +
    ' ' +
    (this.getElStyleObj(el)?.styleClass || '');
  public getElStyleClassObj = (
    el: tableElements
  ): tableElStyleObj['styleClassObj'] => this.getElStyleObj(el)?.styleClassObj;
  public getElStyleClass = (
    el: tableElements,
    inputStyleClassObj?: tableElStyleObj['styleClass'],
    ngClassObj?: tableElStyleObj['styleClassObj']
  ): tableElStyleObj['styleClassObj'] => ({
    [this.getElStyleClassString(el, inputStyleClassObj) || '']: true,
    ...this.getElStyleClassObj(el),
    ...ngClassObj,
  });
  public getElStyle = (
    el: tableElements,
    inputStyleObj?: tableElStyleObj['style']
  ): tableElStyleObj['style'] => ({
    ...(this.getElStyleObj(el)?.style || {}),
    ...(inputStyleObj || {}),
  });

  // table cells configuration section
  private _columns: ITableColumn<T>[] = [];
  @Input() public set columns(cols: ITableColumn<T>[]) {
    this._columns = cols;
  }

  public get columns(): ITableColumn<T>[] {
    return this._columns;
  }

  // table data section
  private _items?: T[];
  public get items(): T[] | undefined {
    if (this.loading) {
      return Array(this.loadingRowsLength);
    } else if (this.notFoundMode) {
      // not found
      return Array(1);
    } else if (!!this.showLimitNumber && !this.showAll) {
      // show limit
      return this._items?.slice(0, this.showLimitNumber);
    } else {
      return this._items;
    }
  }

  @Input()
  public set items(val: T[] | undefined) {
    if (this.extendsColumns?.length) {
      this.panelOpenState = val?.map(() => false) || [];
    }
    this.loading = false;
    this._items = val;
  }

  // table loading section
  @Input() public loading?: boolean;
  @Input() public loadingRowsLength?: number;

  // table extends row configuration
  getExtendsColSpan = (lastTd: boolean) =>
    this.columns?.length / (this?.extendsColumns?.length || 0) +
    +(lastTd ? this.columns?.length % 2 : 0);
  @Input() extendsColumns?: ITableColumn<E>[];
  @Input() getExtendsColumnsArr?: (item: T) => ITableColumn<E>[][];
  @Input() getExtendsData?: (item: T) => E;
  getExtendsDataItems = (
    items: T[] | undefined = this.items
  ): E[] | undefined => items?.map((i) => this.getExtendsData!?.(i));
  panelOpenState: boolean[] = [];
  togglePanel = (index: number, state?: boolean) => {
    if (!!this.extendsColumns?.length || !!this.getExtendsColumnsArr) {
      this.panelOpenState[index] =
        state !== undefined ? state : !this.panelOpenState[index];
    }
  };

  // more items
  showAll?: boolean;
  @Input() showLimitNumber?: number;
  @Input() showMoreTextsObj?: { more: string; less: string } = {
    more: 'כל הפריטים',
    less: 'הסתר',
  };
  moreItems = (): void => {
    this.showAll = !this.showAll;
  };

  // not-found cell
  @Input() notFoundColumn?: ITableColumn<T>;

  public get notFoundColumns(): ITableColumn<T>[] {
    return [this.notFoundColumn]?.map((i) => <typeof i>{ ...i, colspan: 10 });
  }

  public get notFoundMode(): boolean {
    return !this.loading && !this._items?.length && !!this.notFoundColumn;
  }

  //  content child template
  @ContentChild('colTempRef', { static: false })
  public colTempRef?: TemplateRef<{
    item: T;
    col: ITableColumn<T>;
    $implicit: T[keyof T];
  }>;
}
