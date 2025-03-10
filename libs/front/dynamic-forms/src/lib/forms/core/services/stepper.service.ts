import { Injectable, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  Observable,
  Subject,
  timer,
  firstValueFrom,
  BehaviorSubject,
} from 'rxjs';
import { AbstractControl } from '@angular/forms';
import { first, takeWhile, timeout } from 'rxjs/operators';
import {
  StepFormGroup,
  StepFormGroupGetRawValue,
  WizardPageConfig,
} from '../interfaces/step-form-group';
import { range } from '../../../utils/range.func';
type KeysUnMatching<T, V> = { [K in keyof T]-?: T[K] extends V ? never : K }[keyof T];

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
  public disableStep: Subject<
    ({ [key: number]: boolean } | (number | string)[]) | boolean
  > = new Subject<
    ({ [key: number]: boolean } | (number | string)[]) | boolean
  >();
  /**
   * True will disable the form.
   * False will enable hte disables if any.
   */
  public disableForm: Subject<boolean> = new Subject<boolean>();
  /**
   * Current Step
   */
  /**
   * Event to listen to the wizard step
   */

  private stepSource: BehaviorSubject<number> = new BehaviorSubject(null);
  public get stepChanges() {
    return this.stepSource.asObservable();
  }
  public get step() {
    return this.stepSource.getValue();
  }
  public set step(v: number) {
    this.stepSource.next(v);
  }

  public entityId: number;
  public dynamicSteppedForm: WizardPageConfig<T>['arrayConfig']['controls'];

  private formSource: BehaviorSubject<StepFormGroup<T>> = new BehaviorSubject(
    null
  );
  public get formChanges() {
    return this.formSource.asObservable();
  }
  public get form() {
    return this.formSource.getValue();
  }
  public set form(v: StepFormGroup<T>) {
    this.formSource.next(v);
  }

  public CDRefEvent: Subject<keyof ChangeDetectorRef> = new Subject<
    keyof ChangeDetectorRef
  >();

  public get formValues(): StepFormGroupGetRawValue<T> {
    return this.form?.getRawValue();
  }

  ngOnDestroy(): void {
    this.resetState();
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
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    delay: number = 2000
  ): Observable<number> {
    let jumpToStep = true;
    firstValueFrom(timer(delay)).then(() => {
      if (jumpToStep) {
        jumpToStep = false;
        this.relativeStep.next(relativeStep);
      }
    });
    this.stepChanges
      .pipe(
        first(),
        takeWhile(() => !!jumpToStep),
        timeout(delay)
      )
      .subscribe(() => (jumpToStep = false));
    return this.stepChanges;
  }

  public disableTo = (
    relativeStepOrAbsoluteStep: number,
    isAbsolute?: boolean /** else he is relative */
  ): void => {
    if (isAbsolute) {
      this.disableStep.next(range(0, relativeStepOrAbsoluteStep));
    } else {
      this.disableStep.next(
        range(0, this.step + relativeStepOrAbsoluteStep + 1)
      );
    }
  };

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

  resetState() {
    type componentStateKeys = KeysUnMatching<
      StepperService,
      | ((...args: any[]) => any)
      | BehaviorSubject<any>
      | Subject<any>
      | Observable<any>
      | Pick<StepperService, 'formValues'>[keyof Pick<
          StepperService,
          'formValues'
        >]
    >;
    const initialState = {
      form: undefined,
      step: null,
      entityId: null,
      dynamicSteppedForm: null,
    } as const satisfies {
      [K in componentStateKeys]-?: StepperService[K];
    };
    Object.entries(initialState)?.forEach(([key, value]) => {
      if (key in this) {
        return (this[key] = value);
      }
    });
  }
}
