import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAutocompleteComponent } from './form-autocomplete.component';

describe('FormAutocompleteComponent', () => {
  let component: FormAutocompleteComponent<any>;
  let fixture: ComponentFixture<FormAutocompleteComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<FormAutocompleteComponent<any>>(
      FormAutocompleteComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
