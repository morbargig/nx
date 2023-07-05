import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyShareCellComponent } from './lazy-share-cell.component';

describe('LazyShareCellComponent', () => {
  let component: LazyShareCellComponent;
  let fixture: ComponentFixture<LazyShareCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyShareCellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyShareCellComponent<any>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
