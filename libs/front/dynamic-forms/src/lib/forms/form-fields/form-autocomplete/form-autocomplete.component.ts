import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { KeyValuePair } from '../../core/interfaces/key-value-pair';
import { FormAutocompleteData } from './form-autocomplete-data';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { LazyLoadEvent } from '../../core/interfaces/lazy-load-event';

@Component({
  selector: 'softbar-form-autocomplete',
  templateUrl: './form-autocomplete.component.html',
  styleUrls: ['./form-autocomplete.component.scss'],
})
export class FormAutocompleteComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponentDirective<
    T,
    FormAutocompleteData<T, K>,
    K,
    FormControl
  >
  implements OnInit
{
  filteredOptions$?: Observable<KeyValuePair<T[K]>[]>;

  override ngOnInit(): void {
    super.ngOnInit();
    // this.getInitList();
    this.data.getOption;
    // Note: listen for search text changes
    const filter$: Observable<string> = this.control?.valueChanges.pipe(
      startWith(''),
      debounceTime(this.data?.debounceTimeSec || 200),
      filter((q) => typeof q === 'string'),
      map((q) => q?.toString()),
      tap(() => this.nextPage(0))
    );

    this.filteredOptions$ = filter$.pipe(
      switchMap((filter) => {
        //Note: Reset the page with every new search text
        let pageNum: number;
        return this.data?.evt$.pipe(
          debounceTime(0),
          map((e) => {
            pageNum = e?.pageNum;
            return {
              ...e,
              filters: this.data?.queryFilters(filter),
            };
          }),
          // Note: Until the backend responds, ignore NextPage requests.
          switchMap((e) => this.getOptionsList(e)),
          /**
           *  Note: This is a custom operator because we also need the last emitted value.
           *  Note: Stop if there are no more pages, or no results at all for the current search text.
           */
          scan(
            (allProducts, newProducts) =>
              !pageNum ? newProducts : allProducts.concat(newProducts),
            []
          )
        );
      })
    );
  }

  displayWith(element: KeyValuePair) {
    return element?.label && element?.value
      ? `${element?.label || ''} - ${element.value}`
      : null;
  }

  getOptionsList(evt?: LazyLoadEvent<T[K]>): Observable<KeyValuePair<T[K]>[]> {
    // Here, you can call your api if you wants filter data from backend.
    return this.data.getOption(evt)?.pipe(map((x) => x?.data));
  }

  nextPage(page?: number) {
    //Note: This is called multiple times after the scroll has reached the threshold position (80% as default).
    this?.data?.evt$?.next({
      ...this.data?.evt$?.getValue(),
      pageNum:
        page !== undefined ? page : this.data?.evt$?.getValue()?.pageNum + 1,
    });
  }
}
