import {
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
  OnInit,
} from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { ExtendCellDataModel } from './extends-cell-data.model';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'softbar-app-extends-cell',
  templateUrl: './extends-cell.component.html',
  styleUrls: ['./extends-cell.component.scss'],
  standalone:true,
  imports:[CommonModule,TranslatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendsCellComponent<
    T = any,
    K extends keyof T = keyof T,
    DModel extends ExtendCellDataModel<T, K> = ExtendCellDataModel<T, K>
  >
  extends DefaultCellComponent<T, K, DModel>
  implements OnInit
{
  @HostBinding('class.hidden') private hidden = false;
  public panelOpenState = false;

  // public get icon(): IconClass {
  //   if (this.isMobile) {
  //     return IconClass?.chevronUp
  //   }
  //   return IconClass?.chevronUp24
  // }

  public extends: EventEmitter<boolean> = new EventEmitter<boolean>();

  public get myValue(): ExtendsCellComponent<T>['value'] {
    if (!!this.value !== !this.hidden) {
      this.hidden = !!this.value;
    }
    return this.value;
  }

  public get isMobile(): boolean {
    return false;
    // TODO: implement when mobile is added
    // return isMobile()
  }

  public togglePanel = () => {
    this.panelOpenState = !this.panelOpenState;
    this.extends.next(this.panelOpenState);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this.data?.onExpand!?.(this.panelOpenState, this.item);
  };

  override ngOnInit(): void {
    if (this.data?.expandState) {
      this.panelOpenState = this.data.expandState;
      this.extends.next(this.panelOpenState);
    }
    super.ngOnInit();
  }
}
