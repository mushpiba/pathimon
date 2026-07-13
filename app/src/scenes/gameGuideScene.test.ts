import { describe, expect, it } from 'vitest';
import gameGuideSceneSource from './GameGuideScene.ts?raw';

describe('GameGuideScene audio', () => {
  it('keeps the intro BGM playing through the battle guide', () => {
    expect(gameGuideSceneSource).toContain('queueIntroBgm(this)');
    expect(gameGuideSceneSource).toContain('playIntroBgm(this)');
  });
});
