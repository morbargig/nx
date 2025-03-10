export type FilterObject<T = any> = {
  [P in keyof T]?: FilterInsideObject<T[P]>;
};

export interface LazyLoadEvent<T = any> {
  pageNum?: number;
  pageSize?: number;
  filters?: FilterObject<T>[];
  sort?: keyof T;
  sortDirection?: 'ASC' | 'DESC';
}

export interface FilterDataResponse<T = any> {
  totalRecords: number;
  data: T[];
}

export interface FilterInsideObject<V = any> {
  value?: V;
  matchMode?: MatchMode;
  // innerFilter?: FilterObject<V>
}

export enum MatchMode {
  /** @property {Equals} any value that Equals {value} */ Equals = 2000,
  /** @property {NotEquals} any value that NotEquals {value} */ NotEquals = 2001,
  // number
  /** @property {LessThan} number LessThan {value} */ LessThan = 2002,
  /** @property {LessThanOrEquals} number LessThanOrEquals {value} */ LessThanOrEquals = 2003,
  /** @property {GreaterThan} number GreaterThan {value} */ GreaterThan = 2004,
  /** @property {GreaterThanOrEquals} number GreaterThanOrEquals {value} */ GreaterThanOrEquals = 2005,
  // date
  /** @property {Before} Date as (string or number Date) that Before {value} */ Before = 2012, // 2002 before
  /** @property {BeforeOrEquals} Date as (string or number Date) that BeforeOrEquals {value} */ BeforeOrEquals = 2013, // 2003 before
  /** @property {After}  Date as (string or number Date) that After {value} */ After = 2014, // 2004 before
  /** @property {EqualsOrAfter} Date as (string or number Date) that EqualsOrAfter {value} */ EqualsOrAfter = 2015, // 2005 before
  // number & string
  /** @property {Contains} string or number that Contains the {value} */ Contains = 2250,
  /** @property {StartsWith} string or number that EndsWith {value} */ StartsWith = 2251,
  /** @property {EndsWith} string or number that EndsWith {value} */ EndsWith = 2252,
  // number & string & array
  /** @property {Contained} string or number or array that Contained in {value} */ Contained = 2260,
  // any
  /** @property {Any} any truthy value */
  Any = 2500,
  // not any
  /** @property {NotAny} any falsy value */
  NotAny = 2502,
}

enum MoreMatchMode {
  /** @property {Regex} any value that match {value} regex */ Regex = 'Regex',
}

export const FiledValidationsMatchMode = { ...MatchMode, ...MoreMatchMode };
// FiledValidationsMatchMode.Regex;

// const t: LazyLoadEvent<{ username: string; id: number }> = {
//   page: 0,
//   pageSize: 10,
//   filters: [
//     {
//       username: {
//         value: 'mor ba',
//         matchMode: MatchMode.Contains,
//       },
//     },
//     // {
//     //   id: {
//     //     value: 2,
//     //     matchMode: MatchMode.NotEquals,
//     //   },
//     // },
//   ],
// };
