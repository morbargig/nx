import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormSelectData } from './form-select';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'softbar-app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FormSelectComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponentDirective<T, FormSelectData<T, K>, K, FormControl>
  implements OnInit
{
  @HostBinding('class') public class: string = ((
    ngClass = 'flex w-full'
  ) => ngClass)();
  constructor(
    private cd: ChangeDetectorRef // private matIconRegistry: MatIconRegistry, // private domSanitizer: DomSanitizer
  ) {
    super();
  }
  public get disabled(): boolean {
    return this.config?.disabled || this.control?.disabled || null;
  }
  override ngOnInit(): void {
    super.ngOnInit();
    // this.matIconRegistry.addSvgIcon(
    //   'down',
    //   this.domSanitizer.bypassSecurityTrustResourceUrl(
    //     './assets/front/dynamic-forms/down.svg'
    //   )
    // );
    // console.log('this.ngOnInit control:', this.control);
    if (this.config?.disabled) {
      this.control.disable();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this.control?.registerOnDisabledChange!?.((/*isDisabled*/) => {
      this.cd.markForCheck();
    });
  }
}
