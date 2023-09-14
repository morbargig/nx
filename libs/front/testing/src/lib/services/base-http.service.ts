import { HttpClient } from '@angular/common/http';
import { BFF_ROUTES_TYPE } from '@fnx-nx/api-interfaces';

type SkipFirst<T extends any[]> = T extends [infer _First, ...infer Rest]
  ? Rest
  : never;

export abstract class BaseHttpService<
  C extends keyof BFF_ROUTES_TYPE = keyof BFF_ROUTES_TYPE
> {
  public abstract collationName: C;

  public get apiUrl() {
    return `${'/api'}/${this.collationName}`;
  }

  constructor(protected httpClient: HttpClient) {}

  getUrl<
    R extends C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string = C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string
  >(path: R) {
    return `${this.apiUrl}${path?.toString()}`;
  }

  post<
    T,
    R extends C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string = C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string,
    U extends {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R] = {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'post'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R]
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['post']>>) {
    return this.httpClient.post<T>(this.getUrl(url), ...params);
  }
  get<
    T,
    R extends C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string = C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string,
    U extends {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R] = {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'get'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R]
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['get']>>) {
    return this.httpClient.get<T>(this.getUrl(url), ...params);
  }
  put<
    T,
    R extends C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string = C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string,
    U extends {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R] = {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'put'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R]
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['put']>>) {
    return this.httpClient.put<T>(this.getUrl(url), ...params);
  }
  delete<
    T,
    R extends C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string = C extends keyof BFF_ROUTES_TYPE
      ? keyof BFF_ROUTES_TYPE[C]
      : string,
    U extends {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R] = {
      [K in R]: BFF_ROUTES_TYPE[C][K]['method'] extends 'delete'
        ? BFF_ROUTES_TYPE[C][K]['response'] extends T
          ? K
          : never
        : never;
    }[R]
  >(url: U, ...params: SkipFirst<Parameters<HttpClient['delete']>>) {
    return this.httpClient.delete<T>(this.getUrl(url), ...params);
  }
}
