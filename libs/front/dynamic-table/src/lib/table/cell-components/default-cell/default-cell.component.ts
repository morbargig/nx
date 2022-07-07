import {Component} from '@angular/core';
import {BaseCellComponent} from '../../directives/base-cell.directive';
import {BaseCellData} from '../cell-components';

@Component({
  selector: 'app-default-cell',
  templateUrl: './default-cell.component.html',
  styleUrls: ['./default-cell.component.scss'],
  inputs: ['col', 'item']
})

export class DefaultCellComponent<T = any,
  K extends keyof T = keyof T,
  D extends BaseCellData<T> = BaseCellData<T>> extends BaseCellComponent<T, K, D> {
}
