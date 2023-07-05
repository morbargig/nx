import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { Price } from '../../models/price.model';
import { fixCustomCurrency } from '../../core/pipes/custom-currency.pipe';

@Component({
  selector: 'fnx-nx-app-price-cell',
  //extends DefaultCellComponent html template
  templateUrl: '../default-cell/default-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

//extends DefaultCellComponent
export class PriceCellComponent<T = any, K extends keyof T = keyof T>
  extends DefaultCellComponent<T, K>
  implements OnInit
{
  override generateDataValue() {
    return fixCustomCurrency(super.generateDataValue() as Price)
  }
}
