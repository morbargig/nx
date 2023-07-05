import { Observable, NextObserver } from 'rxjs';
export type CustomSubscribable<T = any> =
  | (Observable<T> & Partial<NextObserver<T>>)
  | ({
      new ();
    } & (Observable<T> & Partial<NextObserver<T>>));

export type NumRange<T extends number> = number extends T
  ? number
  : _Range<T, []>;
type _Range<T extends number, R extends unknown[]> = R['length'] extends T
  ? R[number]
  : _Range<T, [R['length'], ...R]>;
