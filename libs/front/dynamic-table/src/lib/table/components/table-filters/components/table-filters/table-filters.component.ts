import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  LazyLoadEvent,
  MatchMode,
  FilterInsideObject,
} from '../../lazy-load-event.type';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../../../../core/components/base-component.directive';

class NewFormGroup<
  T,
  ChildControl extends AbstractControl = AbstractControl
> extends FormGroup {
  override controls: {
    [key in keyof T]: ChildControl;
  };
}

export type ITableFilterOption<T = any, K extends keyof T = keyof T> = {
  label?: string;
  value?: T[K];
};

export type ITableFilter<T = any> = {
  [K in keyof T]-?: {
    key: K;
    // label?: string;
    initialValue?: {
      (this: ITableFilter<T>): ITableFilter<T>['options'][number];
    };
    options: ITableFilterOption<T, K>[];
    matchMode: MatchMode;
  };
}[keyof T];

@Component({
  selector: 'softbar-app-table-filters',
  templateUrl: './table-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./table-filters.component.scss'],
})
export class TableFiltersComponent<T = { any: '' }>
  extends BaseComponent
  implements OnInit
{
  public form?: NewFormGroup<T, NewFormGroup<FilterInsideObject, FormControl>>;
  @Input() public filters?: ITableFilter<T>[];
  @Output() public filterChange: EventEmitter<
    LazyLoadEvent<T>['filters'][number]
  > = new EventEmitter<LazyLoadEvent<T>['filters'][number]>();

  public filterControl = (key: keyof T): FormGroup | null =>
    this.form?.controls?.[key] || null;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      this.filters.reduce(
        (p, c) => ({
          ...p,
          [c.key]: this.fb.group({
            matchMode: this.fb.control(c.matchMode),
            value: this.fb.control(null),
          }),
        }),
        {}
      )
    ) as TableFiltersComponent<T>['form'];
    this.form?.valueChanges
      ?.pipe<
        LazyLoadEvent<T>['filters'][number],
        LazyLoadEvent<T>['filters'][number]
      >(debounceTime(100), this.takeUntilDestroy())
      .subscribe((x) => this.filterChange.next(x));
  }
}
