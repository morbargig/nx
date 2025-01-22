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
  selector: '[softBarDynamicComponent]',
  standalone: true,
})
export class DynamicComponentDirective<T = any, C extends Type<T> = Type<T>>
  implements OnInit, OnDestroy
{
  public component: ComponentRef<T>;
  @Input() public softBarDynamicComponent: C;
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
    if (!this.softBarDynamicComponent) {
      return;
    }
    this.component = this.container.createComponent<T>(
      this.softBarDynamicComponent
    );
    Object.keys(this.data || {})?.forEach(
      (k) => (this.component.instance[k] = this.data?.[k])
    );
  }
}
