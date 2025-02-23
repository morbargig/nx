import { Component, HostBinding } from '@angular/core';
import { DefaultCellComponent ,imports} from '../default-cell/default-cell.component';

@Component({
  selector: 'softbar-pill-cell',
  templateUrl: '../default-cell/default-cell.component.html',
  styleUrls: ['./pill-cell.component.scss'],
  imports,
  standalone:true
})
export class PillCellComponent extends DefaultCellComponent {
  @HostBinding('class') public class: string = ((
    ngClass = 'flex justify-center rounded-lg'
  ) => ngClass)();
}
