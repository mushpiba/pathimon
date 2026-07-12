import Phaser from 'phaser';
import { COLORS } from '../game/constants';

export function addLabel(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  size = 18,
): Phaser.GameObjects.Text {
  return scene.add.text(x, y, text, {
    color: COLORS.text,
    fontFamily: '"Malgun Gothic", Arial, sans-serif',
    fontSize: `${size}px`,
    lineSpacing: 4,
  });
}

export interface BoxLabelOptions {
  align?: 'left' | 'center' | 'right';
  color?: string;
  height: number;
  maxLines?: number;
  minSize?: number;
  origin?: [number, number];
  size?: number;
  width: number;
}

export function addBoxLabel(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
  options: BoxLabelOptions,
): Phaser.GameObjects.Text {
  const size = options.size ?? 18;
  const minSize = options.minSize ?? Math.max(9, size - 4);
  const label = addLabel(scene, x, y, text, size)
    .setWordWrapWidth(options.width, true)
    .setAlign(options.align ?? 'left');

  if (options.color) label.setColor(options.color);
  if (options.origin) label.setOrigin(options.origin[0], options.origin[1]);
  if (options.maxLines) label.setMaxLines(options.maxLines);

  for (let currentSize = size; currentSize > minSize && (label.height > options.height || label.width > options.width); currentSize -= 1) {
    label.setFontSize(`${currentSize - 1}px`);
  }

  if (label.height > options.height && !options.maxLines) {
    const lineHeight = Math.max(minSize + 4, Number.parseInt(String(label.style.fontSize), 10) + 4);
    label.setMaxLines(Math.max(1, Math.floor(options.height / lineHeight)));
  }

  return label;
}

export function drawHpBar(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  pct: number,
): Phaser.GameObjects.Rectangle {
  scene.add.rectangle(x, y, width, 10, COLORS.hpBack).setOrigin(0, 0.5);
  return scene.add.rectangle(x, y, Math.max(0, width * pct), 8, COLORS.hp).setOrigin(0, 0.5);
}

export function drawPanel(
  scene: Phaser.Scene,
  x: number,
  y: number,
  width: number,
  height: number,
): Phaser.GameObjects.Rectangle {
  const panel = scene.add.rectangle(x, y, width, height, COLORS.panel).setOrigin(0);
  panel.setStrokeStyle(2, COLORS.line);
  return panel;
}
