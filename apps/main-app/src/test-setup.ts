import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateModuleConfigProvider } from '@softbar-ngx-translate';
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
setupZoneTestEnv(); // Ensures zone.js testing environment is correctly set up

// Global TestBed configuration
TestBed.configureTestingModule({
  imports: [TranslateModule.forRoot()], // Common testing modules
  providers: [
    TranslateModuleConfigProvider({
      moduleType: 'root',
      translationsChunks: null,
    }),
  ],
});
