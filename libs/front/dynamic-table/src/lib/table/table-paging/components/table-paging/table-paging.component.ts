import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  // ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import {LazyLoadEvent} from '../../../table-filters/lazy-load-event.type';
// import {CarouselComponent, OwlOptions, SlidesOutputData} from 'ngx-owl-carousel-o';
import {firstValueFrom, timer} from 'rxjs';
import {BaseComponent} from "../../../core/components/base-component.directive";

@Component({
  selector: 'app-table-paging',
  templateUrl: './table-paging.component.html',
  styleUrls: ['./table-paging.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TablePagingComponent extends BaseComponent implements LazyLoadEvent {
  public constructor(private cd: ChangeDetectorRef) {
    super()
  }

  @Output() public pageChange: EventEmitter<Pick<LazyLoadEvent, 'page'>> = new EventEmitter<Pick<LazyLoadEvent, 'page'>>()
  private _page: LazyLoadEvent['page'] = 0
  public get page(): number {
    return this._page
  }

  @Input()
  public set page(v: number) {
    if (!v) {
      firstValueFrom(timer(0)).then(() => {
        // this.carouselRef?.to(this.id(v))
        this.startPosition = v;
        this.cd.markForCheck()
      })
    }
    this._page = v
    this.cd.markForCheck()
  }

  public id(i: number) {
    return 'paging-item-' + i
  }

  @Input() public pageSize: LazyLoadEvent['pageSize'] = 1
  private _pagesLength: number = 1
  public get pagesLength(): number {
    return this._pagesLength
  }

  @Input()
  public set pagesLength(v: number) {
    // if (!this.slideBy) {
    //   this.owlOptions.slideBy = v
    // }
    this._pagesLength = v;
  }

  private _totalRecords: number = 1
  public get totalRecords(): number {
    return this._totalRecords
  }

  @Input()
  public set totalRecords(v: number) {
    this._totalRecords = v;
    const pagesNumber = Math.ceil(this.totalRecords / this.pageSize)
    this.pages = Array(pagesNumber > 1 ? pagesNumber : 0)
    this.cd.markForCheck()
  }

  private _slideBy: number = 1
  public get slideBy(): number {
    return this._slideBy
  }

  @Input()
  public set slideBy(v: number) {
    this._slideBy = v
    // this.owlOptions.slideBy = this.slideBy
  }

  public pages: number[]

  // handleIndex(i: number) {
  //   this.pageChange.next({
  //     page: i
  //   })
  // }

  public startPosition: number

  // public handleChange({startPosition}: SlidesOutputData) {
  //   this.startPosition = startPosition
  //   firstValueFrom(timer(0)).then(() => this.cd.markForCheck())
  // }

  // @ViewChild('carouselRef', {static: false}) public carouselRef: CarouselComponent;
  // public owlOptions: OwlOptions = {
  //   margin: 30,
  //   dots: false,
  //   autoWidth: true,
  //   rtl: true,
  // }
}
