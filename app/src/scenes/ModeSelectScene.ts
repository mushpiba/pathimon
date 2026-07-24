import Phaser from 'phaser';
import { playIntroBgm, queueIntroBgm } from '../audio/introBgm';
import { APP_HEIGHT, APP_WIDTH, COLORS } from '../game/constants';
import type { RunMode, VisualStyle } from '../types/game';
import { addLabel, drawPanel } from '../ui/draw';
import {
  modeSelectButtonOptions,
  resolveModeSelectChoice,
  shouldStartRun,
  type ModeSelectChoice,
  type ModeSelectOption,
} from '../ui/modeSelectUi';
import { destroySceneChildren } from '../ui/sceneCleanup';
import { keyboardCommand } from '../ui/keyboard';

const SELECTED_FILL = 0x4a405d;
const ACTIVE_LINE = 0x72d6ff;

export class ModeSelectScene extends Phaser.Scene {
  private choice: ModeSelectChoice = {};
  private optionCursor = 0;
  private starting = false;

  constructor() {
    super('ModeSelectScene');
  }

  preload(): void {
    queueIntroBgm(this);
  }

  create(): void {
    this.choice = {};
    this.optionCursor = 0;
    this.starting = false;
    playIntroBgm(this);
    this.input.keyboard?.on('keydown', this.handleKeyboardDown);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard?.off('keydown', this.handleKeyboardDown);
    });
    this.render();
  }

  private render(): void {
    destroySceneChildren(this);
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    drawPanel(this, 104, 62, 816, 462);
    addLabel(this, 150, 96, '모드 선택', 34);
    addLabel(this, 152, 138, '진행 방식과 디자인을 선택합니다.', 20).setAlpha(0.9);

    addLabel(this, 154, 208, '진행 방식', 15).setAlpha(0.75);
    addLabel(this, 154, 362, '디자인', 15).setAlpha(0.75);

    modeSelectButtonOptions().forEach((option, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      this.createSelectButton(152 + column * 400, 232 + row * 154, 320, 112, option, index);
    });

    if (shouldStartRun(this.choice)) {
      addLabel(this, 152, 500, '선택 완료', 15).setAlpha(0.78);
    }
  }

  private createSelectButton(
    x: number,
    y: number,
    width: number,
    height: number,
    option: ModeSelectOption,
    index: number,
  ): void {
    const selected = this.isSelected(option);
    const rect = this.add.rectangle(x, y, width, height, selected ? SELECTED_FILL : COLORS.panelDark).setOrigin(0);
    const focused = index === this.optionCursor;
    rect.setStrokeStyle(focused ? 4 : 2, selected || focused ? ACTIVE_LINE : COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(SELECTED_FILL));
    rect.on('pointerout', () => rect.setFillStyle(selected ? SELECTED_FILL : COLORS.panelDark));
    rect.on('pointerdown', () => {
      this.optionCursor = index;
      this.handleOptionPress(option);
    });

    addLabel(this, x + 24, y + 18, option.label, 22).setWordWrapWidth(width - 48);
    option.lines.forEach((line, index) =>
      addLabel(this, x + 24, y + 54 + index * 21, line, 14)
        .setAlpha(0.88)
        .setWordWrapWidth(width - 48),
    );
  }

  private handleOptionPress(option: ModeSelectOption): void {
    if (this.starting) return;
    this.choice = resolveModeSelectChoice(this.choice, option);
    this.render();

    if (shouldStartRun(this.choice)) {
      this.starting = true;
      const mode: RunMode = this.choice.mode;
      const visualStyle: VisualStyle = this.choice.visualStyle;
      this.time.delayedCall(120, () => this.scene.start('StarterSelectScene', { mode, visualStyle }));
    }
  }

  private handleKeyboardDown = (event: KeyboardEvent): void => {
    if (this.starting) return;
    const command = keyboardCommand(event.key);
    if (!command) return;
    event.preventDefault();

    if (command === 'left' || command === 'right') {
      this.optionCursor = this.optionCursor % 2 === 0 ? this.optionCursor + 1 : this.optionCursor - 1;
      this.render();
      return;
    }
    if (command === 'up' || command === 'down') {
      this.optionCursor = (this.optionCursor + 2) % 4;
      this.render();
      return;
    }
    if (command === 'confirm') {
      const option = modeSelectButtonOptions()[this.optionCursor];
      if (option) this.handleOptionPress(option);
    }
  };

  private isSelected(option: ModeSelectOption): boolean {
    return option.kind === 'mode'
      ? this.choice.mode === option.value
      : this.choice.visualStyle === option.value;
  }
}
