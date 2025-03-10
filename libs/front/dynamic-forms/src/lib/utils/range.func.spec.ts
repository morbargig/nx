import { range } from './range.func';

describe('range function', () => {
  test('generates numbers from 0 to 9 with step 1', () => {
    expect(range(0, 10, 1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('generates numbers from 0 to 10 with step 2', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  test('handles negative step correctly', () => {
    expect(range(5, -5, -2)).toEqual([5, 3, 1, -1, -3]);
  });

  test('returns empty array when start equals end', () => {
    expect(range(5, 5)).toEqual([]);
  });

  test('throws error when step is zero', () => {
    expect(() => range(0, 10, 0)).toThrow('Step cannot be 0');
  });

  test('throws error when arguments are not finite numbers', () => {
    expect(() => range(NaN, 10)).toThrow('Arguments must be finite numbers');
    expect(() => range(0, Infinity)).toThrow(
      'Arguments must be finite numbers'
    );
  });
});
