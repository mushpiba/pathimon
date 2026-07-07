import Phaser from 'phaser';
import { APP_WIDTH, APP_HEIGHT, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';

export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create(): void {
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    addLabel(this, 90, 88, 'PATHIMON', 42);
    addLabel(this, 92, 142, '병원체를 포획하고 다음 층으로 오르는 전투 모험', 20).setAlpha(0.9);

    drawPanel(this, 88, 230, 360, 180);
    addLabel(this, 114, 266, '시작 지점', 24);
    addLabel(this, 114, 310, '첫 전투로 바로 들어갑니다.', 18).setAlpha(0.9);
    addLabel(this, 114, 344, '패시몬의 기술 정보를 읽고 신중하게 선택하세요.', 18).setAlpha(0.9);

    const startButton = this.add.rectangle(184, 452, 190, 54, COLORS.line).setOrigin(0);
    addLabel(this, 279, 479, '게임 시작', 24).setOrigin(0.5);
    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerover', () => startButton.setFillStyle(0x72d6ff));
    startButton.on('pointerout', () => startButton.setFillStyle(COLORS.line));
    startButton.on('pointerdown', () => this.scene.start('StoryScene'));
  }
}