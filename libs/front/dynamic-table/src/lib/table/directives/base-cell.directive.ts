import {
  Directive,
  HostBinding,
  HostListener,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ITableCell } from '../cell-components/cell-components';
import { BaseCellData } from '../cell-components';

@Directive()
export abstract class BaseCellComponent<
  T,
  K extends keyof T = keyof T,
  D extends BaseCellData<T, K> = BaseCellData<T, K>
> implements ITableCell<T, D, K>, OnInit
{
  public get value(): T[K] {
    return this.item?.[this.col.field];
  }
  public get data(): this['col']['data'] {
    return this.col?.data;
  }

  public col: ITableCell<T, D, K>['col'];
  public item: T;

  @HostListener('click', ['$event']) private baseCellOnClick(e?: Event) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    if (this.col?.disabled!?.({ val: this.value, item: this.item })) {
      e?.preventDefault();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
      this?.col?.onClick!?.(this.value, this.item);
    }
  }
  @HostBinding('class.cursor-pointer') private get baseCellIsLink() {
    return (
      this?.col?.onClick &&
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
      !this.col?.disabled!?.({ val: this.value, item: this.item })
    );
  }
  @HostBinding('attr.disabled') private get baseCellDisabled(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    return this?.col?.disabled!?.({ val: this.value, item: this.item })
      ? ''
      : null;
  }

  // @HostBinding('class.disabled') private get isDisable() {
  //   return (
  //     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
  //     // this?.col?.href!?.(this.value, this.item)?.length ||
  //     this?.col?.disable
  //   );
  // }
  @HostBinding('class') private get baseCellClasses(): string {
    const elStyle = this.col?.styleFunc
      ? this.col.styleFunc(this.value)
      : this.col?.bodyStyle?.['cell-component'];

    return (
      (elStyle?.styleClass ?? '') +
      ' ' +
      (Object.keys(elStyle?.styleClassObj || {})
        ?.reduce(
          (p, c) => [...p, ...(elStyle?.styleClassObj?.[c] ? [c] : [])],
          []
        )
        ?.join(' ') || '')
    );
  }
  constructor(protected cd: ChangeDetectorRef) {}
  public ngOnInit(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this.col?.registerOnchangeDetection!?.({
      cd: this.cd,
      val: this.value,
      item: this.item,
    });
  }

  public generateDataValue() {
    return this.col?.parsedFullData
      ? this.col.parsedFullData(this.item)
      : this.col?.parsedData
      ? this.col.parsedData(this.value)
      : this.value;
  }
}
