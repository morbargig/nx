import { DefaultCellComponent } from './default-cell/default-cell.component';
import { LinkCellComponent } from './link-cell/link-cell.component';
import { PriceCellComponent } from './price-cell/price-cell.component';
import { Component, EventEmitter, Type } from '@angular/core';
import { ExtendsCellComponent } from './extends-cell/extends-cell.component';
import { tableElStyleObj } from '../table.component';
import { BaseCellComponent } from '../directives/base-cell.directive';

export function asConst<Constraint extends Record<PropertyKey, unknown>>(): <
  T extends Constraint
>(
  obj: T
) => T {
  return (obj) => obj;
}

export enum TableColumnType {
  Default,
  Link,
  Price,
  Extends,
}

class TableCellClassType<T = any, K extends keyof T = keyof T> {
  TableCellDicType = asConst<{
    [key in keyof typeof TableColumnType]+?: Type<BaseCellComponent<any, any>>;
  }>()({
    Default: DefaultCellComponent as Type<DefaultCellComponent<T, K>>,
    Link: LinkCellComponent,
    Price: PriceCellComponent,
    Extends: ExtendsCellComponent as Type<ExtendsCellComponent<T, K>>,
  } as const);
}

type TableCellComponentType<
  T = any,
  K extends keyof T = keyof T
> = TableCellClassType<T, K>['TableCellDicType'];

export const TableCellDic = asConst<TableCellComponentType>()({
  Default: DefaultCellComponent,
  Link: LinkCellComponent,
  Price: PriceCellComponent,
  Extends: ExtendsCellComponent,
} as const);

// tslint:disable-next-line:no-empty-interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseCellData<
  T = any,
  K extends keyof T = keyof T /** will have used on extends components */
> {}

export interface ITableCell<
  T = any,
  DModel extends BaseCellData<T, K> = BaseCellData<T>,
  K extends keyof T = keyof T,
  V extends T[keyof T] = T[keyof T]
> {
  col: ITableColumnObj<T, DModel, K>;
  extends?: EventEmitter<boolean>;
  item: T;
  value?: V;
}

type componentObject<T = any, K extends keyof T = keyof T> = {
  [E in keyof TableCellComponentType]?: ITableColumnObj<
    T,
    TableCellComponentType<T, K>[E] extends Type<infer C> // when you chose type this will be the data type of this component
      ? C extends BaseCellComponent<T, any, infer D>
        ? D
        : any
      : any,
    K,
    E
  >;
}[keyof TableCellComponentType];

interface ITableColumnObj<
  T = any,
  DModel = any,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  E extends keyof typeof TableColumnType = keyof typeof TableColumnType
> {
  field?: K;
  label?: string;
  /** th header, the cell header on top of the table
   */
  labelTooltipText?: string;
  /**
   * parse the cell data // (date) => moment(date).format('DD.MM.YY')
   * @param val the cell value
   */
  parsedData?: (val: T[K]) => any;
  /**
   * get the cell data from the row item // (item)=> item.vatPrice + item.basePrice
   * @param item the raw value
   */
  parsedFullData?: (item: T) => any;
  /**
   * convert property value to html // exam (val)=> `<div class="someClass">${val}</div>
   * @param val the cell value
   * @param item the raw value
   * @param parseData the return value from the 'parsedData' or 'parsedFullData' execute
   */
  parsedHtmlData?: (
    val?: T[K],
    item?: T,
    parseData?: T[K] | T | any
  ) => Component['template'];
  styleClass?: string;
  data?: DModel; // cell class like px-10 loading etc.
  style?: { [property: string]: string }; // cell style object { padding-top: '100px', ... }
  href?: (val: T[K], item?: T) => string | any[] | string[]; // cell href link
  onClick?: (val: T[K], item?: T) => void; // on cell click
  colspan?: number;
  hidden?: boolean;
  hiddenFunc?: (data: {
    val?: T[K];
    item?: T;
    isHeader?: boolean;
    items: T[];
  }) => boolean;
  headerStyleFunc?:
    | ((
        this: ITableColumnObj<T>
        // , DModel, K, E
      ) => tableElStyleObj)
    | (() => tableElStyleObj);
  customCellComponent?: Type<BaseCellComponent<T, K>>;
  /** if the table represents data of items like users so 'birthday' is one of the user filed that can display on the table */
  type?: E;
  // parseColObj?: ({
  //     (this: ITableColumnObj<T, DModel, K>, data: { val?: T[K], item?: T, isHeader?: boolean, items: T[] }): void;
  // })
  // | ((data: { val?: T[K], item?: T, isHeader?: boolean, items: T[], col: ITableColumnObj<T, DModel, K> }) => tableStylesObj)
}

/** 
 * fnx documentation for {@link https://google.com}
 * @author Mor Bargig <morbargig@gmail.com>
*/
export type ITableColumn<T = any> = {
  [K in keyof T]-?: componentObject<T, K>;
}[keyof T];

// tslint:disable-next-line:no-shadowed-variable
export type getColumnType<T> = T extends ITableColumn<infer T>[] ? T : never;

interface User {
  name: string;
  age: number;
}

const simpleTest: ITableColumn<User>[] = [
  {
    parsedHtmlData: (v) => 'null',
    field: 'age',
    type: 'Default',
    headerStyleFunc: function () {
      return this.style;
    },
    data: {
      // title$: of(),
    },
  },
  {
    field: 'name',
    parsedHtmlData: (v) => 'null',
    type: 'Extends',
    // headerStyleFunc: () => ({}),
    // headerStyleFunc: (x) => {return x },
    // data: {
    //   // title$: of(),
    // }
  },
];
