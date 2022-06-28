import { Component } from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
@Component({
  selector: 'app-link-cell',
  templateUrl: '../default-cell/default-cell.component.html',
  styleUrls: ['./link-cell.component.scss']
})
export class LinkCellComponent extends DefaultCellComponent { }
