import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {HttpClientModule} from '@angular/common/http';
import { FrontDynamicFormsModule } from '@fnx-nx/front/dynamic-forms';


@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FrontDynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
