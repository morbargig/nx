import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareCellDataModel } from './lazy-share-cell.data';
import { UiStandAloneIconComponent } from '@fnx-nx/front/ui-standalone-components/lib/components/ui-standalone-components-icon/ui-standalone-components-icon';
import { RetrieveDocument } from '@fnx-nx/api-interfaces';
import { DefaultCellComponent } from '@fnx-nx/front/dynamic-table/lib/table/cell-components/default-cell/default-cell.component';
import {
  LazyShareCellComponentTranslateModule,
  LazyShareCellComponentTranslationService,
} from './translate/translate.module';

export enum ApplicationType {
  none,
  archive,
  policyCopy,
  annualReport,
  quarterlyReport,
  taxApproval,
}

export type IShareDoc = RetrieveDocument;
@Component({
  standalone: true,
  imports: [
    CommonModule,
    UiStandAloneIconComponent,
    LazyShareCellComponentTranslateModule,
  ],
  selector: 'fnx-nx-lazy-share-cell',
  templateUrl: './lazy-share-cell.component.html',
  styleUrls: ['./lazy-share-cell.component.scss'],
})
export class LazyShareCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends ShareCellDataModel<T, K> = ShareCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {
  constructor(
    // private sharedService: SharedApiService,
    // private fileService: FileService
    cd: ChangeDetectorRef,
    public lazyShareCellComponentTranslationService: LazyShareCellComponentTranslationService
  ) {
    super(cd);
  }

  public get docs(): IShareDoc[] {
    const { col, item } = this;
    return col.parsedFullData
      ? col.parsedFullData(item)
      : col.parsedData
      ? col.parsedData(item[col.field])
      : item[col.field];
  }

  public get getDocument() {
    return this.data?.getDocument;
  }
}
