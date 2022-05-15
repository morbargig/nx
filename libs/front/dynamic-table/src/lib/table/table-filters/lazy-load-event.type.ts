export type FilterObject<T = any> = {
    [P in keyof T]?: FilterInsideObject<T[P]>;
};

export interface LazyLoadEvent<T = any> {
    page?: number;
    pageSize?: number;
    filters?: FilterObject<T>[];
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
    // any
    Equals = 2000,
    NotEquals = 2001,
    // number
    LessThan = 2002,
    LessThanOrEquals = 2003,
    GreaterThan = 2004,
    GreaterThanOrEquals = 2005,
    // date
    Before = 2012, // 2002 before 
    BeforeOrEquals = 2013, // 2003 before
    After = 2014, // 2004 before
    EqualsOrAfter = 2015, // 2005 before
    // string & number
    Contains = 2250,
    StartsWith = 2251,
    EndsWith = 2252,
    // any value
    Any = 2500,
    // no value
    NotAny = 2502,
}

