import Phaser from 'phaser';
import { APP_WIDTH, APP_HEIGHT, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';

export class StoryScene extends Phaser.Scene {
  constructor() {
    super('StoryScene');
  }

  create(): void {
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    drawPanel(this, 120, 116, 784, 260);
    addLabel(this, 156, 160, '병원체가 층마다 증식하고 있습니다.', 24);
    addLabel(this, 156, 214, '패시몬의 기술을 읽고 약점을 찔러 포획 기회를 만드세요.', 24);
    addLabel(this, 156, 268, '정비 구역을 지나 마지막 층의 면역 사령부까지 올라갑니다.', 24);
    addLabel(this, 156, 344, '화면을 누르면 첫 전투가 시작됩니다.', 20).setAlpha(0.9);

    this.input.once('pointerdown', () => {
      this.scene.start('BattleScene');
    });
  }
}