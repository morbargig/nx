import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  EventEmitter
} from '@angular/core';
import {TableCellDic, ITableCell, TableColumnType, ITableColumn} from '../cell-components/cell-components';

@Directive({
  selector: '[tableCell]',
})

export class TableCellDirective<T = any> implements ITableCell<T>, OnInit {
  public component: ComponentRef<ITableCell<T>>;
  @Input('tableCell') public col: ITableColumn<T>;
  @Input() public item: T;
  @Output() public extends: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
  }

  ngOnInit(): void {
    const cellType: keyof typeof TableColumnType = this.col.type || 'Default';
    const factory = this.resolver.resolveComponentFactory<ITableCell<T>>(this.col?.customCellComponent ||
      (TableCellDic[cellType] as any));
    this.component = this.container.createComponent(factory);
    this.component.instance.col = this.col;
    this.component.instance.item = this.item;
    if (!!this.component.instance?.extends) {
      this.component.instance.extends = this.extends
    }
  }
}
