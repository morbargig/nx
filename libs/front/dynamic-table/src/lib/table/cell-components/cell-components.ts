import { DefaultCellComponent } from './default-cell/default-cell.component';
import { LinkCellComponent } from './link-cell/link-cell.component';
import {
  Component,
  EventEmitter,
  Type,
  ChangeDetectorRef,
} from '@angular/core';
import { ExtendsCellComponent } from './extends-cell/extends-cell.component';
import { tableElStyleObj } from '../table.component';
import { BaseCellComponent } from '../directives/base-cell.directive';
import { PillCellComponent } from './pill-cell/pill-cell.component';
import { DateCellComponent } from './date-cell/date-cell.component';
import { LoadingCellComponent } from './loading-cell/loading-cell.component';
import { BaseCellData } from './table.types.helpers';
import { BooleanCellComponent } from './boolean-cell/boolean-cell.component';
import { JsonCellComponent } from './json-cell/json-cell.component';

type componentWithData<
  T = any,
  K extends keyof T = keyof T,
  C extends Type<any> = Type<any>,
  D extends BaseCellData<T, K> = InstanceType<C>['data']
> = {
  component?: C;
  data?: D;
};

export function lazyCellLoadConfigure<
  T = any,
  K extends keyof T = keyof T,
  C extends Type<any> = Type<any>
  // C extends Type<BaseCellComponent<any, any, any>> = Type<any>
>(data: componentWithData<T, K, C>): componentWithData<T, K, C> {
  return data;
}

export enum TableColumnType {
  Default,
  Boolean,
  Json,
  Link,
  Extends,
  Pill,
  Date,
  Loading,
  DynamicLazy,
}

class TableCellClassType<T = any, K extends keyof T = keyof T> {
  TableCellDicType = {
    Default: DefaultCellComponent as Type<DefaultCellComponent<T, K>>,
    Link: LinkCellComponent,
    Extends: ExtendsCellComponent as Type<ExtendsCellComponent<T, K>>,
    Pill: PillCellComponent,
    Date: DateCellComponent as Type<DateCellComponent<T, K>>,
    Loading: LoadingCellComponent as Type<LoadingCellComponent<T, K>>,
    Boolean: BooleanCellComponent as Type<BooleanCellComponent<T, K>>,
    Json: JsonCellComponent as Type<JsonCellComponent<T, K>>,
    DynamicLazy: null as any,
  } as const satisfies {
    [key in keyof typeof TableColumnType]-?: Type<BaseCellComponent<any, any>>;
  };
}

type TableCellComponentType<
  T = any,
  K extends keyof T = keyof T
> = TableCellClassType<T, K>['TableCellDicType'];

export const TableCellDic = {
  Default: DefaultCellComponent,
  Pill: PillCellComponent,
  Date: DateCellComponent,
  Link: LinkCellComponent,
  Extends: ExtendsCellComponent,
  Loading: LoadingCellComponent,
  Boolean: BooleanCellComponent,
  Json: JsonCellComponent,
  DynamicLazy: undefined as any,
} as const satisfies TableCellComponentType;

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

type MyErrorType<
  T extends keyof Pick<ITableColumnObj, 'loadCustomCellComponent'>,
  E extends string | number | never
> = `${T} can't be set where the type has a specific component type. To use it, remove "type: ${E}"`;
interface ITableColumnObj<
  T = any,
  DModel = any,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  E extends keyof typeof TableColumnType = keyof typeof TableColumnType /**  | never */
> {
  type: E;
  data?: E extends 'DynamicLazy' ? null : DModel;
  loadCustomCellComponent?: E extends 'DynamicLazy'
    ? (data: {
        /** it just for type proposes */
        t?: T;
        /** it just for type proposes */
        k?: K;
        calBack: typeof lazyCellLoadConfigure;
      }) => Promise<
        ReturnType<
          typeof lazyCellLoadConfigure<T, K, Type<BaseCellComponent<T, K>>>
        >
      >
    : MyErrorType<'loadCustomCellComponent', E>;
  field?: K;
  label?: string;
  /** th header, the cell header on top of the table */
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

  registerOnchangeDetection?: (obj: {
    cd: ChangeDetectorRef;
    val: T[K];
    item: T;
  }) => void;
  parsedHtmlData?: (
    val?: T[K],
    item?: T,
    parseData?: T[K] | T | any
  ) => Component['template'];
  bodyStyle?: {
    td?: tableElStyleObj;
    'cell-component'?: tableElStyleObj;
  };

  href?: (val: T[K], item?: T) => string | any[] | string[]; // cell href link
  onClick?: (val: T[K], item?: T) => void; // on cell click
  colspan?: (args: { val: T[K]; item?: T }) => number;
  hidden?: boolean;
  sortable?: boolean;
  disabled?: (args: { val: T[K]; item?: T }) => boolean;
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
  styleFunc?:
    | ((this: ITableColumnObj<T, DModel, K>, item?: T[K]) => tableElStyleObj)
    | ((item?: T[K]) => tableElStyleObj);

  /** if the table represents data of items like users so 'birthday' is one of the user filed that can display on the table */
  // parseColObj?: ({
  //     (this: ITableColumnObj<T, DModel, K>, data: { val?: T[K], item?: T, isHeader?: boolean, items: T[] }): void;
  // })
  // | ((data: { val?: T[K], item?: T, isHeader?: boolean, items: T[], col: ITableColumnObj<T, DModel, K> }) => tableStylesObj)
}

/**
 * fnx documentation for {@link http://172.30.1.65:8090/display/B2B/Basics+Loaders+With+Animation}
 * @author Mor Bargig <morbargig@gmail.com>
 */
export type ITableColumn<T = any> =
  | {
      [K in keyof T]-?: componentObject<T, K>;
    }[keyof T];

// interface User {
//   name: string;
//   age: number;
// }

// const simpleTest: ITableColumn<User>[] = [
//   {
//     parsedHtmlData: (v) => `<div class="pt-10">${v}</div>`,
//     field: 'age',
//     type: 'Default',
//     headerStyleFunc: function () {
//       return this.style;
//     },
//     data: {
//       // title$: of(),
//     },
//   },
//   {
//     field: 'name',
//     parsedHtmlData: (v) => 'null',
//     type: 'Extends',
//     // headerStyleFunc: () => ({}),
//     // data: {
//     //   // title$: of(),
//     // }
//   },
// ];
