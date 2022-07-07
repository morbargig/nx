import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { TableCellDirective } from './directives/table-cell.directive';
import { DefaultCellComponent } from './cell-components/default-cell/default-cell.component';
import { LinkCellComponent } from './cell-components/link-cell/link-cell.component';
import { RouterModule } from '@angular/router';
import { PriceCellComponent } from './cell-components/price-cell/price-cell.component';
import { ExtendsCellComponent } from './cell-components/extends-cell/extends-cell.component';
import { TableFiltersComponent } from './table-filters/components/table-filters/table-filters.component';
import { TablePagingComponent } from './table-paging/components/table-paging/table-paging.component';
// import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableSelectFilterComponent } from './table-filters/components/table-select-filter/table-select-filter.component';
// import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        // CarouselModule,
        // MatMenuModule,
    ],
    declarations: [
        TableComponent,
        TableCellDirective,
        DefaultCellComponent,
        LinkCellComponent,
        PriceCellComponent,
        ExtendsCellComponent,
        TableFiltersComponent,
        TablePagingComponent,
        TableSelectFilterComponent
    ],
    exports: [
        TableComponent,
        TablePagingComponent,
        TableFiltersComponent
    ],
})
export class TableModule { }
