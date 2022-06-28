import {ChangeDetectorRef, Component, ElementRef, Inject, Input, ViewEncapsulation} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';
import {Directionality} from '@angular/cdk/bidi';
import {DOCUMENT} from "@angular/common";


@Component({
  selector: 'app-form-stepper',
  templateUrl: './form-stepper.component.html',
  styleUrls: ['./form-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: CdkStepper, useExisting: FormStepperComponent}],
})
export class FormStepperComponent extends CdkStepper {
  @Input() public activeClass = 'active';
  @Input() public inactiveClass = '';
  @Input() public bodyClass = '';

  constructor(ref: ChangeDetectorRef,
              dir: Directionality,
              elementRef: ElementRef<HTMLElement>,
              @Inject(DOCUMENT) private document: Document,
  ) {
    super(dir, ref, elementRef, document);
  }

  // public isNextButtonHidden() {
  //   return !(this.steps.length === this.selectedIndex + 1);
  // }
}
