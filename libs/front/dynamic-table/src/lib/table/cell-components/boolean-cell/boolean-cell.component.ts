import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { BooleanCellDataModel } from './boolean-cell-data.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'softbar-app-boolean-cell',
  template: `
    <mat-icon class="boolean-icon">
      {{ value ? 'check_circle' : 'cancel' }}
    </mat-icon>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIcon],
})
export class BooleanCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends BooleanCellDataModel<T, K> = BooleanCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {
  constructor(protected override cd: ChangeDetectorRef) {
    super(cd);
  }
}
