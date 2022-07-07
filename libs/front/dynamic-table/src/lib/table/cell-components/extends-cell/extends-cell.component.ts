import { Component, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { ExtendCellDataModel } from './extends-cell-data.model';

@Component({
  selector: 'app-extends-cell',
  templateUrl: './extends-cell.component.html',
  styleUrls: ['./extends-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendsCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends ExtendCellDataModel<T, K> = ExtendCellDataModel<T, K>,
  > extends DefaultCellComponent<T, K, DModel
  > {
  @HostBinding('class.hidden') private hidden: boolean = false;
  public panelOpenState: boolean = false

  // public get icon(): IconClass {
  //   if (this.isMobile) {
  //     return IconClass?.chevronUp
  //   }
  //   return IconClass?.chevronUp24
  // }

  public extends: EventEmitter<boolean> = new EventEmitter<boolean>()

  public get myValue(): ExtendsCellComponent<T>['value'] {
    if (!!this.value !== !this.hidden) {
      this.hidden = !!this.value
    }
    return this.value
  }

  // public get isMobile(): boolean {
  //   return isMobile()
  // }

  public togglePanel = () => {
    this.panelOpenState = !this.panelOpenState
    this.extends.next(this.panelOpenState)
  }
}
