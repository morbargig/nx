/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn,} from '@angular/forms';
import {DynamicSteppedForm, SteppedFormFooterMode,} from '../../interfaces/dynamic-stepped-form';
import {CdkStepper} from '@angular/cdk/stepper';
import {Directionality} from '@angular/cdk/bidi';
import {BehaviorSubject} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import {StepperService} from '../../services/stepper.service';
import {range} from 'lodash';
import {StepFormGroup} from '../../interfaces/step-form-group';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'fnx-nx-app-dynamic-stepped-form',
  templateUrl: './dynamic-stepped-form.component.html',
  styleUrls: ['./dynamic-stepped-form.component.scss'],
})
export class DynamicSteppedFormComponent
  extends CdkStepper
  implements OnInit, OnDestroy {
  @ViewChild('cdkStepper', {static: false}) public cdkStepper: CdkStepper;
  @ViewChild('submitBtn', {static: false})
  public submitBtn: ElementRef<HTMLButtonElement>;
  @Input() public stepBody: object;
  @Input() public useStepperService?: boolean;
  @Input() public config: DynamicSteppedForm[] = [];
  @Input() public validation: ValidatorFn[] = null;
  @Input() public errorMessages?: { [error: string]: string };
  @Input() public formRowCssClass = '';
  @Input() public formCssClass = '';
  @Input() public bodyClass = '';
  @Input() public isLinear = true;
  @Input() public isEditable = true;
  @Input() public footerMode: SteppedFormFooterMode =
    SteppedFormFooterMode.Default;
  @Input() public formValue?: BehaviorSubject<any>;
  public stepErrors: { [step: number]: number } = {};
  public selectedInd = 0;
  @Output() public stepperOnSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public formChange: EventEmitter<StepFormGroup> =
    new EventEmitter<StepFormGroup>();
  public isAlive = true;

  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    dir: Directionality,
    elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    private stepperService: StepperService
  ) {
    super(dir, ref, elementRef, document);
  }

  private _form: StepFormGroup;

  @Input()
  public get form(): StepFormGroup {
    return this._form;
  }

  public set form(v: StepFormGroup) {
    this._form = v;
    this.formChange.emit(this._form);
  }

  public get validForm(): boolean {
    return (
      this.form.valid &&
      this.form.controls.forms.controls.every(
        (i) =>
          i.valid &&
          Object.keys(i?.controls).every((t) => !i?.controls?.[t]?.invalid)
      )
    );
  }

  public get isNextDisable(): boolean {
    return this.config?.[this.selectedIndex + 1]?.isDisable;
  }

  // log(val: any) {
  //   console?.log(val)
  // }

  public get isPrevDisable(): boolean {
    return this.config?.[this.selectedIndex - 1]?.isDisable;
  }

  override ngOnDestroy() {
    super.ngOnDestroy!?.()
    this.isAlive = false;
  }

  ngOnInit(): void {
    this.formValue.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      if (this.form?.controls?.forms?.controls?.length) {
        const forms = this.form?.controls?.forms?.controls;
        for (let i = 0; i < forms.length; i++) {
          const form: FormGroup = forms[i] as any;
          form.patchValue(res, {onlySelf: false, emitEvent: true});
          setTimeout(() => {
            Object.keys(form?.controls || {}).forEach((i) => {
              if (form?.get(i) instanceof FormGroup) {
                form.get(i)?.patchValue(res);
              }
            });
          });
        }
      }
    });
    setTimeout(() => {
      this.stepErrors = this.config.reduce((prev, curr, i) => {
        prev[i] = 0;
        return prev;
      }, {});
      this.form = this.fb.group({
        forms: this.fb.array([
          ...this.config.map((_, i) =>
            this.fb.group(
              this.config[i].group.reduce((prev, curr,) => {
                prev[curr.field] = curr?.value;
                return prev;
              }, {})
            )
          ),
        ]),
      }) as FormGroup as any as StepFormGroup;
      this.stepperService.form = this.form;
    });
    if (!!this.validation && !!this.validation.length) {
      this.form.setValidators(this.validation);
    }
    if (this.useStepperService) {
      this.stepperService.stepChanged.next(0);
      this.stepperService.relativeStep
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((res) => {
          if (res > 0) {
            range(0, res).forEach(() => {
              this.cdkStepper.next();
            });
          } else {
            range(res, 0).forEach(() => {
              this.cdkStepper.previous();
            });
          }
        });
      this.stepperService.toStep
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((res) => {
          const stepperLength = this.config?.length;
          let steps: number[];
          if (res >= 0) {
            steps = range(this.selectedIndex, res);
          } else {
            steps = range(this.selectedIndex, stepperLength + res);
          }
          if (steps?.[0] === Math.max(...steps)) {
            steps?.forEach(() => {
              this.cdkStepper.previous();
            });
          } else {
            steps?.forEach(() => {
              this.cdkStepper.next();
            });
          }
        });
      this.stepperService.disableStep
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((steps) => {
          if (steps === true) {
            this.config.forEach((i) => (i.isDisable = true));
          } else if (!steps) {
            this.config.forEach((i) => (i.isDisable = false));
          } else if (Array.isArray(steps)) {
            this.config.forEach(
              (i, index) =>
                (i.isDisable = !(
                  steps?.includes(index) || steps?.includes(i?.title)
                ))
            );
          } else if (typeof steps === 'object') {
            Object.keys(steps || {}).forEach((i) => {
              this.config[Number(i)].isDisable = steps?.[i];
            });
          }
          this.ref.markForCheck();
        });
      this.stepperService.disableForm
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((disable) => {
          if (disable) {
            this.form.setErrors({...this.form.errors, incorrect: true});
          } else {
            const {errors} = this.form;
            delete errors?.['incorrect'];
            this.form.setErrors(this.form.errors);
          }
        });
    }
  }

  public stepChanged(step: number, selectedIndex: number) {
    this.selectedInd = selectedIndex;
    this.useStepperService &&
    this.stepperService.stepChanged.next(selectedIndex);
    if (this.config[step]) {
      const controls = (
        this.form.controls['forms'].controls[step + ''] as FormGroup
      )?.controls;
      const controlsNames = Object.keys(controls);
      let errors = 0;
      for (let index = 0; index < controlsNames.length; index++) {
        const controlsName = controlsNames[index];
        if (!this.config[step].group.some((c) => c.field == controlsName)) {
          const control = controls[controlsName];
          if (control instanceof FormGroup) {
            // let innerControls = control.controls;
            errors += this.extractErrors(control.controls);
          } else {
            control.markAsDirty();
            control.markAsTouched();
            control.updateValueAndValidity();
            control.invalid && errors++;
          }
        }
      }
      this.stepErrors[step] = errors;
    }
  }

  public handleSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.valid && !!this.submit) {
      this.stepperOnSubmit.emit(this.form.getRawValue());
    }
  }

  public submit() {
    this.submitBtn?.nativeElement.click();
  }

  private extractErrors(controls: { [key: string]: AbstractControl }): number {
    const controlsNames = Object.keys(controls);
    let errors = 0;
    for (let index = 0; index < controlsNames.length; index++) {
      const controlsName = controlsNames[index];
      const control = controls[controlsName];
      if (control instanceof FormGroup) {
        // let innerControls = control.controls;
        errors += this.extractErrors(control.controls);
      }
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
      !control.valid && errors++;
    }
    return errors;
  }
}
