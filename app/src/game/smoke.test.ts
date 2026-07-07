import { describe, expect, it } from 'vitest';
import { APP_HEIGHT, APP_WIDTH } from './constants';
import { createGameConfig } from './config';

describe('game config', () => {
  it('uses the fixed Pathimon canvas size', () => {
    const config = createGameConfig('game');

    expect(config.width).toBe(APP_WIDTH);
    expect(config.height).toBe(APP_HEIGHT);
    expect(config.parent).toBe('game');
  });
});
