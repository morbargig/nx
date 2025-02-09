import { TestBed } from '@angular/core/testing';
import { AppTranslateService } from './app-translate.service';
import { TranslateModule } from '@ngx-translate/core';

describe('AppTranslateService', () => {
  let service: AppTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });
    service = TestBed.inject(AppTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
