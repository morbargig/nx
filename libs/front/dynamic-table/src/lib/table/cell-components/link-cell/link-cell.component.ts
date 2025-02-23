import { Component } from '@angular/core';
import {
  DefaultCellComponent,
  imports,
} from '../default-cell/default-cell.component';
@Component({
  selector: 'softbar-app-link-cell',
  templateUrl: '../default-cell/default-cell.component.html',
  styleUrls: ['./link-cell.component.scss'],
  standalone: true,
  imports,
})
export class LinkCellComponent<
  T = any,
  K extends keyof T = keyof T
> extends DefaultCellComponent<T, K> {}
