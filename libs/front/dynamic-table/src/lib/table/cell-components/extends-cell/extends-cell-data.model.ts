import { Observable } from 'rxjs';
import { BaseCellData } from '../cell-components';
export interface ExtendCellDataModel<T = any, K extends keyof T = keyof T> extends BaseCellData<T, K> {
    title?: string
    title$: Observable<string>
}