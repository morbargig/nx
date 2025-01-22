import { NgModule } from '@angular/core';
import { LogPipe } from './log.pipe';
import { SafePipe } from './safe.pipe';

const DIRECTIVES: NgModule['declarations'] = [LogPipe, SafePipe];
@NgModule({
  imports: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class FrontDynamicFormsPipeModule {}
