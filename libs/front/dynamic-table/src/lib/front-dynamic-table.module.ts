import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from './table/table.module';

@NgModule({
  imports: [CommonModule, TableModule],
  exports: [TableModule],
})
export class FrontDynamicTableModule {}
