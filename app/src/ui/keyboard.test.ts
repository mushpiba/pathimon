import { describe, expect, it } from 'vitest';
import { keyboardCommand } from './keyboard';

describe('keyboard commands', () => {
  it('normalizes arrows, WASD, Enter, and cancel keys', () => {
    expect(keyboardCommand('ArrowUp')).toBe('up');
    expect(keyboardCommand('s')).toBe('down');
    expect(keyboardCommand('A')).toBe('left');
    expect(keyboardCommand('ArrowRight')).toBe('right');
    expect(keyboardCommand('Enter')).toBe('confirm');
    expect(keyboardCommand('Escape')).toBe('cancel');
    expect(keyboardCommand('Backspace')).toBe('cancel');
    expect(keyboardCommand('Shift')).toBeUndefined();
  });
});
