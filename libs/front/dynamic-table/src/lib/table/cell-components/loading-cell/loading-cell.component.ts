import { Component } from '@angular/core';
import { DefaultCellComponent } from '../default-cell';
import { LoadingCellDataModel } from './loading-cell-data.model';

@Component({
  selector: 'softbar-loading-cell',
  template: `<div class="loading w-4/5 h-full"></div>`,
})
export class LoadingCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends LoadingCellDataModel<T, K> = LoadingCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {}
