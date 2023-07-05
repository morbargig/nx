import { Component } from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
@Component({
  selector: 'fnx-nx-app-link-cell',
  templateUrl: '../default-cell/default-cell.component.html',
  styleUrls: ['./link-cell.component.scss'],
})
export class LinkCellComponent<
  T = any,
  K extends keyof T = keyof T
> extends DefaultCellComponent<T, K> {}

