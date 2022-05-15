import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AbstractControl} from '@angular/forms';
import {distinctUntilChanged, first, takeUntil, takeWhile, tap, timeout,} from 'rxjs/operators';
import {range} from 'lodash';
import {StepFormGroup, StepFormGroupGetRawValue,} from '../interfaces/step-form-group';

@Injectable({
  providedIn: 'platform',
})
export class StepperService<T = any> implements OnDestroy {
  /**
   * Negative number will take you to x step from the end / last = -1
   * Positive number will take you to x step from the start / first = 0
   */
  public toStep: Subject<number> = new Subject<number>();
  /**
   * Negative number will take you to previews steppes.
   * Positive number will take you to next steppes.
   */
  public relativeStep: Subject<number> = new Subject<number>();
  /**
   * true to disable all.
   * null | false to enable all.
   * { [step number] : boolean } to set enable and disable.
   * Array to disable all expat you can send either the step number or step title.
   */
  public disableStep: Subject<({ [key: number]: boolean } | (number | string)[]) | boolean> = new Subject<({ [key: number]: boolean } | (number | string)[]) | boolean>();
  /**
   * True will disable the form.
   * False will enable hte disables if any.
   */
  public disableForm: Subject<boolean> = new Subject<boolean>();
  /**
   * Current Step
   */
  public currentStep: number;
  /**
   * Event to listen to the wizard step
   */
  public stepChanged: Subject<number> = new Subject<number>();
  public entityId: number;
  public form: StepFormGroup<T>;
  private ended: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.stepChanged
      .pipe(
        takeUntil(this.ended),
        distinctUntilChanged(),
        tap((s) => (this.currentStep = s))
      )
      .subscribe();
  }

  public get formValues(): StepFormGroupGetRawValue<T> {
    return this.form?.getRawValue();
  }

  ngOnDestroy(): void {
    this.ended.next();
    this.ended.complete();
  }

  public next = () => this.relativeStep.next(1);

  public prev = () => this.relativeStep.next(-1);

  public toFirst = () => this.toStep.next(0);

  public toLast = () => this.toStep.next(-1);

  public enableAll = () => this.disableStep.next(null);

  /**
   * Negative number will take you to previews steppes.
   * Positive number will take you to next steppes.
   * this jump you to the wished step with delay if there was change with the step number it will break
   * if you would like to jump one and in the mind time you go by the steps it will ignore the jump request
   */
  public stepToRelativeStepWithDelay(
    relativeStep: number,
    delay: number = 2000
  ): Observable<number> {
    let jumpToStep = true;
    setTimeout(() => {
      if (jumpToStep) {
        jumpToStep = false;
        this.relativeStep.next(relativeStep);
      }
    }, delay);
    this.stepChanged
      .pipe(
        first(),
        takeWhile(() => !!jumpToStep),
        timeout(delay)
      )
      .subscribe(() => (jumpToStep = false));
    return this.stepChanged;
  }

  public disableTo = (relativeStepOrAbsoluteStep: number, isAbsolute?: boolean /** else he is relative */): void => {
    if (isAbsolute) {
      this.disableStep.next(range(0, relativeStepOrAbsoluteStep))
    } else {
      this.disableStep.next(range(0, this.currentStep + relativeStepOrAbsoluteStep + 1))
    }
  }

  public findFormArrFormControl = (title: string): AbstractControl =>
    this?.form?.controls.forms?.controls
      ?.find((f) => !!f?.controls?.[title])
      ?.get(title);

  public findFormArrayValuesObject = (
    title: string,
    formValues: StepFormGroupGetRawValue<T> = this.formValues
  ): any => formValues.forms?.find((f: any) => !!f?.[title])?.[title];

  public findFormArrayControlIndex = (title: string): number =>
    this?.form?.controls.forms?.controls?.findIndex(
      (f) => !!f?.controls?.[title]
    );
}
