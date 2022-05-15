import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {LazyLoadEvent, MatchMode} from '../../lazy-load-event.type';
import {debounceTime} from 'rxjs/operators';
import {BaseComponent} from "../../../core/components/base-component.directive";

export type ITableFilterOption<T = any, K extends keyof T = keyof T> = {
  label?: string;
  value?: T[K];
}

export type ITableFilter<T = any> = {
  [K in keyof T]-?: {
    key: K;
    // label?: string;
    initialValue?: ({ (this: ITableFilter<T>): ITableFilter<T>['options'][number] });
    options: ITableFilterOption<T, K>[];
    matchMode: MatchMode;
  }
}[keyof T]

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent<T = any> extends BaseComponent implements OnInit {
  public form?: FormGroup & {
    controls: {
      [key in keyof T]: FormGroup & {
      controls: {
        matchMode: FormControl,
        value: FormControl
      }
    }
    }
  }

  public filterControl = (key: keyof T): FormGroup | null => this.form?.controls?.[key] || null

  constructor(private fb: FormBuilder) {
    super()
  }

  ngOnInit(): void {
    this.form = (this.fb.group(
      this.filters.reduce((p, c) => ({
        ...p,
        [c.key]: this.fb.group(
          {
            matchMode: this.fb.control(c.matchMode),
            value: this.fb.control(null),
          }
        )
      }), {})) as TableFiltersComponent<T>['form'])
    this.form?.valueChanges?.pipe<LazyLoadEvent<T>['filters'][number], LazyLoadEvent<T>['filters'][number]>(
      debounceTime(100),
      this.takeUntilDestroy(),
    ).subscribe(x => this.onFilter.next(x))
  }

  @Input() public filters?: ITableFilter<T>[]
  @Output() public onFilter: EventEmitter<LazyLoadEvent<T>['filters'][number]> = new EventEmitter<LazyLoadEvent<T>['filters'][number]>()
}
