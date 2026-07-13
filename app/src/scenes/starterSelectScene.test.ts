import { describe, expect, it } from 'vitest';
import starterSelectSceneSource from './StarterSelectScene.ts?raw';

describe('StarterSelectScene audio', () => {
  it('stops the intro BGM after mode selection ends', () => {
    expect(starterSelectSceneSource).toContain('stopIntroBgm(this)');
  });
});
