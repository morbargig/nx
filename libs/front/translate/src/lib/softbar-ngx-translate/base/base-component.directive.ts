import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';

@Directive({})
export class BaseComponentDirective implements OnDestroy {
  public readonly ngUnsubscribe: Subject<void> = new Subject<void>();
  protected readonly takeUntilDestroy = <T>() =>
    takeUntil<T>(this.ngUnsubscribe);
  protected readonly takeWhileAlive = <T>() =>
    takeWhile<T>(() => !this.ngUnsubscribe.closed);
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
