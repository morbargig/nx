import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AppMainAppTranslateModule,
  AppMainAppTranslationService,
} from './translate/main-app-translate.module';

@Component({
  selector: 'softbar-root',
  standalone: true,
  template: `
    <div class="p-4">
      <h1>{{ translation.APPS_MAIN_APP_APP.h1 | translate }}</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, AppMainAppTranslateModule],
})
export class AppComponent {
  constructor(
    private appMainAppTranslationService: AppMainAppTranslationService
  ) // private appTranslateService: AppTranslateService<
  //   [AppMainAppTranslationService]
  // >,
  {}
  get translation() {
    return this.appMainAppTranslationService;
  }
}
