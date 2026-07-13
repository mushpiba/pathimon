import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH } from '../game/constants';
import { addLabel } from '../ui/draw';

export class PostDisclaimerStoryScene extends Phaser.Scene {
  private advancing = false;

  constructor() {
    super('PostDisclaimerStoryScene');
  }

  create(): void {
    this.advancing = false;
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0x000000, 1).setOrigin(0);

    this.time.delayedCall(1000, () => {
      const line = addLabel(this, APP_WIDTH / 2, APP_HEIGHT / 2, '... 일어나세요..!', 28)
        .setOrigin(0.5)
        .setAlign('center')
        .setAlpha(0);

      this.tweens.add({
        targets: line,
        alpha: 1,
        duration: 260,
        ease: 'Sine.easeOut',
      });
      this.input.once('pointerdown', this.advanceToGuide, this);
    });
  }

  private advanceToGuide(): void {
    if (this.advancing) {
      return;
    }

    this.advancing = true;
    this.children.each((child) => {
      if (child instanceof Phaser.GameObjects.Text) {
        child.setAlpha(0);
      }
    });
    this.time.delayedCall(1000, () => this.scene.start('GameGuideScene'));
  }
}
