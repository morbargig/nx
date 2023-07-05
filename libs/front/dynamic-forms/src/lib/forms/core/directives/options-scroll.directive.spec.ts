import { OptionsScrollDirective } from './options-scroll.directive';
import { TestBed } from '@angular/core/testing';
import { MatAutocomplete } from '@angular/material/autocomplete';

describe('OptionsScrollDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatAutocomplete],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(MatAutocomplete);
    const component = fixture.componentInstance;
    const directive = new OptionsScrollDirective(component);
    expect(directive).toBeTruthy();
  });
});
