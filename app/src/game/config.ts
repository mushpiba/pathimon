import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH } from './constants';

class TemporaryBootScene extends Phaser.Scene {
  constructor() {
    super('TemporaryBootScene');
  }

  create(): void {
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0x182131).setOrigin(0);
    this.add.text(APP_WIDTH / 2, APP_HEIGHT / 2, 'PATHIMON', {
      color: '#f4f0ff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '42px',
    }).setOrigin(0.5);
  }
}

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
    scene: [TemporaryBootScene],
  };
}
