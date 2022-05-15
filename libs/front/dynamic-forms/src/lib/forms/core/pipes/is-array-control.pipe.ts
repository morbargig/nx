import {Pipe, PipeTransform} from '@angular/core';
import {FieldConfigObj} from '../interfaces/field-config';

@Pipe({
  name: 'isArrayControl',
})
export class IsArrayControlPipe implements PipeTransform {
  transform(dynamicControls: FieldConfigObj[]): FieldConfigObj {
    return dynamicControls.find((ctrl) => ctrl.controlType == 'array');
  }
}
