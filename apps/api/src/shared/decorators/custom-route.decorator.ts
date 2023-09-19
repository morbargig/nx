import {
  BFF_CONTROLLER_TYPE,
  BFF_ROUTES_TYPE,
  ControllerApiType,
} from '@fnx-nx/api-interfaces';
import { applyDecorators } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';
import { CustomController } from './custom-control.decoretor';

export function CustomRoute<C extends keyof BFF_ROUTES_TYPE>(
  path: keyof BFF_ROUTES_TYPE[C],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  method: BFF_ROUTES_TYPE[C][keyof BFF_ROUTES_TYPE[C]]['method']
) {
  const newMethod: BFF_CONTROLLER_TYPE[keyof BFF_CONTROLLER_TYPE]['method'] =
    method as any;
  const newPath = path as string;
  switch (newMethod) {
    case 'get':
      return applyDecorators(Get(newPath));
    case 'post':
      return applyDecorators(Post(newPath));
    case 'put':
      return applyDecorators(Put(newPath));
    case 'delete':
      return applyDecorators(Delete(newPath));
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
}
export function CustomControllerRoute<C extends keyof BFF_ROUTES_TYPE>(
  controler?: C
) {
  return CustomRoute<C>;
}

export function CustomControllerRouteDecorators<
  C extends keyof BFF_ROUTES_TYPE,
  R extends C extends keyof BFF_ROUTES_TYPE
    ? keyof BFF_ROUTES_TYPE[C]
    : string = C extends keyof BFF_ROUTES_TYPE
    ? keyof BFF_ROUTES_TYPE[C]
    : string
>(controller?: C) {
  return {
    Get: <
      U extends {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get' ? K : never;
      }[R] = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Get(path?.toString())),
    Post: <
      U extends {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post' ? K : never;
      }[R] = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Post(path?.toString())),
    Delete: <
      U extends {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete' ? K : never;
      }[R] = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Delete(path?.toString())),
    Put: <
      U extends {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put' ? K : never;
      }[R] = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-erro
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Put(path?.toString())),
    Controller: CustomController<C>,
    ControllerApiType: null as ControllerApiType<C>,
  };
}
