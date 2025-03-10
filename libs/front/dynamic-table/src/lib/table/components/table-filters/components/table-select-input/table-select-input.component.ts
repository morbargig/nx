import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ITableFilter } from '../table-filters/helpers';
import { MatchMode } from '../../lazy-load-event.type';

@Component({
  selector: 'softbar-table-select-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './table-select-input.component.html',
  styles:[`.mat-mdc-notch-piece.mdc-notched-outline__notch {
    border-right: 0 !important;
  }
  
  mat-label {
    padding: 0.5em;
    z-index: auto;
    display: block;
  }
  `]
})
export class TableSelectInputComponent<T = any> implements OnInit {
  @Input({ required: true }) ctl: ITableFilter<T>;
  @Input({ required: true }) matchModeFormControl: FormControl<MatchMode>;
  @Input({ required: true }) inputFormControl: FormControl<string | number>;
  selectedMode: ITableFilter<T>['matchModes'][number];
  setMatchMode(mode: ITableFilter<T>['matchModes'][number]) {
    this.selectedMode = mode;
    this.matchModeFormControl.setValue(mode.matchMode);
  }
  ngOnInit(): void {
    this.selectedMode = this.ctl?.matchModes?.find(
      (i) => i?.matchMode == this.matchModeFormControl.value
    );
  }
}
