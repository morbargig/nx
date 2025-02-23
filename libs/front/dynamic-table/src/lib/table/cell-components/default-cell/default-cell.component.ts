import { Component } from '@angular/core';
import { BaseCellComponent } from '../../directives/base-cell.directive';
import { BaseCellData } from '../table.types.helpers';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../core/pipes';
import { RouterModule } from '@angular/router';

export const imports :Component['imports'] = [CommonModule,SafePipe,RouterModule]

@Component({
  selector: 'softbar-app-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrls: ['./default-cell.component.scss'],
  imports,
  standalone:true,
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['col', 'item'],
})
export class DefaultCellComponent<
  T = any,
  K extends keyof T = keyof T,
  D extends BaseCellData<T> = BaseCellData<T>
> extends BaseCellComponent<T, K, D> {}
