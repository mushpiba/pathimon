import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';
import { disclaimerContent } from '../ui/disclaimerUi';

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

    this.time.delayedCall(content.durationMs, () => this.scene.start('StoryScene'));
  }
}
