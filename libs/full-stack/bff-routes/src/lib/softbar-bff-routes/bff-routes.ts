import { BFF_APP_CONTROL_ROUTES } from './controllers/app';
import { controlType } from './controllers/controllers';
import { UrlToCamelCase } from './helpers/url-to-camel-case';

type Routes = {
  [key in string]?: Readonly<controlType> | Routes;
};

const BFF_ROUTES = {
  '': BFF_APP_CONTROL_ROUTES,
} as const satisfies Routes;

export type BFF_ROUTES_TYPE = typeof BFF_ROUTES;
export type BFF_CONTROLLER_TYPE = controlType;

export type ControllerApiType<C extends keyof BFF_ROUTES_TYPE> = {
  [key in UrlToCamelCase<keyof BFF_ROUTES_TYPE[C]>]: any;
};

// Recursive Utility Type to Extract Paths
export type ExtractPaths<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends controlType
    ? `${Prefix}${K}`
    : T[K] extends Routes
    ? ExtractPaths<T[K], `${Prefix}${K}/`>
    : never;
}[keyof T & string];

export type ResolvePath<
  T,
  P extends string
> = P extends `${infer Key}/${infer Rest}`
  ? Key extends keyof T
    ? ResolvePath<T[Key], Rest>
    : never
  : P extends keyof T
  ? T[P]
  : never;
