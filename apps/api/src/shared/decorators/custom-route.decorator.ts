import { BFF_ROUTES_TYPE } from '@fnx-nx/api-interfaces';
import { applyDecorators } from '@nestjs/common';
import { Get, Post, Put, Delete } from '@nestjs/common';

export function CustomControllerRoute<
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
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get' ? K : never;
      }[R] = {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Get(path?.toString())),
    Post: <
      U extends {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post' ? K : never;
      }[R] = {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Post(path?.toString())),
    Delete: <
      U extends {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete' ? K : never;
      }[R] = {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Delete(path?.toString())),
    Put: <
      U extends {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put' ? K : never;
      }[R] = {
        [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put' ? K : never;
      }[R]
    >(
      path: U
    ) => applyDecorators(Put(path?.toString())),
  };
}
