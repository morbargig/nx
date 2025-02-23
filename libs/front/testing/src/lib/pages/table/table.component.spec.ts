import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingTableComponent } from './table.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

describe('TestingTableComponent', () => {
  let component: TestingTableComponent;
  let fixture: ComponentFixture<TestingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingTableComponent, TranslateModule.forRoot()],

      providers: [provideAnimations(), ActivatedRoute],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
