import { describe, expect, it } from 'vitest';
import {
  createInitialPathimonScreensaverItems,
  createPathimonScreensaverItems,
  pathimonScreensaverSpritePool,
  pathimonScreensaverSpriteCount,
} from './pathimonScreensaver';

describe('pathimon screensaver', () => {
  it('uses the current pathimon front-image roster as the sprite pool', () => {
    const pool = pathimonScreensaverSpritePool();

    expect(pool.length).toBeGreaterThan(50);
    expect(pool.every((path) => path.startsWith('images/pathimon/'))).toBe(true);
    expect(pool.every((path) => path.endsWith('-front.png'))).toBe(true);
    expect(new Set(pool).size).toBe(pool.length);
  });

  it('chooses 8 to 12 pathimon for each screensaver run', () => {
    expect(pathimonScreensaverSpriteCount(() => 0)).toBe(8);
    expect(pathimonScreensaverSpriteCount(() => 0.999)).toBe(12);
  });

  it('launches pathimon from upper-left and lower-right bands toward the center', () => {
    const rolls = [0, 0.12, 0.33, 0.58, 0.84, 0.99];
    let index = 0;
    const random = () => rolls[index++ % rolls.length]!;
    const items = createPathimonScreensaverItems({
      height: 576,
      random,
      sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
      width: 1024,
    });

    expect(items.length).toBeGreaterThanOrEqual(8);
    expect(items.length).toBeLessThanOrEqual(12);
    expect(items.some((item) => item.launchZone === 'upperLeft')).toBe(true);
    expect(items.some((item) => item.launchZone === 'lowerRight')).toBe(true);
    for (const item of items) {
      const endsOutside = item.endX < 0 || item.endX > 1024 || item.endY < 0 || item.endY > 576;
      expect(item.startX).toBeGreaterThan(0);
      expect(item.startX).toBeLessThan(1024);
      expect(item.startY).toBeGreaterThan(0);
      expect(item.startY).toBeLessThan(576);
      expect(item.impactX).toBeGreaterThanOrEqual(1024 * 0.42);
      expect(item.impactX).toBeLessThanOrEqual(1024 * 0.58);
      expect(item.impactY).toBeGreaterThanOrEqual(576 * 0.38);
      expect(item.impactY).toBeLessThanOrEqual(576 * 0.62);
      expect(endsOutside).toBe(true);
      expect(item.respawnDelayMs).toBe(1000);
      expect(item.scale).toBeGreaterThanOrEqual(0.81);
      expect(item.scale).toBeLessThanOrEqual(1.53);
      expect(item.durationMs).toBeGreaterThanOrEqual(3600);
      expect(item.durationMs).toBeLessThanOrEqual(5600);
    }
  });

  it('keeps the first 8 to 12 pathimon visible immediately while BGM loads', () => {
    const rolls = [0.2, 0.44, 0.68, 0.92, 0.14, 0.36, 0.58, 0.8];
    let index = 0;
    const random = () => rolls[index++ % rolls.length]!;
    const items = createInitialPathimonScreensaverItems({
      height: 576,
      random,
      sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
      width: 1024,
    });

    expect(items.length).toBeGreaterThanOrEqual(8);
    expect(items.length).toBeLessThanOrEqual(12);
    for (const item of items) {
      expect(item.delayMs).toBe(0);
      expect(item.startX).toBeGreaterThan(0);
      expect(item.startX).toBeLessThan(1024);
      expect(item.startY).toBeGreaterThan(0);
      expect(item.startY).toBeLessThan(576);
      expect(item.endX < 0 || item.endX > 1024 || item.endY < 0 || item.endY > 576).toBe(true);
    }
  });
});
