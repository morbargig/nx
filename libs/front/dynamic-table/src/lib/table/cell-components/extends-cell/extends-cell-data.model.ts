import { Observable } from 'rxjs';
import { BaseCellData } from '../table.types.helpers';
export interface ExtendCellDataModel<T = any, K extends keyof T = keyof T>
  extends BaseCellData<T, K> {
  expandState?: boolean;
  title?: string;
  title$?: Observable<string>;
  onExpand?: (isExpandState: boolean, item?: T) => void;
}
