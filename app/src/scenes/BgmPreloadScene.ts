import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import { addLabel } from '../ui/draw';
import { battleBgmAudioPaths } from '../ui/battleUi';
import {
  createInitialPathimonScreensaverItems,
  createPathimonScreensaverPair,
  pathimonScreensaverSpritePool,
  type PathimonScreensaverItem,
} from '../ui/pathimonScreensaver';

export class BgmPreloadScene extends Phaser.Scene {
  private loadingBar?: Phaser.GameObjects.Rectangle;
  private loadingText?: Phaser.GameObjects.Text;
  private screensaverLayer?: HTMLDivElement;
  private screensaverTimers: number[] = [];

  constructor() {
    super('BgmPreloadScene');
  }

  init(): void {
    this.registry.set('battleBgmPreloadStarted', true);
  }

  preload(): void {
    this.startPathimonScreensaver();
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

  private startPathimonScreensaver(): void {
    const parent = this.game.canvas.parentElement;
    if (!parent || this.screensaverLayer) return;

    parent.style.position = parent.style.position || 'relative';
    const layer = document.createElement('div');
    layer.className = 'pathimon-bgm-screensaver';
    Object.assign(layer.style, {
      background: 'rgba(8, 12, 20, 0.16)',
      inset: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
      position: 'absolute',
      zIndex: '8',
    });
    parent.appendChild(layer);
    this.screensaverLayer = layer;

    const bounds = parent.getBoundingClientRect();
    const width = bounds.width || APP_WIDTH;
    const height = bounds.height || APP_HEIGHT;
    const sprites = pathimonScreensaverSpritePool();
    const items = createInitialPathimonScreensaverItems({ height, sprites, width });
    for (let index = 0; index < items.length; index += 2) {
      const pair = items.slice(index, index + 2);
      if (pair.length === 2) this.addScreensaverPair(layer, pair, width, height, sprites);
    }
  }

  private addScreensaverPair(
    layer: HTMLDivElement,
    pair: PathimonScreensaverItem[],
    width: number,
    height: number,
    sprites: string[],
  ): void {
    const images = pair.map((item) => this.createScreensaverImage(layer, item));
    this.animateScreensaverPair(images, pair, width, height, sprites);
  }

  private createScreensaverImage(layer: HTMLDivElement, item: PathimonScreensaverItem): HTMLImageElement {
    const image = document.createElement('img');
    image.alt = '';
    image.decoding = 'async';
    image.draggable = false;
    image.src = item.assetPath;
    Object.assign(image.style, {
      filter: 'drop-shadow(0 10px 8px rgba(0, 0, 0, 0.45))',
      imageRendering: 'pixelated',
      left: '0',
      opacity: '0.9',
      position: 'absolute',
      top: '0',
      width: '129px',
      willChange: 'transform',
    });
    layer.appendChild(image);
    return image;
  }

  private animateScreensaverPair(
    images: HTMLImageElement[],
    pair: PathimonScreensaverItem[],
    width: number,
    height: number,
    sprites: string[],
  ): void {
    const first = pair[0];
    if (!first || images.length !== pair.length) return;

    const allImagesStillMounted = () => images.every((image) => this.screensaverLayer?.contains(image));
    images.forEach((image, index) => {
      const item = pair[index]!;
      image.src = item.assetPath;
      image.style.transition = 'none';
      image.style.transform = this.screensaverTransform(item.startX, item.startY, item.scale, 0);
    });

    const launchDuration = Math.round(first.durationMs * 0.5);
    const bounceDuration = first.durationMs - launchDuration;
    let phase: 'launch' | 'bounce' = 'launch';
    let completedTransitions = 0;

    const launchTimer = window.setTimeout(() => {
      if (!allImagesStillMounted()) return;
      images.forEach((image, index) => {
        const item = pair[index]!;
        image.style.transition = `transform ${launchDuration}ms cubic-bezier(0.18, 0.78, 0.28, 1)`;
        image.style.transform = this.screensaverTransform(item.impactX, item.impactY, item.scale * 1.1, 0);
      });
    }, first.delayMs);
    this.screensaverTimers.push(launchTimer);

    const handleTransitionEnd = (event: TransitionEvent) => {
      if (event.propertyName !== 'transform' || !allImagesStillMounted()) return;
      completedTransitions += 1;
      if (completedTransitions < images.length) return;
      completedTransitions = 0;

      if (phase === 'launch') {
        phase = 'bounce';
        images.forEach((image, index) => {
          const item = pair[index]!;
          image.style.transition = `transform ${bounceDuration}ms cubic-bezier(0.64, 0.02, 0.86, 0.36)`;
          image.style.transform = this.screensaverTransform(item.endX, item.endY, item.scale, item.wobblePx);
        });
        return;
      }

      const nextTimer = window.setTimeout(() => {
        if (!allImagesStillMounted()) return;
        const nextPair = createPathimonScreensaverPair({ height, sprites, width }).map((item) => ({
          ...item,
          delayMs: 0,
        }));
        this.animateScreensaverPair(images, nextPair, width, height, sprites);
      }, first.respawnDelayMs);
      this.screensaverTimers.push(nextTimer);
    };

    images.forEach((image) => {
      image.ontransitionend = handleTransitionEnd;
    });
  }

  private screensaverTransform(x: number, y: number, scale: number, wobblePx: number): string {
    return `translate(${x}px, ${y + wobblePx}px) translate(-50%, -50%) scale(${scale})`;
  }

  stopPathimonScreensaver(): void {
    this.removePathimonScreensaver();
  }

  private removePathimonScreensaver(): void {
    this.screensaverTimers.forEach((timer) => window.clearTimeout(timer));
    this.screensaverTimers = [];
    this.screensaverLayer?.remove();
    this.screensaverLayer = undefined;
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
