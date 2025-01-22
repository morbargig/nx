import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillCellComponent } from './pill-cell.component';

describe('PillCellComponent', () => {
  let component: PillCellComponent;
  let fixture: ComponentFixture<PillCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PillCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
