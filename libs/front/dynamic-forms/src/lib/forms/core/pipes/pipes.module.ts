import { NgModule } from '@angular/core';
import { LogPipe } from './log.pipe';

const DIRECTIVES: NgModule['declarations'] = [LogPipe];
@NgModule({
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class FrontDynamicFormsPipeModule {}
