import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe',standalone:true })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(
    val: string,
    type: SecurityContext /** ...[type]: SecurityContext[] */
  ) {
    // args?.forEach((i) => {
    //   val = (() => {
    switch (type) {
      case SecurityContext.NONE:
        return val;
      case SecurityContext.HTML:
        return this.sanitizer.bypassSecurityTrustHtml(val);
      case SecurityContext.STYLE:
        return this.sanitizer.bypassSecurityTrustStyle(val);
      case SecurityContext.SCRIPT:
        return this.sanitizer.bypassSecurityTrustScript(val);
      case SecurityContext.URL:
        return this.sanitizer.bypassSecurityTrustUrl(val);
      case SecurityContext.RESOURCE_URL:
        return this.sanitizer.bypassSecurityTrustResourceUrl(val);
    }
    //   })();
    // });
  }
}
