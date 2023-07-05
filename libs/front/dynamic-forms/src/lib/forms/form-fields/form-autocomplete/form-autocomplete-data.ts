import { BaseFieldData } from '../../core/interfaces/field-config';
import { KeyValuePair } from '../../core/interfaces/key-value-pair';
import { Observable, BehaviorSubject } from 'rxjs';
import { LazyLoadEvent, PageDataResponse } from '@fnx-nx/api-interfaces';
export interface FormAutocompleteData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  // keyValuePairs: KeyValuePair<T[K]>[];
  thresholdPercent?: number;
  noVirtualScroll?: boolean;
  evt$: BehaviorSubject<LazyLoadEvent<T[K]>>;
  getOption: (
    evt?: LazyLoadEvent<T[K]>
  ) => Observable<PageDataResponse<KeyValuePair>>;
  queryFilters: (query: string) => LazyLoadEvent<T[K]>['filters'];
  debounceTimeSec?: number;
  // classTemplate?: Type<KeyValuePair<Enum>>;
  // htmlTemplate: (item: KeyValuePair<Enum>) => string;
}
