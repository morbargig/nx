/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ViewContainerRef } from '@angular/core';
import {
  Directive,
  OnInit,
  OnDestroy,
  ComponentRef,
  Type,
  Input,
} from '@angular/core';

@Directive({
  selector: '[fnxNxDynamicComponent]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  // inputs: ['type: fnxNxDynamicComponent'],
})
export class DynamicComponentDirective<T = any, C extends Type<T> = Type<T>>
  implements OnInit, OnDestroy
{
  public component: ComponentRef<T>;
  @Input() public fnxNxDynamicComponent: C;
  @Input() public data: T;

  constructor(
    private container: ViewContainerRef // private cd: ChangeDetectorRef,
  ) {}

  public ngOnDestroy() {
    this?.component?.instance?.['ngOnDestroy']!?.();
  }

  ngOnInit(): void {
    this.createComponent();
  }

  private createComponent() {
    if (!this.fnxNxDynamicComponent) {
      return;
    }
    this.component = this.container.createComponent<T>(
      this.fnxNxDynamicComponent
    );
    Object.keys(this.data || {})?.forEach(
      (k) => (this.component.instance[k] = this.data?.[k])
    );
  }
}
