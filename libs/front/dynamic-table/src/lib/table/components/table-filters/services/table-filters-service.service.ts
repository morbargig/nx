import { Injectable } from '@angular/core';
import {
  LazyLoadEvent,
  FilterInsideObject,
  MatchMode,
  FilterObject,
  FilterDataResponse,
} from '../lazy-load-event.type';
import { JsonPrimitive } from '@softbar/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class TableFiltersServiceService {
  private static filterByMatchMode<T>(i: T, f: FilterObject<T>, k: keyof T) {
    {
      const filterObj: FilterInsideObject<T[keyof T]> = f[k];
      // const matchMode = MatchMode[filterObj.matchMode];
      if (!filterObj?.matchMode) return true;
      switch (filterObj.matchMode) {
        case MatchMode.Equals: {
          return i?.[k] == filterObj.value;
          break;
        }
        case MatchMode.NotEquals: {
          return !(i?.[k] == filterObj.value);
          break;
        }
        case MatchMode.LessThan: {
          if (typeof filterObj.value == 'number') {
            return Number(i?.[k]) < filterObj.value;
            break;
          }
          break;
        }
        case MatchMode.LessThanOrEquals: {
          if (typeof filterObj.value == 'number') {
            return Number(i?.[k]) <= filterObj.value;
            break;
          }
          break;
        }
        case MatchMode.GreaterThan: {
          if (typeof filterObj.value == 'number') {
            return Number(i?.[k]) > filterObj.value;
            break;
          }
          break;
        }
        case MatchMode.GreaterThanOrEquals: {
          if (typeof filterObj.value == 'number') {
            return Number(i?.[k]) >= filterObj.value;
            break;
          }
          break;
        }
        case MatchMode.Before:
        case MatchMode.BeforeOrEquals:
        case MatchMode.After:
        case MatchMode.EqualsOrAfter: {
          const typeofFilterValue = typeof filterObj.value;
          if (['number', 'string', 'object']?.includes(typeofFilterValue)) {
            const itemDate = new Date(
              i?.[k] as any as number | string | Date
            ).getTime();
            const filterDate = new Date(
              filterObj.value as any as string | number | Date
            ).getTime();
            switch (filterObj.matchMode) {
              case MatchMode.Before: {
                return itemDate < filterDate;
                break;
              }
              case MatchMode.BeforeOrEquals: {
                return itemDate <= filterDate;
                break;
              }
              case MatchMode.After: {
                return itemDate > filterDate;
                break;
              }
              case MatchMode.EqualsOrAfter: {
                return itemDate >= filterDate;
                break;
              }
              default: {
                return false;
                break;
              }
            }
          }
          break;
        }
        case MatchMode.Contains:
        case MatchMode.StartsWith:
        case MatchMode.EndsWith: {
          const typeofFilterValue = typeof filterObj.value;
          if (typeofFilterValue == 'number' || typeofFilterValue == 'string') {
            const itemText: string = i?.[k]?.toString();
            const filterText: string = filterObj.value?.toString();
            switch (filterObj.matchMode) {
              case MatchMode.Contains: {
                return itemText?.includes(filterText);
                break;
              }
              case MatchMode.StartsWith: {
                return itemText?.startsWith(filterText);
                break;
              }
              case MatchMode.EndsWith: {
                return itemText?.endsWith(filterText);
                break;
              }
              default: {
                return false;
                break;
              }
            }
          }
          break;
        }
        case MatchMode.Contained: {
          const filterValue = filterObj.value as any as
            | (string | number)
            | (string | number | boolean | null | undefined)[];
          // const typeofFilterValue = typeof filterValue;
          const itemValue: JsonPrimitive = i?.[k] as any;
          switch (typeof filterValue) {
            case 'string':
            case 'number': {
              return (
                ['number', 'string']?.includes(typeof itemValue) &&
                filterValue?.toString()?.includes(itemValue?.toString())
              );
              break;
            }
            case 'object': {
              if (Array.isArray(filterValue)) {
                const itemValueAsJson = JSON.stringify(itemValue);
                return filterValue?.some(
                  (i) => JSON.stringify(i) === itemValueAsJson
                );
              }
              // else if (filterValue !== null){
              //   Object.keys(filterValue).some()
              // }
              return false;
            }
            default: {
              return false;
              break;
            }
          }
          break;
        }
        case MatchMode.Any: {
          return i?.[k];
          break;
        }
        case MatchMode.NotAny: {
          return !i?.[k];
          break;
        }
        default: {
          return true;
          break;
        }
      }
      return true;
    }
  }

  public filter = <T>(
    items: T[],
    evt: LazyLoadEvent<T>
  ): FilterDataResponse<T> => {
    const filteredItems = items?.filter(
      (i) =>
        !evt?.filters?.some((f) =>
          (Object.keys(f) as (keyof typeof f)[])?.some(
            (k) => !TableFiltersServiceService.filterByMatchMode<T>(i, f, k)
          )
        )
    );
    return {
      data: filteredItems?.slice(
        evt.pageNum * evt.pageSize,
        (evt.pageNum + 1) * evt.pageSize
      ),
      totalRecords: filteredItems?.length ?? 0,
    };
  };
}
