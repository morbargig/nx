import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import he from './i18n/he';
import { firstValueFrom, of } from 'rxjs';
import { AppTranslateModule, GenericClass, KeyChain, transformObjectToPath } from '@softbar-ngx-translate';

@Injectable({
  providedIn: 'root',
})
export class AppMainAppTranslationService extends GenericClass<
  typeof he
>() {
  constructor() {
    super();
    Object.assign(this, transformObjectToPath('', he));
  }
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppTranslateModule.forRoot({
      'defaultLanguage': 'en',
      'supportedLanguages': ['en', 'he'],
      translationsChunks: {
        en: () => import('./i18n/en'),
        he: () => firstValueFrom(of({ default: he })),
      },
    }),
  ],
  providers: [AppMainAppTranslationService],
  exports: [TranslateModule],
})
export class AppMainAppTranslateModule {}

export type AppMainAppTranslationKeys = KeyChain<typeof he>;
