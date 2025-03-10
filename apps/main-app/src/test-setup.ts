import { TestBed } from '@angular/core/testing';
import { TranslateModuleConfigProvider } from '@softbar-ngx-translate';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

TestBed.configureTestingModule({
  providers: [
    TranslateModuleConfigProvider({
      moduleType: 'root',
      translationsChunks: null,
    }),
  ],
});
