import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log',
  standalone:true
})
export class LogPipe implements PipeTransform {
  transform(data: any, debug?: boolean): any {
    if (debug) {
      // eslint-disable-next-line no-debugger
      debugger;
    }
    console.log(data);
  }
}
