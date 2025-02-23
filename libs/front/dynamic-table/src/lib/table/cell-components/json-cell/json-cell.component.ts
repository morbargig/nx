import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { DefaultCellComponent } from '../default-cell/default-cell.component';
import { JsonCellDataModel } from './json-cell-data.model';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { NgIf } from '@angular/common';

@Component({
  selector: 'softbar-app-json-cell',
  template: `
    <mat-icon *ngIf="value" (click)="openJsonDialog()" class="json-icon">
      {{ isArray ? 'data_array' : 'data_object' }}
    </mat-icon>
  `,
  styles: [
    `
      .json-icon {
        cursor: pointer;
        color: #3f51b5;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatIconModule, NgIf],
})
export class JsonCellComponent<
  T = any,
  K extends keyof T = keyof T,
  DModel extends JsonCellDataModel<T, K> = JsonCellDataModel<T, K>
> extends DefaultCellComponent<T, K, DModel> {
  constructor(
    protected override cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    super(cd);
  }

  get isArray(): boolean {
    return Array.isArray(this.value);
  }

  openJsonDialog() {
    this.dialog.open(JsonDialogComponent, {
      data: { json: JSON.stringify(this.value, null, 2) }, // Pass cellData as JSON
      width: '500px',
    });
  }
}

import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'json-dialog',
  template: `
    <h1 mat-dialog-title>JSON Preview</h1>
    <div mat-dialog-content>
      <pre>{{ data.json }}</pre>
    </div>
    <div mat-dialog-actions class="flex !justify-between">
      <button mat-icon-button (click)="copyToClipboard()">
        <mat-icon>content_copy</mat-icon>
      </button>
      <button m mat-dialog-close>Close</button>
    </div>
  `,
  standalone: true,
  imports: [MatDialogModule, MatIconModule],
})
export class JsonDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { json: string },
    private clipboard: Clipboard
  ) {}

  copyToClipboard() {
    this.clipboard.copy(this.data.json);
  }
}
