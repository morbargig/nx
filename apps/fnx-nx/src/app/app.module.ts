import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NxWelcomeComponent} from './nx-welcome.component';
import {HttpClientModule} from '@angular/common/http';
import {DynamicFormsModule} from "../../../../libs/front/dynamic-forms/src/lib/forms/forms.module";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    DynamicFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
