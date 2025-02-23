import { Component, Input } from '@angular/core';
import { DynamicComponentDirective } from '../../directives/dynamic-component.directive';

@Component({
  selector: 'softbar-dynamic-component',
  standalone: true,
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  imports:[DynamicComponentDirective]
})
export class DynamicComponentComponent<T = any>
  implements Pick<DynamicComponentDirective, 'softbarDynamicComponent' | 'data'>
{
  @Input('dynamicComponent')
  softbarDynamicComponent: DynamicComponentDirective<T>['softbarDynamicComponent'];
  @Input() data: DynamicComponentDirective<T>['data'];
}
