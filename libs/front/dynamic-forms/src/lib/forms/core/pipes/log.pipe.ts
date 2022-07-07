import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log',
})
export class LogPipe implements PipeTransform {
  transform(data: any, debug?: boolean): any {
    if (debug) {
      debugger;
    }
    console.log(data);
  }
}
