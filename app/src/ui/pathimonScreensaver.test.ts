import { describe, expect, it } from 'vitest';
import {
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

  it('starts every selected pathimon outside the viewport with a slow inward path', () => {
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
    for (const item of items) {
      const startsOutside = item.startX < 0 || item.startX > 1024 || item.startY < 0 || item.startY > 576;
      const endsOutside = item.endX < 0 || item.endX > 1024 || item.endY < 0 || item.endY > 576;
      expect(startsOutside).toBe(true);
      expect(endsOutside).toBe(true);
      expect(Math.hypot(item.endX - item.startX, item.endY - item.startY)).toBeGreaterThan(300);
      expect(item.durationMs).toBeGreaterThanOrEqual(14000);
      expect(item.durationMs).toBeLessThanOrEqual(26000);
    }
  });
});
