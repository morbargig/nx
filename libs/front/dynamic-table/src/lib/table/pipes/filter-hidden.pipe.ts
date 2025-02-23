import { Pipe, PipeTransform } from '@angular/core';
import { ITableColumn } from '../cell-components';

@Pipe({
  name: 'filterHidden',
  standalone: true, // Angular 15+ Standalone Pipe
})
export class FilterHiddenPipe implements PipeTransform {
  transform<T>(columns: ITableColumn<T>[]): ITableColumn<T>[] {
    return columns.filter((col) => !col.hidden);
  }
}
