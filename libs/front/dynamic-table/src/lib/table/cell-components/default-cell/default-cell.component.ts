import { Component } from '@angular/core';
import { BaseCellComponent } from '../../directives/base-cell.directive';
import { BaseCellData } from '../table.types.helpers';

@Component({
  selector: 'fnx-nx-app-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrls: ['./default-cell.component.scss'],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['col', 'item'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultCellComponent<
  T = any,
  K extends keyof T = keyof T,
  D extends BaseCellData<T> = BaseCellData<T>
> extends BaseCellComponent<T, K, D> {}
