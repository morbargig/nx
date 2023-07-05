import { OptionsScrollDirective } from './options-scroll.directive';
import { TestBed } from '@angular/core/testing';
import { MatLegacyAutocomplete } from '@angular/material/legacy-autocomplete';

describe('OptionsScrollDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatLegacyAutocomplete],
    }).compileComponents();
  });

  it('should create an instance', () => {
    const fixture = TestBed.createComponent(MatLegacyAutocomplete);
    const component = fixture.componentInstance;
    const directive = new OptionsScrollDirective(component);
    expect(directive).toBeTruthy();
  });
});
