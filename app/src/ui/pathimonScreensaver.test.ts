import { describe, expect, it } from 'vitest';
import {
  createInitialPathimonScreensaverItems,
  createPathimonScreensaverItems,
  createPathimonScreensaverPair,
  pathimonScreensaverSpritePool,
  pathimonScreensaverSpriteCount,
} from './pathimonScreensaver';

function seededRandom(seed = 123456): () => number {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 0x100000000;
  };
}

function isOutsideViewport(item: { startX: number; startY: number }, width: number, height: number): boolean {
  return item.startX < 0 || item.startX > width || item.startY < 0 || item.startY > height;
}

function isSafeLaunchPoint(item: { startX: number; startY: number }, width: number, height: number): boolean {
  const fromTop = item.startY < 0 && item.startX >= width * 0.04 && item.startX <= width * 0.96;
  const fromLeft = item.startX < 0 && item.startY >= height * 0.06 && item.startY <= height * 0.46;
  const fromRight = item.startX > width && item.startY >= height * 0.06 && item.startY <= height * 0.46;
  return fromTop || fromLeft || fromRight;
}

describe('pathimon screensaver', () => {
  it('uses the current pathimon front-image roster as the sprite pool', () => {
    const pool = pathimonScreensaverSpritePool();

    expect(pool.length).toBeGreaterThan(50);
    expect(pool.every((path) => path.startsWith('images/pathimon/'))).toBe(true);
    expect(pool.every((path) => path.endsWith('-front.png'))).toBe(true);
    expect(new Set(pool).size).toBe(pool.length);
  });

  it('chooses an even 8 to 12 pathimon for paired collisions', () => {
    expect(pathimonScreensaverSpriteCount(() => 0)).toBe(8);
    expect(pathimonScreensaverSpriteCount(() => 0.5)).toBe(10);
    expect(pathimonScreensaverSpriteCount(() => 0.999)).toBe(12);
  });

  it('creates synchronized pairs that collide at the same point and timing', () => {
    const items = createPathimonScreensaverItems({
      height: 576,
      random: seededRandom(),
      sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
      width: 1024,
    });

    expect(items.length).toBeGreaterThanOrEqual(8);
    expect(items.length).toBeLessThanOrEqual(12);
    expect(items.length % 2).toBe(0);

    for (let index = 0; index < items.length; index += 2) {
      const first = items[index]!;
      const second = items[index + 1]!;
      expect(first.collisionGroup).toBe(second.collisionGroup);
      expect(first.launchZone).not.toBe(second.launchZone);
      expect(['top', 'left', 'right']).toContain(first.launchZone);
      expect(['top', 'left', 'right']).toContain(second.launchZone);
      expect(first.delayMs).toBe(second.delayMs);
      expect(first.durationMs).toBe(second.durationMs);
      expect(first.impactX).toBeCloseTo(second.impactX, 5);
      expect(first.impactY).toBeCloseTo(second.impactY, 5);
      expect(first.impactX).toBeGreaterThanOrEqual(1024 * 0.38);
      expect(first.impactX).toBeLessThanOrEqual(1024 * 0.62);
      expect(first.impactY).toBeGreaterThanOrEqual(576 * 0.22);
      expect(first.impactY).toBeLessThanOrEqual(576 * 0.42);
      expect(isOutsideViewport(first, 1024, 576)).toBe(true);
      expect(isOutsideViewport(second, 1024, 576)).toBe(true);
      expect(isSafeLaunchPoint(first, 1024, 576)).toBe(true);
      expect(isSafeLaunchPoint(second, 1024, 576)).toBe(true);
      if (first.endY > 0) expect(first.endY).toBeLessThanOrEqual(576 * 0.52);
      if (second.endY > 0) expect(second.endY).toBeLessThanOrEqual(576 * 0.52);
      expect(first.respawnDelayMs).toBe(1000);
      expect(second.respawnDelayMs).toBe(1000);
      expect(first.scale).toBeGreaterThanOrEqual(0.81);
      expect(first.scale).toBeLessThanOrEqual(1.53);
      expect(first.durationMs).toBeGreaterThanOrEqual(4500);
      expect(first.durationMs).toBeLessThanOrEqual(7000);
    }
  });

  it('randomizes launches across safe non-bottom edges', () => {
    const random = seededRandom(456);
    const zones = new Set<string>();

    for (let index = 0; index < 60; index += 1) {
      const pair = createPathimonScreensaverPair({
        height: 576,
        random,
        sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
        width: 1024,
      });
      pair.forEach((item) => {
        zones.add(item.launchZone);
        expect(isSafeLaunchPoint(item, 1024, 576)).toBe(true);
      });
    }

    expect([...zones].sort()).toEqual(['left', 'right', 'top']);
  });

  it('keeps recurring sprite swaps offscreen by starting respawned pairs outside the viewport', () => {
    const pair = createPathimonScreensaverPair({
      height: 576,
      random: seededRandom(789),
      sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
      width: 1024,
    });

    expect(pair).toHaveLength(2);
    expect(pair.every((item) => isOutsideViewport(item, 1024, 576))).toBe(true);
    expect(pair.every((item) => isSafeLaunchPoint(item, 1024, 576))).toBe(true);
  });

  it('starts the first 8 to 12 pathimon offscreen one by one', () => {
    const items = createInitialPathimonScreensaverItems({
      height: 576,
      random: seededRandom(987),
      sprites: ['images/pathimon/anthrax-front.png', 'images/pathimon/cereus-front.png'],
      width: 1024,
    });

    expect(items.length).toBeGreaterThanOrEqual(8);
    expect(items.length).toBeLessThanOrEqual(12);
    items.forEach((item, index) => {
      expect(item.delayMs).toBe(index * 350);
      expect(item.endX < 0 || item.endX > 1024 || item.endY < 0 || item.endY > 576).toBe(true);
      expect(isOutsideViewport(item, 1024, 576)).toBe(true);
      expect(isSafeLaunchPoint(item, 1024, 576)).toBe(true);
    });
  });
});
