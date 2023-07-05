import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import he from './i18n/he';
import {
  GenericClass,
  KeyChain,
  transformObjectToPath,
} from '@fnx-nx/front/base-client/lib/modules/translate/translations.helper';
import { AppTranslateModule } from '@fnx-nx/front/base-client/lib/modules/translate/app-translate.module';
import { firstValueFrom, of } from 'rxjs';

export class LazyShareCellComponentTranslationService extends GenericClass<
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
    AppTranslateModule.forChild({
      isLazy: true,
      translationsChunks: {
        en: () => import('./i18n/en'),
        he: () => firstValueFrom(of({ default: he })),
      },
    }),
  ],
  providers: [LazyShareCellComponentTranslationService],
  exports: [TranslateModule],
})
export class LazyShareCellComponentTranslateModule {}

export type LazyShareCellComponentTranslationKeys = KeyChain<typeof he>;
