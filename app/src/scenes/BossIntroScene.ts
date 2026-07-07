import Phaser from 'phaser';
import type { RunState } from '../types/game';
import { APP_WIDTH, APP_HEIGHT, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';

interface BossIntroSceneData {
  state?: RunState;
}

export class BossIntroScene extends Phaser.Scene {
  private state!: RunState;

  constructor() {
    super('BossIntroScene');
  }

  init(data: BossIntroSceneData = {}): void {
    if (!data.state) {
      throw new Error('BossIntroScene requires state');
    }
    this.state = data.state;
  }

  create(): void {
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    drawPanel(this, 132, 132, 760, 260);
    addLabel(this, 168, 176, '보스 출현', 32);
    addLabel(this, 168, 236, `${this.state.enemy?.name ?? '보스'}이 길을 막아섰다.`, 26);
    addLabel(this, 168, 286, `${this.state.enemy?.scientificName ?? ''}`, 22).setAlpha(0.9);
    addLabel(this, 168, 352, '화면을 누르면 결전이 시작됩니다.', 20).setAlpha(0.9);

    this.input.once('pointerdown', () => {
      this.scene.start('BattleScene', {
        state: {
          ...this.state,
          phase: 'battle',
        },
      });
    });
  }
}