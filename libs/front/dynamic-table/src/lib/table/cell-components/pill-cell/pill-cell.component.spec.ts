import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PillCellComponent } from './pill-cell.component';
import { ActivatedRoute } from '@angular/router';

describe('PillCellComponent', () => {
  let component: PillCellComponent;
  let fixture: ComponentFixture<PillCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillCellComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PillCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
