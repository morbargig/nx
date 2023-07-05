import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconBaseComponent } from '@fnx-nx/front/base-icons/lib/components/icon-base/icon-base.component';

enum IconClass {
  'btn-table-extend-close'='front/dynamic-table/btn-table-extend-close.svg'
}
@Component({
  selector: 'fnx-nx-app-icon-table',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  standalone: true,
})
export class AppIconComponent extends IconBaseComponent<typeof IconClass> {
  iconClassValue: typeof IconClass = IconClass;
}
