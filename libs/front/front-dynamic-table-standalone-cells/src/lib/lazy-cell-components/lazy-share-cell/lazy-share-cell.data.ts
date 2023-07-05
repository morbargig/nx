// export interface ShareCellDataModel<T = any, K extends keyof T = keyof T>
//   extends BaseCellData<T, K> {
//   // hideDownloadButton:boolean
// }

import type { BaseCellData } from '@fnx-nx/front/dynamic-table/lib/table/cell-components';

export interface ShareCellDataModel<T = any, K extends keyof T = keyof T>
  extends BaseCellData<T, K> {
  getDocument: (doc: any, isDownload: boolean) => void;
}
