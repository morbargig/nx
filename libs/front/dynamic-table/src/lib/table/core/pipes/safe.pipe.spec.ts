import { TestBed } from '@angular/core/testing';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  let pipe: SafePipe;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SafePipe] });
    pipe = TestBed.inject(SafePipe);
  });

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });
});
