import {Pipe, PipeTransform} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Pipe({
  name: 'controlErrorsMap',
})
export class ControlErrorsMapPipe implements PipeTransform {
  transform(errors: AbstractControl['errors']): any {
    return Object.entries((errors));
  }
}
