import Phaser from 'phaser';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import { addLabel, drawPanel } from '../ui/draw';
import { destroySceneChildren } from '../ui/sceneCleanup';
import { keyboardCommand } from '../ui/keyboard';
import { storyPages } from '../ui/storyUi';

type BgmPreloadSceneHandle = Phaser.Scene & { stopPathimonScreensaver?: () => void };

export class StoryScene extends Phaser.Scene {
  private pageIndex = 0;
  private keyboardTarget: 'advance' | 'skip' = 'advance';

  constructor() {
    super('StoryScene');
  }

  preload(): void {
    storyPages().forEach((page) => {
      if (page.imagePath && !this.textures.exists(page.imagePath)) {
        this.load.image(page.imagePath, page.imagePath);
      }
    });
  }

  create(): void {
    this.pageIndex = 0;
    this.registry.set('introStoryComplete', false);
    if (!this.registry.get('battleBgmPreloadStarted')) {
      this.scene.launch('BgmPreloadScene');
    }
    this.keyboardTarget = 'advance';
    this.input.keyboard?.on('keydown', this.handleKeyboardDown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard?.off('keydown', this.handleKeyboardDown);
    });
    this.render();
  }

  private render(): void {
    destroySceneChildren(this);
    this.input.off('pointerdown', this.handleScenePointerDown, this);
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    this.add.rectangle(0, 0, APP_WIDTH, 86, 0x141724, 0.85).setOrigin(0);
    this.add.rectangle(0, APP_HEIGHT - 128, APP_WIDTH, 128, 0x141724, 0.9).setOrigin(0);

    const pages = storyPages();
    const page = pages[this.pageIndex];

    if (page.imagePath) {
      if (page.imageFrame === 'wide') {
        this.add.image(APP_WIDTH / 2, 232, page.imagePath).setOrigin(0.5).setDisplaySize(620, 248);
      } else {
        const y = this.pageIndex === 1 ? 236 : 226;
        const size = this.pageIndex === 1 ? 210 : 184;
        this.add.image(APP_WIDTH / 2, y, page.imagePath).setOrigin(0.5).setDisplaySize(size, size);
      }
    } else {
      this.add.rectangle(APP_WIDTH / 2, 232, 520, 180, 0x352c48, 0.66).setOrigin(0.5);
      this.add.circle(APP_WIDTH / 2 - 132, 230, 48, 0x73d8d5, 0.45);
      this.add.circle(APP_WIDTH / 2, 230, 42, 0xf0d05c, 0.38);
      this.add.circle(APP_WIDTH / 2 + 132, 230, 48, 0xcf5b7a, 0.42);
    }

    drawPanel(this, 88, 398, 848, 116).setAlpha(0.96);
    page.lines.forEach((line, index) => {
      addLabel(this, 124, 424 + index * 38, line, 20)
        .setWordWrapWidth(776)
        .setLineSpacing(7);
    });

    this.createSkipButton();
    addLabel(this, 454, 536, `${this.pageIndex + 1} / ${pages.length}`, 15).setAlpha(0.7);

    this.input.once('pointerdown', this.handleScenePointerDown, this);
  }

  private createSkipButton(): void {
    const rect = this.add.rectangle(876, 24, 108, 38, COLORS.panelDark).setOrigin(0);
    rect.setStrokeStyle(this.keyboardTarget === 'skip' ? 4 : 2, this.keyboardTarget === 'skip' ? 0x72d6ff : COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(0x4a405d));
    rect.on('pointerout', () => rect.setFillStyle(COLORS.panelDark));
    rect.on('pointerdown', () => this.finishStory());
    addLabel(this, 930, 43, '스킵', 17).setOrigin(0.5);
  }

  private handleScenePointerDown(pointer: Phaser.Input.Pointer): void {
    const isSkipButton = pointer.x >= 876 && pointer.x <= 984 && pointer.y >= 24 && pointer.y <= 62;
    if (!isSkipButton) {
      this.advancePage();
    }
  }

  private handleKeyboardDown = (event: KeyboardEvent): void => {
    const command = keyboardCommand(event.key);
    if (!command) return;
    event.preventDefault();

    if (command === 'up' || command === 'left') {
      this.keyboardTarget = 'skip';
      this.render();
      return;
    }
    if (command === 'down' || command === 'right') {
      this.keyboardTarget = 'advance';
      this.render();
      return;
    }
    if (command === 'cancel') {
      this.finishStory();
      return;
    }
    if (command === 'confirm') {
      if (this.keyboardTarget === 'skip') {
        this.finishStory();
      } else {
        this.advancePage();
      }
    }
  };

  private finishStory(): void {
    this.registry.set('introStoryComplete', true);
    if (this.registry.get('battleBgmPreloadComplete')) {
      const preloadScene = this.scene.get('BgmPreloadScene') as BgmPreloadSceneHandle;
      preloadScene.stopPathimonScreensaver?.();
    }
    this.scene.start('DisclaimerScene');
  }

  private advancePage(): void {
    if (this.pageIndex >= storyPages().length - 1) {
      this.finishStory();
      return;
    }

    this.pageIndex += 1;
    this.render();
  }
}
