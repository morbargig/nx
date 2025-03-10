import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectorRef,
} from '@angular/core';
import { LazyLoadEvent } from '../../../table-filters/lazy-load-event.type';
import { firstValueFrom, timer } from 'rxjs';
import { BaseComponent } from '../../../../core/components/base-component.directive';
import { getValueInRange, isNumber } from '../../../../util';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'softbar-app-table-paging',
  templateUrl: './table-paging.component.html',
  imports: [CommonModule, MatIcon],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePagingComponent
  extends BaseComponent
  implements LazyLoadEvent
{
  private _totalRecords = 1;
  public pages: number[];
  public startPosition: number;
  public pageCount = 0;

  console = console;
  @Input() maxSize = 3;
  @Input() public pageSize: LazyLoadEvent['pageSize'] = 1;

  public constructor(private cd: ChangeDetectorRef) {
    super();
  }

  @Output() public pageChange: EventEmitter<Pick<LazyLoadEvent, 'pageNum'>> =
    new EventEmitter<Pick<LazyLoadEvent, 'pageNum'>>();
  private _page: LazyLoadEvent['pageNum'] = 0;

  public get pageNum(): number {
    return this._page;
  }

  @Input()
  public set pageNum(newPage: number) {
    if (!newPage) {
      firstValueFrom(timer(0)).then(() => {
        // this.carouselRef?.to(this.id(v))
        this.startPosition = newPage;
        this.cd.markForCheck();
      });
    }
    this._page = newPage;
    this._updatePages();
    this.cd.markForCheck();
  }

  public id(i: number) {
    return 'paging-item-' + i;
  }

  // public get pagesLength(): number {
  //   return this._pagesLength;
  // }
  //
  // @Input()
  // public set pagesLength(v: number) {
  //   this._pagesLength = v;
  // }

  /**
   *  The maximum number of pages to display.
   */

  public get totalRecords(): number {
    return this._totalRecords;
  }

  @Input()
  public set totalRecords(v: number) {
    this._totalRecords = v;
    this._updatePages();
  }

  currentRecordsFrom(): number {
    return 1 + (this.pageNum - 1) * this.pageSize;
  }

  currentRecordsTo(): number {
    return Math.min(this.pageNum * this.pageSize, this.totalRecords);
  }

  hasPrevious(): boolean {
    return this.pageNum > 1;
  }

  previousDisabled(): boolean {
    return !this.hasPrevious();
  }

  hasNext(): boolean {
    return this.pageNum < this.pageCount;
  }

  nextDisabled(): boolean {
    return !this.hasNext();
  }

  selectPage(pageNumber: number) {
    const newPageNumber = getValueInRange(pageNumber, this.pageCount, 1);

    if (newPageNumber !== this.pageNum) {
      this.pageChange.next({
        pageNum: pageNumber,
      });
    }
  }

  isEllipsis(pageNumber: number): boolean {
    return pageNumber === -1;
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   this._updatePages(this.page);
  // }

  // public handleChange({startPosition}: SlidesOutputData) {
  //   this.startPosition = startPosition
  //   firstValueFrom(timer(0)).then(() => this.cd.markForCheck())
  // }

  private _updatePages() {
    this.pageCount = Math.ceil(this.totalRecords / this.pageSize);

    if (!isNumber(this.pageCount)) {
      this.pageCount = 0;
    }

    this.pages = Array.from({ length: this.pageCount }, (_, i) => i + 1);

    if (this.maxSize > 0 && this.pageCount > this.maxSize) {
      const [start, end] = this._applyMaxPageSize();

      this.pages = this.pages.slice(start, end);

      this._applyEllipses(start, end);
    }

    this.cd.markForCheck();
  }

  /**
   * Paginates page numbers based on maxSize items per page.
   */
  private _applyMaxPageSize(): [number, number] {
    let start = 0;
    let end = this.pageCount;
    const leftOffset = Math.floor(this.maxSize / 2);
    const rightOffset = this.maxSize % 2 === 0 ? leftOffset - 1 : leftOffset;

    if (this.pageNum <= leftOffset) {
      // very beginning, no rotation -> [0..maxSize]
      end = this.maxSize;
    } else if (this.pageCount - this.pageNum < leftOffset) {
      // very end, no rotation -> [len-maxSize..len]
      start = this.pageCount - this.maxSize;
    } else {
      // rotate
      start = this.pageNum - leftOffset - 1;
      end = this.pageNum + rightOffset;
    }

    return [start, end];
  }

  /**
   * Appends ellipses and first/last page number to the displayed pages
   */
  private _applyEllipses(start: number, end: number) {
    if (start > 0) {
      if (start > 2) {
        this.pages.unshift(-1);
      } else if (start === 2) {
        this.pages.unshift(2);
      }
      this.pages.unshift(1);
    }
    if (end < this.pageCount) {
      if (end < this.pageCount - 2) {
        this.pages.push(-1);
      } else if (end === this.pageCount - 2) {
        this.pages.push(this.pageCount - 1);
      }
      this.pages.push(this.pageCount);
    }
  }
}
