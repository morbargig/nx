import { Component } from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';

@Component({
  selector: 'app-price-cell',
  //extends DefaultCellComponent html template
  templateUrl: '../default-cell/default-cell.component.html',
})

//extends DefaultCellComponent
export class PriceCellComponent extends DefaultCellComponent {
  ngOnInit() {
    // extends the default cell component but just overwrite with extra code one little function
    // const oldParseData = this.col?.parsedData
    // this.col.parsedData = (x) => {
    //   const price: ISum = !!oldParseData ? oldParseData(x) : x
    //   return fixCustomCurrency(price)
    // }
  }
}
