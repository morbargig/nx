import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'formArrayControlFilter',
})
export class FormArrayControlsFilterPipe implements PipeTransform {
  /** filter all form array controls that contain value of some query string. */
  transform(controls: FormGroup[], query?: string): FormGroup[] {
    if (!query) {
      return controls;
    }
    const findId = (val: any, query: string): boolean =>
      Object.keys(val || {}).some(
        (v) =>
          (typeof val?.[v] === 'string' &&
            val?.[v]
              ?.toLocaleLowerCase()
              .includes(query?.toLocaleLowerCase())) ||
          (typeof val?.[v] === 'object' &&
            val?.[v] !== null &&
            findId(val?.[v], query))
      );
    return controls?.filter((i) => !!findId(i.getRawValue(), query));
  }
}
