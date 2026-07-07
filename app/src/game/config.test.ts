import { describe, expect, it } from 'vitest';
import { createGameConfig } from './config';

describe('scene registration', () => {
  it('registers the real gameplay scene flow', () => {
    const config = createGameConfig('game');
    const scenes = config.scene as Array<{ name?: string }>;

    expect(scenes.map((scene) => scene.name)).toEqual([
      'TitleScene',
      'StoryScene',
      'BattleScene',
      'ShopScene',
      'BossIntroScene',
    ]);
  });
});
