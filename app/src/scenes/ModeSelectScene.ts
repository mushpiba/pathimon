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
const MODE_BUTTON_WIDTH = 350;
const MODE_BUTTON_HEIGHT = 116;
const STYLE_BUTTON_WIDTH = MODE_BUTTON_WIDTH;
const STYLE_BUTTON_HEIGHT = 54;

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
    drawPanel(this, 96, 48, 832, 480);
    this.add.rectangle(122, 76, 6, 64, ACTIVE_LINE).setOrigin(0);
    addLabel(this, 146, 72, '모드 선택', 34);
    addLabel(this, 148, 116, '진행 방식과 디자인을 선택합니다.', 17).setAlpha(0.78);
    this.add.rectangle(142, 154, 740, 2, COLORS.line, 0.55).setOrigin(0);

    addLabel(this, 142, 174, '01  진행 방식', 15).setColor('#72d6ff').setAlpha(0.92);
    addLabel(this, 142, 366, '02  디자인', 15).setColor('#72d6ff').setAlpha(0.92);

    const options = modeSelectButtonOptions();
    options.slice(0, 2).forEach((option, index) => {
      this.createModeButton(142 + index * 390, 202, option, index);
    });
    options.slice(2).forEach((option, index) => {
      this.createStyleButton(142 + index * 390, 402, option, index + 2);
    });

    if (shouldStartRun(this.choice)) {
      const modeLabel = this.choice.mode === 'learning' ? '학습모드' : '도전모드';
      const styleLabel = this.choice.visualStyle === 'character' ? '캐릭터풍' : '실사풍';
      this.add.rectangle(340, 468, 344, 34, 0x181522, 0.96)
        .setOrigin(0)
        .setStrokeStyle(1, ACTIVE_LINE, 0.72);
      addLabel(this, 512, 476, `${modeLabel}  ·  ${styleLabel}`, 14)
        .setOrigin(0.5, 0)
        .setColor('#dff7ff');
    }
  }

  private createModeButton(
    x: number,
    y: number,
    option: ModeSelectOption,
    index: number,
  ): void {
    const selected = this.isSelected(option);
    const rect = this.add.rectangle(
      x,
      y,
      MODE_BUTTON_WIDTH,
      MODE_BUTTON_HEIGHT,
      selected ? SELECTED_FILL : COLORS.panelDark,
    ).setOrigin(0);
    const focused = index === this.optionCursor;
    rect.setStrokeStyle(focused ? 4 : 2, selected || focused ? ACTIVE_LINE : COLORS.line);
    this.configureButton(rect, option, index, selected, COLORS.panelDark);

    this.add.rectangle(x + 16, y + 18, 5, 80, selected ? ACTIVE_LINE : COLORS.line, 0.92).setOrigin(0);
    addLabel(this, x + 38, y + 16, option.label, 23).setWordWrapWidth(MODE_BUTTON_WIDTH - 64);
    option.lines.forEach((line, lineIndex) =>
      addLabel(this, x + 38, y + 54 + lineIndex * 20, line, 13)
        .setAlpha(0.88)
        .setWordWrapWidth(MODE_BUTTON_WIDTH - 64),
    );
    if (selected) addLabel(this, x + MODE_BUTTON_WIDTH - 66, y + 18, '선택', 11).setColor('#72d6ff');
  }

  private createStyleButton(
    x: number,
    y: number,
    option: ModeSelectOption,
    index: number,
  ): void {
    const selected = this.isSelected(option);
    const rect = this.add.rectangle(
      x,
      y,
      STYLE_BUTTON_WIDTH,
      STYLE_BUTTON_HEIGHT,
      selected ? SELECTED_FILL : 0x211c2d,
    ).setOrigin(0);
    const focused = index === this.optionCursor;
    rect.setStrokeStyle(focused ? 4 : 2, selected || focused ? ACTIVE_LINE : COLORS.line);
    this.configureButton(rect, option, index, selected, 0x211c2d);

    this.add.rectangle(x + 16, y + 13, 8, 28, selected ? ACTIVE_LINE : COLORS.line, 0.92).setOrigin(0);
    addLabel(this, x + 42, y + 14, option.label, 19);
    if (selected) addLabel(this, x + STYLE_BUTTON_WIDTH - 58, y + 18, '선택', 10).setColor('#72d6ff');
  }

  private configureButton(
    rect: Phaser.GameObjects.Rectangle,
    option: ModeSelectOption,
    index: number,
    selected: boolean,
    idleFill: number,
  ): void {
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(SELECTED_FILL));
    rect.on('pointerout', () => rect.setFillStyle(selected ? SELECTED_FILL : idleFill));
    rect.on('pointerdown', () => {
      this.optionCursor = index;
      this.handleOptionPress(option);
    });
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
