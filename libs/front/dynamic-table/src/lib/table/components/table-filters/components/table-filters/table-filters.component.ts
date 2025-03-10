import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  AbstractControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { LazyLoadEvent, FilterInsideObject } from '../../lazy-load-event.type';
import { debounceTime } from 'rxjs/operators';
import { BaseComponent } from '../../../../core/components/base-component.directive';
import { ITableFilter } from './helpers';
import { CommonModule } from '@angular/common';
import { TableSelectInputComponent } from '../table-select-input/table-select-input.component';
import { TableSelectFilterComponent } from '../table-select-filter/table-select-filter.component';
import { TableMultiSelectFilterComponent } from '../table-multi-select-filter/table-multi-select-filter.component';
import { Subject } from 'rxjs';

class NewFormGroup<
  T,
  ChildControl extends AbstractControl = AbstractControl
> extends FormGroup {
  override controls: {
    [key in keyof T]: ChildControl;
  };
}

@Component({
  selector: 'softbar-app-table-filters',
  templateUrl: './table-filters.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./table-filters.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableSelectInputComponent,
    TableSelectFilterComponent,
    TableMultiSelectFilterComponent,
  ],
})
export class TableFiltersComponent<T = any>
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public form?: NewFormGroup<T, NewFormGroup<FilterInsideObject, FormControl>>;
  @Input() CDRefEvent: Subject<keyof ChangeDetectorRef> = new Subject<
    keyof ChangeDetectorRef
  >();
  @Input({ required: false }) public showResetFilters?: boolean | string;
  // @Input({ required: false }) public saveStorageId?: string;
  @Input({ required: true }) public filters?: ITableFilter<T>[];
  @Output() public filterChange: EventEmitter<
    LazyLoadEvent<T>['filters'][number]
  > = new EventEmitter<LazyLoadEvent<T>['filters'][number]>();

  public filterControl = (key: keyof T): FormGroup | null =>
    this.form?.controls?.[key] || null;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group(
      this.filters.reduce(
        (p, c) => ({
          ...p,
          [c.key]: this.fb.group({
            matchMode: (() => {
              return this.fb.control(c?.matchMode);
            })(),
            value: (() => {
              const control = this.fb.control(null);
              switch (c?.type) {
                case 'number': {
                  control.valueChanges.subscribe((value) => {
                    if (value === '') {
                      control.setValue(null, { emitEvent: false });
                    } else {
                      control.setValue(Number(value), {
                        emitEvent: false,
                      });
                    }
                  });
                  break;
                }
                default:
                  break;
              }
              return control;
            })(),
          }),
        }),
        {}
      )
    ) as TableFiltersComponent<T>['form'];
    this.form?.valueChanges
      ?.pipe(
        debounceTime(100),
        this.takeUntilDestroy<LazyLoadEvent<T>['filters'][number]>()
      )
      .subscribe((x) => {
        // this.saveStorageId &&
        //   localStorage.setItem(this.saveStorageId, JSON.stringify(x));
        this.filterChange.next(x);
      });
    // if (this.saveStorageId) {
    //   const savedFilter =
    //     JSON.parse(localStorage.getItem(this.saveStorageId)) || {};

    //   this.form.patchValue(savedFilter);
    // }
    this.CDRefEvent.pipe().subscribe((event) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
      this.cd?.[event]!?.();
    });
  }
}
