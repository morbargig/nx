/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { DynamicSteppedForm } from '../../interfaces/dynamic-stepped-form';
import { CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { BehaviorSubject, firstValueFrom, timer } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { StepperService } from '../../services/stepper.service';
import { range } from 'lodash-es';
import { StepFormGroup } from '../../interfaces/step-form-group';
import { AbstractControl } from '@angular/forms';
@Component({
  selector: 'softbar-app-dynamic-stepped-form',
  templateUrl: './dynamic-stepped-form.component.html',
  styleUrls: ['./dynamic-stepped-form.component.scss'],
})
export class DynamicSteppedFormComponent
  extends CdkStepper
  implements OnInit, OnDestroy
{
  @ViewChild('cdkStepper', { static: false }) public cdkStepper: CdkStepper;
  @ViewChild('submitBtn', { static: false })
  public submitBtn: ElementRef<HTMLButtonElement>;
  @Input() public useStepperService?: boolean;
  @Input() public config: DynamicSteppedForm[] = [];
  @Input() public validation: ValidatorFn[] = null;
  @Input() public errorMessages?: { [error: string]: string };
  // @Input() public formRowCssClass = '';
  // @Input() public formCssClass = '';
  // @Input() public bodyClass = '';
  // @Input() public isLinear = true;
  // @Input() public isEditable = true;
  // @Input() public footerMode: SteppedFormFooterMode =
  //   SteppedFormFooterMode.Default;
  @Input() public formValue?: BehaviorSubject<any>;
  public stepErrors: { [step: number]: number } = {};
  @Output() public stepperOnSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() public formChange: EventEmitter<StepFormGroup> =
    new EventEmitter<StepFormGroup>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public onStepChanged = new EventEmitter<number>();
  public isAlive = true;

  constructor(
    dir: Directionality,
    elementRef: ElementRef<HTMLElement>,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder,
    private stepperService: StepperService
  ) {
    super(dir, cd, elementRef);
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

  public get isPrevDisable(): boolean {
    return this.config?.[this.selectedIndex - 1]?.isDisable;
  }

  override ngOnDestroy() {
    super.ngOnDestroy!?.();
    this.isAlive = false;
    if (this.useStepperService) {
      this.stepperService.resetState();
    }
  }

  ngOnInit(): void {
    this.formValue.pipe(takeWhile(() => this.isAlive)).subscribe((res) => {
      this.form?.controls?.forms?.controls?.forEach((form) => {
        form.patchValue(res, { onlySelf: false, emitEvent: true });
        firstValueFrom(timer(0)).then(() => {
          Object.keys(form?.controls || {}).forEach((i) => {
            if (form?.get(i) instanceof FormGroup) {
              form.get(i)?.patchValue(res);
            }
          });
        });
      });
    });
    firstValueFrom(timer(0)).then(() => {
      this.stepErrors = this.config?.reduce((prev, curr, i) => {
        prev[i] = 0;
        return prev;
      }, {});
      this.form = this.fb.group({
        forms: this.fb.array([
          ...(this.config || []).map((stepConf, i) =>
            this.fb.group(
              stepConf.group.reduce((prev, curr) => {
                prev[curr.field] = curr?.value;
                return prev;
              }, {}),
              {
                validators: stepConf?.validators,
                asyncValidators: stepConf?.asyncValidators,
              }
            )
          ),
        ]),
      }) as FormGroup as any as StepFormGroup;
      this.stepperService.form = this.form;
      this.stepperService.dynamicSteppedForm = this.config;
      this.cd.detectChanges();
    });
    if (this.validation?.length) {
      this.form.setValidators(this.validation);
    }
    if (this.useStepperService) {
      this.stepperService.step = 0;
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
                  steps?.includes(index) || steps?.includes(i?.stepTitle)
                ))
            );
          } else if (typeof steps === 'object') {
            Object.keys(steps || {}).forEach((i) => {
              this.config[Number(i)].isDisable = steps?.[i];
            });
          }
          this.cd.markForCheck();
        });
      this.stepperService.disableForm
        .pipe(takeWhile(() => this.isAlive))
        .subscribe((disable) => {
          if (disable) {
            this.form.setErrors({ ...this.form.errors, incorrect: true });
          } else {
            const { errors } = this.form;
            delete errors?.['incorrect'];
            this.form.setErrors(this.form.errors);
          }
        });
      this.stepperService.CDRefEvent.pipe(
        takeWhile(() => this.isAlive)
      ).subscribe((event) => {
        this.cd?.[event]!?.();
      });
    }
  }

  public stepChanged(step: number, selectedIndex: number) {
    this.useStepperService && (this.stepperService.step = selectedIndex);
    if (this.config[step]) {
      const controls = (
        this.form.controls['forms'].controls[step + ''] as FormGroup
      )?.controls;
      const errors = this.extractErrors(controls);
      this.stepErrors[step] = errors;
    }
    this.onStepChanged.emit(selectedIndex);
  }

  public handleSubmit() {
    this.form.updateValueAndValidity();
    if (this.form.valid) {
      this.stepperOnSubmit.emit(this.form.getRawValue());
    }
  }

  private extractErrors(controls: { [key: string]: AbstractControl }): number {
    const controlsNames = Object.keys(controls);
    let errors = 0;
    controlsNames?.forEach((controlsName) => {
      const control = controls[controlsName];
      if (control instanceof FormGroup) {
        errors += this.extractErrors(control.controls);
      }
      control.markAsDirty();
      control.markAsTouched();
      control.updateValueAndValidity();
      !control.valid && errors++;
    });

    return errors;
  }

  public controlPlusData(step: DynamicSteppedForm, i: number) {
    const control = this.form.controls['forms']?.get(i?.toString());
    control['data'] = step;
    return control;
  }

  // debugForm() {
  //   console.log('DEBUG FORM', this.form.getRawValue());
  // }
}
