import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { CdkStepper, CdkStep } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { NumRange } from '../../interfaces';
import { DynamicSteppedForm } from '../../interfaces/dynamic-stepped-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'softbar-app-form-stepper',
  templateUrl: './form-stepper.component.html',
  standalone: true,
  styleUrls: ['./form-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: CdkStepper, useExisting: FormStepperComponent }],
  imports:[CommonModule]
})
export class FormStepperComponent extends CdkStepper {
  @HostBinding('class') public class: string = ((ngClass = 'block h-full') =>
    ngClass)();
  @Input() public activeClass = ((ngClass = 'active') => ngClass)();
  @Input() public inactiveClass = ((ngClass = 'text-med-gray') =>
    ngClass)();
  @Input() public headerClass = ((ngClass = ' text-[1.375rem] text-primary-blue') => ngClass)();

  constructor(
    ref: ChangeDetectorRef,
    dir: Directionality,
    elementRef: ElementRef<HTMLElement>
  ) {
    super(dir, ref, elementRef);
  }

  isMobile: boolean;

  get hasTitles(): boolean {
    return this.steps.some(
      (s) => !!this.stepControl(s?.stepControl)?.stepTitle
    );
  }

  public stepControl(
    v: CdkStep['stepControl'] & { data?: DynamicSteppedForm }
  ): DynamicSteppedForm {
    return v?.data;
  }

  public getAngle<T extends NumRange<101>>(percent: T) {
    if (!percent) {
      return [0, 0];
    }
    // return percent > 50 ? [180,(percent - 50) / 100 * 360 ] : [(percent) / 100 * 360,0 ]
    switch (percent > 50) {
      case true: {
        return [180, ((percent - 50) / 100) * 360];
        break;
      }
      case false: {
        return [(percent / 100) * 360, 0];
        break;
      }
    }
  }

  public goToSelectedStepOnClick(selectedIndex) {
    if(super.selectedIndex > selectedIndex) super.selectedIndex = selectedIndex;
  }
  // public isNextButtonHidden() {
  //   return !(this.steps.length === this.selectedIndex + 1);
  // }
}