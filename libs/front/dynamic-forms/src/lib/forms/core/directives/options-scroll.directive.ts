import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Subject, fromEvent } from 'rxjs';
import { delay, takeUntil, debounceTime, switchMap } from 'rxjs/operators';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}
@Directive({
  standalone: true,
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'mat-autocomplete[optionsScroll]',
  // selector: '[softbarOptionsScroll]'
})
export class OptionsScrollDirective implements OnDestroy {
  private _thresholdPercent = 0.8;
  @Input() set thresholdPercent(val: number) {
    if (val) {
      this._thresholdPercent = val;
    }
  }
  @Output() optionsScroll = new EventEmitter<IAutoCompleteScrollEvent>();
  _onDestroy: Subject<void> = new Subject();
  constructor(public autoComplete: MatAutocomplete) {
    this.autoComplete.opened
      .pipe(
        takeUntil(this._onDestroy),
        takeUntil(this.autoComplete?.closed),
        delay(0),
        switchMap(() =>
          /** Note: When autocomplete raises opened, panel is not yet created (by Overlay)
            Note: The panel will be available on next tick
            Note: The panel wil NOT open if there are no options to display
        */
          fromEvent(this?.autoComplete?.panel?.nativeElement, 'scroll')?.pipe(
            takeUntil(this._onDestroy),
            debounceTime(10)
          )
        )
      )
      ?.subscribe((event: any) => {
        this.onScroll(event);
      });
  }

  onScroll(event: any) {
    if (this._thresholdPercent === undefined) {
      this.optionsScroll.next({
        autoComplete: this.autoComplete,
        scrollEvent: event,
      });
    } else {
      const threshold =
        (this._thresholdPercent * 100 * event.target.scrollHeight) / 100;
      const current = event.target.scrollTop + event.target.clientHeight;
      if (current > threshold) {
        this.optionsScroll.next({
          autoComplete: this.autoComplete,
          scrollEvent: event,
        });
      }
    }
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
