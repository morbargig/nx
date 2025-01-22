import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlighter',
  standalone: true,
})
export class HighlighterPipe implements PipeTransform {
  transform(value: string | number, args: string, full?: boolean): unknown {
    if (!args) return value;
    const boldClass = ((ngClass = 'font-bold text-black text-x1.01') =>
      ngClass)();
    return (
      (function () {
        const re = new RegExp(full ? '\\b(' + args + '\\b)' : args, 'igm');
        return value
          ?.toString()
          ?.replace?.(
            re,
            `<span class="${boldClass}">${full ? '$1' : '$&'}</span>`
          );
      })() || value
    );
  }
}
