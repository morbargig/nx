import { Component, Input } from '@angular/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'fnx-nx-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
})
export class DynamicComponentComponent<T = any>
  implements Pick<DynamicComponentDirective, 'fnxNxDynamicComponent' | 'data'>
{
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('dynamicComponent')
  fnxNxDynamicComponent: DynamicComponentDirective<T>['fnxNxDynamicComponent'];
  @Input() data: DynamicComponentDirective<T>['data'];
}
