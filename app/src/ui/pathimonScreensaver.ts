import { wildEncounterRoster } from '../data/monsters';

type RandomSource = () => number;
export type PathimonLaunchZone = 'top' | 'left' | 'right';

export interface PathimonScreensaverItem {
  assetPath: string;
  collisionGroup: number;
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
const SAFE_LAUNCH_ZONES: PathimonLaunchZone[] = ['top', 'left', 'right'];

export function pathimonScreensaverSpritePool(): string[] {
  return [...new Set(
    wildEncounterRoster().map((monster) => `images/pathimon/${monster.assetBaseId ?? monster.id}-front.png`),
  )];
}

export function pathimonScreensaverSpriteCount(random: RandomSource = Math.random): number {
  const pairCount = Math.floor(random() * 3);
  return MIN_VISIBLE_PATHIMON + pairCount * 2;
}

function randomRange(min: number, max: number, random: RandomSource): number {
  return min + (max - min) * random();
}

function randomIndex(length: number, random: RandomSource): number {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}

function randomLaunchZone(random: RandomSource): PathimonLaunchZone {
  return SAFE_LAUNCH_ZONES[randomIndex(SAFE_LAUNCH_ZONES.length, random)]!;
}

function randomDifferentLaunchZone(zone: PathimonLaunchZone, random: RandomSource): PathimonLaunchZone {
  const candidates = SAFE_LAUNCH_ZONES.filter((candidate) => candidate !== zone);
  return candidates[randomIndex(candidates.length, random)]!;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function launchPoint(
  zone: PathimonLaunchZone,
  width: number,
  height: number,
  margin: number,
  random: RandomSource,
): { x: number; y: number } {
  if (zone === 'top') return { x: randomRange(width * 0.04, width * 0.96, random), y: -margin };
  if (zone === 'left') return { x: -margin, y: randomRange(height * 0.06, height * 0.46, random) };
  return { x: width + margin, y: randomRange(height * 0.06, height * 0.46, random) };
}

function exitPoint(
  zone: PathimonLaunchZone,
  width: number,
  height: number,
  margin: number,
  random: RandomSource,
): { x: number; y: number } {
  if (zone === 'top') return { x: randomRange(width * 0.04, width * 0.96, random), y: -margin };
  if (zone === 'left') return { x: -margin, y: randomRange(height * 0.06, height * 0.46, random) };
  return { x: width + margin, y: randomRange(height * 0.06, height * 0.46, random) };
}

function createPairItem(
  options: PathimonScreensaverOptions,
  zone: PathimonLaunchZone,
  collisionGroup: number,
  shared: { delayMs: number; durationMs: number; impactX: number; impactY: number },
  random: RandomSource,
): PathimonScreensaverItem {
  const sprites = options.sprites?.length ? options.sprites : pathimonScreensaverSpritePool();
  const margin = Math.max(128, Math.min(options.width, options.height) * 0.28);
  const start = launchPoint(zone, options.width, options.height, margin, random);
  const end = exitPoint(zone, options.width, options.height, margin, random);

  return {
    assetPath: sprites[randomIndex(sprites.length, random)]!,
    collisionGroup,
    delayMs: shared.delayMs,
    durationMs: shared.durationMs,
    endX: end.x,
    endY: end.y,
    impactX: shared.impactX,
    impactY: shared.impactY,
    launchZone: zone,
    respawnDelayMs: RESPAWN_DELAY_MS,
    scale: randomRange(0.81, 1.53, random),
    startX: start.x,
    startY: start.y,
    wobblePx: randomRange(-26, 26, random),
  };
}

export function createPathimonScreensaverPair(
  options: PathimonScreensaverOptions,
  collisionGroup = 0,
): [PathimonScreensaverItem, PathimonScreensaverItem] {
  const random = options.random ?? Math.random;
  const firstZone = randomLaunchZone(random);
  const secondZone = randomDifferentLaunchZone(firstZone, random);
  const shared = {
    delayMs: Math.round(randomRange(0, 650, random)),
    durationMs: Math.round(randomRange(4500, 7000, random)),
    impactX: randomRange(options.width * 0.38, options.width * 0.62, random),
    impactY: randomRange(options.height * 0.22, options.height * 0.42, random),
  };

  return [
    createPairItem(options, firstZone, collisionGroup, shared, random),
    createPairItem(options, secondZone, collisionGroup, shared, random),
  ];
}

export function createPathimonScreensaverItem(
  options: PathimonScreensaverOptions,
  launchZone?: PathimonLaunchZone,
): PathimonScreensaverItem {
  const pair = createPathimonScreensaverPair(options);
  if (launchZone) return pair.find((item) => item.launchZone === launchZone) ?? pair[0];
  return pair[0];
}

export function createPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  const random = options.random ?? Math.random;
  const count = pathimonScreensaverSpriteCount(random);
  const pairCount = count / 2;
  return Array.from({ length: pairCount }, (_, index) => (
    createPathimonScreensaverPair({ ...options, random }, index)
  )).flat();
}

export function createInitialPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  const random = options.random ?? Math.random;
  return createPathimonScreensaverItems(options).map((item) => {
    const progress = randomRange(0.54, 0.76, random);
    const startX = item.startX + (item.impactX - item.startX) * progress;
    const startY = item.startY + (item.impactY - item.startY) * progress;

    return {
      ...item,
      delayMs: 0,
      startX: clamp(startX, options.width * 0.04, options.width * 0.96),
      startY: clamp(startY, options.height * 0.06, options.height * 0.5),
    };
  });
}