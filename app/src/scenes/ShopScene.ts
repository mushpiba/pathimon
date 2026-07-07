import Phaser from 'phaser';
import { advanceFromShop } from '../state/runState';
import type { RunState } from '../types/game';
import { APP_WIDTH, APP_HEIGHT, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';

interface ShopSceneData {
  state?: RunState;
}

export class ShopScene extends Phaser.Scene {
  private state!: RunState;
  private note = '';

  constructor() {
    super('ShopScene');
  }

  init(data: ShopSceneData = {}): void {
    if (!data.state) {
      throw new Error('ShopScene requires state');
    }
    this.state = data.state;
    this.note = data.state.lastLog;
  }

  create(): void {
    this.render();
  }

  private render(): void {
    this.children.removeAll();
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);

    drawPanel(this, 72, 72, 880, 432);
    addLabel(this, 104, 104, '정비 구역', 32);
    addLabel(this, 104, 152, `보유 자금: ${this.state.money}`, 24);
    addLabel(this, 104, 188, `캡슐: ${this.state.capsules}`, 22);
    addLabel(this, 104, 226, this.note || '다음 층을 준비하세요.', 18).setAlpha(0.9);

    this.createButton(104, 294, 210, 58, '패시몬 각성', () => {
      this.note = '각성은 아직 준비 중입니다.';
      this.render();
    });
    this.createButton(336, 294, 210, 58, '패시몬 진화', () => {
      this.note = '진화는 아직 준비 중입니다.';
      this.render();
    });
    this.createButton(568, 294, 210, 58, '캡슐 구입', () => {
      if (this.state.money <= 0) {
        this.note = '자금이 부족합니다.';
      } else {
        this.state = {
          ...this.state,
          money: Math.max(0, this.state.money - 1),
          capsules: this.state.capsules + 1,
        };
        this.note = '캡슐을 보충했습니다.';
      }
      this.render();
    });
    this.createButton(336, 382, 210, 64, '다음 층', () => {
      const nextState = advanceFromShop(this.state);
      if (nextState.phase === 'bossIntro') {
        this.scene.start('BossIntroScene', { state: nextState });
        return;
      }
      this.scene.start('BattleScene', { state: nextState });
    });
  }

  private createButton(x: number, y: number, width: number, height: number, label: string, onClick: () => void): void {
    const rect = this.add.rectangle(x, y, width, height, COLORS.panelDark).setOrigin(0);
    rect.setStrokeStyle(2, COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(COLORS.line));
    rect.on('pointerout', () => rect.setFillStyle(COLORS.panelDark));
    rect.on('pointerdown', onClick);
    addLabel(this, x + width / 2, y + height / 2, label, 22).setOrigin(0.5);
  }
}