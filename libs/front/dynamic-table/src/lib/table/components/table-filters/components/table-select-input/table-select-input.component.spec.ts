import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableSelectInputComponent } from './table-select-input.component';

describe('TableSelectInputComponent', () => {
  let component: TableSelectInputComponent;
  let fixture: ComponentFixture<TableSelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableSelectInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableSelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
