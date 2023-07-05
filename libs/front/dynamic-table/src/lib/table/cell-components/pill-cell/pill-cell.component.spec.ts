import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillCellComponent } from './pill-cell.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PillCellComponent', () => {
  let component: PillCellComponent;
  let fixture: ComponentFixture<PillCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PillCellComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PillCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
