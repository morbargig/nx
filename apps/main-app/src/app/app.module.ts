import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FrontDynamicFormsModule } from '@fnx-nx/front/dynamic-forms';
import { HttpClientModule } from '@angular/common/http';
import { ROUTES } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    BrowserAnimationsModule,
    FrontDynamicFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
