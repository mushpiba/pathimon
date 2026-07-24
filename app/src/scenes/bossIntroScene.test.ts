import { describe, expect, it } from 'vitest';
import bossIntroSceneSource from './BossIntroScene.ts?raw';

describe('BossIntroScene input', () => {
  it('starts the battle with Enter as well as pointer input', () => {
    expect(bossIntroSceneSource).toContain("this.input.keyboard?.on('keydown'");
    expect(bossIntroSceneSource).toContain("command === 'confirm'");
  });
});
