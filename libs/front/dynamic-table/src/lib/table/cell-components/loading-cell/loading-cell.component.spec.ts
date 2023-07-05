import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingCellComponent } from './loading-cell.component';

describe('LoadingCellComponent', () => {
  let component: LoadingCellComponent;
  let fixture: ComponentFixture<LoadingCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingCellComponent],
    }).compileComponents();

    fixture =
      TestBed.createComponent<LoadingCellComponent<any>>(LoadingCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
