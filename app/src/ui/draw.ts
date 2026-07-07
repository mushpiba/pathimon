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
    fontFamily: 'Arial, sans-serif',
    fontSize: `${size}px`,
  });
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