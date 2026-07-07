import Phaser from 'phaser';
import { BattleScene } from '../scenes/BattleScene';
import { BossIntroScene } from '../scenes/BossIntroScene';
import { ShopScene } from '../scenes/ShopScene';
import { StoryScene } from '../scenes/StoryScene';
import { TitleScene } from '../scenes/TitleScene';
import { APP_HEIGHT, APP_WIDTH } from './constants';

export function createGameConfig(parent: string): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    parent,
    width: APP_WIDTH,
    height: APP_HEIGHT,
    backgroundColor: '#182131',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [TitleScene, StoryScene, BattleScene, ShopScene, BossIntroScene],
  };
}