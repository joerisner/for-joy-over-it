import { describe, test, expect } from 'vitest';
import { toKebabCase, truncate, isEmpty, toTitleCase } from '../../../../src/scripts/utils/string';

describe('String Utils', () => {
  test('toKebabCase()', () => {
    expect(toKebabCase("THi/s iS A St'RinG")).toBe('this-is-a-string');
  });

  test('truncate()', () => {
    const originalStr = 'Lorem ipsum dolor sit amet.';
    expect(truncate(originalStr, 8)).toBe('Lorem ip...');
  });

  test('isEmpty()', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty('foo')).toBe(false);
  });

  test('toTitleCase()', () => {
    expect(toTitleCase('tHis iS a-StRinG')).toBe('This Is A String');
  });
});
