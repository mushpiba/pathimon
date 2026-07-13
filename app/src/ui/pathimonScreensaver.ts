import { wildEncounterRoster } from '../data/monsters';

type RandomSource = () => number;
export type PathimonLaunchZone = 'upperLeft' | 'lowerRight';

export interface PathimonScreensaverItem {
  assetPath: string;
  delayMs: number;
  durationMs: number;
  endX: number;
  endY: number;
  impactX: number;
  impactY: number;
  launchZone: PathimonLaunchZone;
  respawnDelayMs: number;
  scale: number;
  startX: number;
  startY: number;
  wobblePx: number;
}

export interface PathimonScreensaverOptions {
  height: number;
  random?: RandomSource;
  sprites?: string[];
  width: number;
}

const MIN_VISIBLE_PATHIMON = 8;
const MAX_VISIBLE_PATHIMON = 12;
const RESPAWN_DELAY_MS = 1000;

export function pathimonScreensaverSpritePool(): string[] {
  return [...new Set(
    wildEncounterRoster().map((monster) => `images/pathimon/${monster.assetBaseId ?? monster.id}-front.png`),
  )];
}

export function pathimonScreensaverSpriteCount(random: RandomSource = Math.random): number {
  return MIN_VISIBLE_PATHIMON + Math.floor(random() * (MAX_VISIBLE_PATHIMON - MIN_VISIBLE_PATHIMON + 1));
}

function randomRange(min: number, max: number, random: RandomSource): number {
  return min + (max - min) * random();
}

function randomIndex(length: number, random: RandomSource): number {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}

function launchPoint(zone: PathimonLaunchZone, width: number, height: number, random: RandomSource): { x: number; y: number } {
  const horizontalEdge = random() < 0.5;
  if (zone === 'upperLeft') {
    if (horizontalEdge) return { x: randomRange(width * 0.05, width * 0.42, random), y: randomRange(height * 0.06, height * 0.16, random) };
    return { x: randomRange(width * 0.05, width * 0.15, random), y: randomRange(height * 0.14, height * 0.48, random) };
  }

  if (horizontalEdge) return { x: randomRange(width * 0.58, width * 0.95, random), y: randomRange(height * 0.84, height * 0.94, random) };
  return { x: randomRange(width * 0.85, width * 0.95, random), y: randomRange(height * 0.52, height * 0.86, random) };
}

function exitPoint(zone: PathimonLaunchZone, width: number, height: number, margin: number, random: RandomSource): { x: number; y: number } {
  const horizontalEdge = random() < 0.5;
  if (zone === 'upperLeft') {
    if (horizontalEdge) return { x: randomRange(-margin, width * 0.38, random), y: -margin };
    return { x: -margin, y: randomRange(height * 0.08, height * 0.52, random) };
  }

  if (horizontalEdge) return { x: randomRange(width * 0.62, width + margin, random), y: height + margin };
  return { x: width + margin, y: randomRange(height * 0.48, height * 0.92, random) };
}

export function createPathimonScreensaverItem(
  options: PathimonScreensaverOptions,
  launchZone?: PathimonLaunchZone,
): PathimonScreensaverItem {
  const random = options.random ?? Math.random;
  const sprites = options.sprites?.length ? options.sprites : pathimonScreensaverSpritePool();
  const margin = Math.max(96, Math.min(options.width, options.height) * 0.22);
  const zone = launchZone ?? (random() < 0.5 ? 'upperLeft' : 'lowerRight');
  const start = launchPoint(zone, options.width, options.height, random);
  const end = exitPoint(zone, options.width, options.height, margin, random);

  return {
    assetPath: sprites[randomIndex(sprites.length, random)]!,
    delayMs: Math.round(randomRange(0, 650, random)),
    durationMs: Math.round(randomRange(3600, 5600, random)),
    endX: end.x,
    endY: end.y,
    impactX: randomRange(options.width * 0.42, options.width * 0.58, random),
    impactY: randomRange(options.height * 0.38, options.height * 0.62, random),
    launchZone: zone,
    respawnDelayMs: RESPAWN_DELAY_MS,
    scale: randomRange(0.81, 1.53, random),
    startX: start.x,
    startY: start.y,
    wobblePx: randomRange(-26, 26, random),
  };
}

export function createPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  const random = options.random ?? Math.random;
  const count = pathimonScreensaverSpriteCount(random);
  return Array.from({ length: count }, (_, index) => {
    const launchZone: PathimonLaunchZone = index % 2 === 0 ? 'upperLeft' : 'lowerRight';
    return createPathimonScreensaverItem({ ...options, random }, launchZone);
  });
}

export function createInitialPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  return createPathimonScreensaverItems(options).map((item) => ({
    ...item,
    delayMs: 0,
  }));
}
