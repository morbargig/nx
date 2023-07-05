import {
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  EventEmitter,
  Type,
} from '@angular/core';
import {
  TableCellDic,
  ITableCell,
  TableColumnType,
  lazyCellLoadConfigure,
  ITableColumn,
} from '../cell-components/cell-components';
import { BaseCellComponent } from './base-cell.directive';

@Directive({
  selector: '[fnxNxTableCell]',
})
export class TableCellDirective<T = any> implements ITableCell<T>, OnInit {
  public component: ComponentRef<ITableCell<T>>;
  @Input('fnxNxTableCell') public col: ITableColumn<T>;
  @Input() public item: T;
  @Output() public extends: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private container: ViewContainerRef) {}

  ngOnInit(): void {
    const createComponent = <T extends Type<BaseCellComponent<any>>>(
      component: T,
      data?: any
    ) => {
      this.component = this.container.createComponent<ITableCell<T>>(
        component as any
      ) as any;
      if (data) {
        this.col.data = data;
      }
      this.component.instance.col = this.col;
      this.component.instance.item = this.item;
      if (this.component.instance?.extends) {
        this.component.instance.extends = this.extends;
      }
      this.component.changeDetectorRef.detectChanges();
    };
    if (this.col?.loadCustomCellComponent) {
      createComponent(TableCellDic.Loading);
      type loadCustomCellComponentHelperType = ReturnType<
        typeof lazyCellLoadConfigure
      >;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
      (this.col.loadCustomCellComponent as (
        ...args: any[]
      ) => Promise<loadCustomCellComponentHelperType>)!?.({
        calBack: lazyCellLoadConfigure,
      }).then((data: loadCustomCellComponentHelperType) => {
        this.component.destroy();
        createComponent(data?.component, data?.data);
      });
      // } else if (this.col?.customCellComponent) {
      //   createComponent(
      //     this.col.customCellComponent?.component,
      //     this.col.customCellComponent?.data
      //   );
      //   return;
    } else {
      const cellType: keyof typeof TableColumnType = this.col.type || 'Default';
      createComponent(TableCellDic[cellType]);
    }
  }
}
