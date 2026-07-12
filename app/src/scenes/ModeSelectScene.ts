import Phaser from 'phaser';
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

const SELECTED_FILL = 0x4a405d;
const ACTIVE_LINE = 0x72d6ff;

export class ModeSelectScene extends Phaser.Scene {
  private choice: ModeSelectChoice = {};

  constructor() {
    super('ModeSelectScene');
  }

  create(): void {
    this.choice = {};
    this.render();
  }

  private render(): void {
    destroySceneChildren(this);
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);
    drawPanel(this, 104, 62, 816, 462);
    addLabel(this, 150, 96, '모드 선택', 34);
    addLabel(this, 152, 138, '진행 방식과 표현 방식을 하나씩 고릅니다.', 20).setAlpha(0.9);
    addLabel(this, 152, 172, '학습 핵심: 병원체의 분류, 특징, 방어기전을 관찰하며 층을 오릅니다.', 17)
      .setAlpha(0.86)
      .setWordWrapWidth(720);

    addLabel(this, 154, 208, '진행 모드', 15).setAlpha(0.75);
    addLabel(this, 154, 362, '표현 방식', 15).setAlpha(0.75);

    modeSelectButtonOptions().forEach((option, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      this.createSelectButton(152 + column * 400, 232 + row * 154, 320, 112, option);
    });

    const hint = shouldStartRun(this.choice)
      ? '선택 완료'
      : '진행 모드와 표현 방식을 모두 선택하면 시작합니다.';
    addLabel(this, 152, 500, hint, 15).setAlpha(0.78);
  }

  private createSelectButton(x: number, y: number, width: number, height: number, option: ModeSelectOption): void {
    const selected = this.isSelected(option);
    const rect = this.add.rectangle(x, y, width, height, selected ? SELECTED_FILL : COLORS.panelDark).setOrigin(0);
    rect.setStrokeStyle(2, selected ? ACTIVE_LINE : COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(SELECTED_FILL));
    rect.on('pointerout', () => rect.setFillStyle(selected ? SELECTED_FILL : COLORS.panelDark));
    rect.on('pointerdown', () => this.handleOptionPress(option));

    addLabel(this, x + 24, y + 18, option.label, 22).setWordWrapWidth(width - 48);
    option.lines.forEach((line, index) =>
      addLabel(this, x + 24, y + 54 + index * 21, line, 14)
        .setAlpha(0.88)
        .setWordWrapWidth(width - 48),
    );
  }

  private handleOptionPress(option: ModeSelectOption): void {
    this.choice = resolveModeSelectChoice(this.choice, option);
    this.render();

    if (shouldStartRun(this.choice)) {
      const mode: RunMode = this.choice.mode;
      const visualStyle: VisualStyle = this.choice.visualStyle;
      this.time.delayedCall(120, () => this.scene.start('StarterSelectScene', { mode, visualStyle }));
    }
  }

  private isSelected(option: ModeSelectOption): boolean {
    return option.kind === 'mode'
      ? this.choice.mode === option.value
      : this.choice.visualStyle === option.value;
  }
}
