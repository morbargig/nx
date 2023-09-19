import { BFF_APP_CONTROL_ROUTES } from './controllers/app';
import { controlType } from './controllers/controllers';
import { UrlToCamelCase } from './helpers/url-to-camel-case';

type Routes = {
  [key in string]?: Readonly<controlType>;
};

const BFF_ROUTES = {
  '': BFF_APP_CONTROL_ROUTES,
} as const satisfies Routes;

export type BFF_ROUTES_TYPE = typeof BFF_ROUTES;
export type BFF_CONTROLLER_TYPE = controlType;

export type ControllerApiType<C extends keyof BFF_ROUTES_TYPE> = {
  [key in UrlToCamelCase<keyof BFF_ROUTES_TYPE[C]>]: any;
};
