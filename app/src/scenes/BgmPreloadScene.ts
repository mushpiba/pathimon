import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import { addLabel } from '../ui/draw';
import { battleBgmAudioPaths } from '../ui/battleUi';

export class BgmPreloadScene extends Phaser.Scene {
  private loadingBar?: Phaser.GameObjects.Rectangle;
  private loadingText?: Phaser.GameObjects.Text;

  constructor() {
    super('BgmPreloadScene');
  }

  init(): void {
    this.registry.set('battleBgmPreloadStarted', true);
  }

  preload(): void {
    this.drawLoadingOverlay();
    this.load.on('progress', this.updateLoadingProgress, this);

    battleBgmAudioPaths().forEach((path) => {
      if (!this.cache.audio.exists(path)) {
        this.load.audio(path, path);
      }
    });
  }

  create(): void {
    this.load.off('progress', this.updateLoadingProgress, this);
    this.registry.set('battleBgmPreloadComplete', true);
    this.scene.stop();
  }

  private drawLoadingOverlay(): void {
    const width = 204;
    const height = 54;
    const x = APP_WIDTH - width - 24;
    const y = APP_HEIGHT - height - 22;
    const depth = 9000;

    this.add.rectangle(x, y, width, height, COLORS.panelDark, 0.92)
      .setOrigin(0)
      .setStrokeStyle(2, 0x72d6ff, 0.82)
      .setDepth(depth);
    this.loadingText = addLabel(this, x + 16, y + 10, 'BGM 로딩중 0%', 14)
      .setDepth(depth + 1);
    this.add.rectangle(x + 16, y + 37, width - 32, 6, COLORS.hpBack, 0.86)
      .setOrigin(0)
      .setDepth(depth + 1);
    this.loadingBar = this.add.rectangle(x + 16, y + 37, 1, 6, COLORS.hp, 0.95)
      .setOrigin(0)
      .setDepth(depth + 2);
  }

  private updateLoadingProgress(value: number): void {
    const pct = Math.max(0, Math.min(1, value));
    this.loadingText?.setText(`BGM 로딩중 ${Math.round(pct * 100)}%`);
    this.loadingBar?.setDisplaySize(172 * pct, 6);
  }
}
