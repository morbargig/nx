import { OnDestroy, Type } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type Modify<T, R> = Omit<T, keyof R> & R;

type BaseComponentDecoratorThisType = {
  _takeUntilDestroy$?: Subject<void>;
} & Partial<OnDestroy>;

type BaseDecoratorComponentInsideType = {
  active: { get: (this: BaseComponentDecoratorThisType) => boolean };
  destroy?: { get: (this: BaseComponentDecoratorThisType) => Observable<void> };
} & Partial<BaseComponentDecoratorThisType>;

export type BaseDecoratorComponentType = Modify<
  BaseDecoratorComponentInsideType,
  {
    active: boolean;
    destroy?: Observable<void>;
  }
>;

export function BaseComponentDecorator(
  // <
  //   T = any,
  //   C extends BaseComponentDecoratorThisType = BaseComponentDecoratorThisType & T
  // >
  constructor: Type<Partial<OnDestroy>>
): void {
  const originalDestroy = constructor.prototype.ngOnDestroy;
  if (typeof originalDestroy !== 'function') {
    console.warn(
      `${constructor.name} is using @TakeUntilDestroy but does not implement OnDestroy`
    );
  }
  Object.defineProperties(constructor.prototype, {
    destroy: {
      get: function () {
        if (!this?._takeUntilDestroy$) {
          this._takeUntilDestroy$ = new Subject<void>();
        }
        return this._takeUntilDestroy$.asObservable();
      },
    },
  } as Pick<BaseDecoratorComponentInsideType, 'destroy'>);
  Object.defineProperties(constructor.prototype, {
    active: {
      get: function () {
        return !this?._takeUntilDestroy$?.closed;
      },
    },
  } as Pick<BaseDecoratorComponentInsideType, 'active'>);

  constructor.prototype.ngOnDestroy = function (
    this: BaseDecoratorComponentInsideType,
    ...args :any[]
  ): void {
    if (typeof originalDestroy === 'function') {
      originalDestroy.apply(this, args);
    }
    if (!this?._takeUntilDestroy$?.closed) {
      this?._takeUntilDestroy$?.next();
      this?._takeUntilDestroy$?.complete();
    }
  };
}
