import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCellDirective } from './directives/table-cell.directive';
import { DefaultCellComponent } from './cell-components/default-cell/default-cell.component';
import { LinkCellComponent } from './cell-components/link-cell/link-cell.component';
import { RouterModule } from '@angular/router';
import { PriceCellComponent } from './cell-components/price-cell/price-cell.component';
import { ExtendsCellComponent } from './cell-components/extends-cell/extends-cell.component';
import { TableFiltersComponent } from './components/table-filters/components/table-filters/table-filters.component';
import { TablePagingComponent } from './components/table-paging/components/table-paging/table-paging.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableSelectFilterComponent } from './components/table-filters/components/table-select-filter/table-select-filter.component';
import { SafePipe } from './core/pipes/safe.pipe';
import { PillCellComponent } from './cell-components/pill-cell/pill-cell.component';
import { DateCellComponent } from './cell-components/date-cell/date-cell.component';
import { LoadingCellComponent } from './cell-components/loading-cell/loading-cell.component';
// import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // TranslateModule,
    // CarouselModule,
    // MatMenuModule,
  ],
  declarations: [
    TableComponent,
    TableCellDirective,
    DefaultCellComponent,
    LinkCellComponent,
    PriceCellComponent,
    DateCellComponent,
    ExtendsCellComponent,
    TableFiltersComponent,
    TablePagingComponent,
    TableSelectFilterComponent,
    SafePipe,
    PillCellComponent,
    LoadingCellComponent,
  ],
  exports: [TableComponent, TablePagingComponent, TableFiltersComponent],
})
export class TableModule {}
