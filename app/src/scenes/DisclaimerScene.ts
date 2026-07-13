import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';
import { disclaimerContent, type DisclaimerBlinkEffect } from '../ui/disclaimerUi';

export class DisclaimerScene extends Phaser.Scene {
  constructor() {
    super('DisclaimerScene');
  }

  create(): void {
    const content = disclaimerContent();

    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0x0e1118).setOrigin(0);
    drawPanel(this, 104, 118, 816, 324).setAlpha(0.96);
    addLabel(this, APP_WIDTH / 2, 160, content.title, 34)
      .setOrigin(0.5)
      .setAlign('center');

    content.lines.forEach((line, index) => {
      addLabel(this, 148, 218 + index * 48, line, 18)
        .setWordWrapWidth(728)
        .setLineSpacing(6)
        .setAlpha(0.92);
    });

    addLabel(this, APP_WIDTH / 2, 474, '잠시 후 스토리로 이동합니다.', 16)
      .setOrigin(0.5)
      .setAlign('center')
      .setAlpha(0.7);

    this.playBlinkOut(content.blinkEffect, () => this.scene.start('StoryScene'));
  }

  private playBlinkOut(effect: DisclaimerBlinkEffect, onComplete: () => void): void {
    const curtainHeight = APP_HEIGHT / 2 + 6;
    const top = this.add.rectangle(0, 0, APP_WIDTH, curtainHeight, 0x000000, 1)
      .setOrigin(0, 0)
      .setDepth(1000)
      .setScale(1, 0.001);
    const bottom = this.add.rectangle(0, APP_HEIGHT, APP_WIDTH, curtainHeight, 0x000000, 1)
      .setOrigin(0, 1)
      .setDepth(1000)
      .setScale(1, 0.001);

    const tweenCurtains = (closed: boolean, duration: number, delay: number, after?: () => void): void => {
      this.time.delayedCall(delay, () => {
        this.tweens.add({
          targets: [top, bottom],
          scaleY: closed ? 1 : 0.001,
          duration,
          ease: closed ? 'Cubic.easeIn' : 'Cubic.easeOut',
          onComplete: after,
        });
      });
    };

    let delay = effect.initialHoldMs;
    effect.cycles.forEach((cycle) => {
      tweenCurtains(true, cycle.closeMs, delay);
      delay += cycle.closeMs + cycle.closedMs;
      tweenCurtains(false, cycle.openMs, delay);
      delay += cycle.openMs + cycle.openHoldMs;
    });

    tweenCurtains(true, effect.finalCloseMs, delay, () => {
      this.time.delayedCall(effect.finalHoldMs, onComplete);
    });
  }
}
