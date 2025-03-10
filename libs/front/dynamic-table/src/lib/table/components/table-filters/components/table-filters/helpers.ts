import { MatchMode } from '../../lazy-load-event.type';

export type ITableFilterOption<T = any, K extends keyof T = keyof T> = {
  label?: string;
  value?: T[K];
};

// type componentObject = {

// } satisfies {}

export type ITableFilter<T = any> = {
  [K in keyof T]-?: {
    label: string;
    key: K;
    hidden?: boolean;
    filterType: 'freeText' | 'select' | 'multiSelect';
    // free text filter with match-mode dropdown
    type?: HTMLInputElement['type'];
    matchModes?: {
      label: string;
      matchMode: MatchMode;
    }[];
    // select option filter
    matchMode?: MatchMode;
    initialValue?: {
      (this: ITableFilter<T>): ITableFilter<T>[
        | 'options'
        | 'matchModes'][number];
    };
    options?: ITableFilterOption<T, K>[];
    // multiselect filter
    initialValues?: {
      (this: ITableFilter<T>): ITableFilter<T>['options'];
    };
  };
}[keyof T];
