import { wildEncounterRoster } from '../data/monsters';

type RandomSource = () => number;

export interface PathimonScreensaverItem {
  assetPath: string;
  delayMs: number;
  durationMs: number;
  endX: number;
  endY: number;
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

function outsidePoint(side: number, width: number, height: number, margin: number, random: RandomSource): { x: number; y: number } {
  const cornerJitter = margin * 0.7;
  if (side === 0) return { x: randomRange(-margin, width + margin, random), y: -margin };
  if (side === 1) return { x: width + margin, y: randomRange(-margin, height + margin, random) };
  if (side === 2) return { x: randomRange(-margin, width + margin, random), y: height + margin };
  if (side === 3) return { x: -margin, y: randomRange(-margin, height + margin, random) };
  if (side === 4) return { x: randomRange(-margin, -cornerJitter, random), y: randomRange(-margin, -cornerJitter, random) };
  if (side === 5) return { x: randomRange(width + cornerJitter, width + margin, random), y: randomRange(-margin, -cornerJitter, random) };
  if (side === 6) return { x: randomRange(width + cornerJitter, width + margin, random), y: randomRange(height + cornerJitter, height + margin, random) };
  return { x: randomRange(-margin, -cornerJitter, random), y: randomRange(height + cornerJitter, height + margin, random) };
}

export function createPathimonScreensaverItem(options: PathimonScreensaverOptions): PathimonScreensaverItem {
  const random = options.random ?? Math.random;
  const sprites = options.sprites?.length ? options.sprites : pathimonScreensaverSpritePool();
  const margin = Math.max(72, Math.min(options.width, options.height) * 0.18);
  const startSide = randomIndex(8, random);
  const endSide = (startSide + 2 + randomIndex(5, random)) % 8;
  const start = outsidePoint(startSide, options.width, options.height, margin, random);
  const end = outsidePoint(endSide, options.width, options.height, margin, random);

  return {
    assetPath: sprites[randomIndex(sprites.length, random)]!,
    delayMs: Math.round(randomRange(0, 2400, random)),
    durationMs: Math.round(randomRange(14000, 26000, random)),
    endX: end.x,
    endY: end.y,
    scale: randomRange(0.54, 1.02, random),
    startX: start.x,
    startY: start.y,
    wobblePx: randomRange(8, 28, random),
  };
}

export function createPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  const random = options.random ?? Math.random;
  const count = pathimonScreensaverSpriteCount(random);
  return Array.from({ length: count }, () => createPathimonScreensaverItem({ ...options, random }));
}

export function createInitialPathimonScreensaverItems(options: PathimonScreensaverOptions): PathimonScreensaverItem[] {
  const random = options.random ?? Math.random;
  const count = pathimonScreensaverSpriteCount(random);
  return Array.from({ length: count }, () => {
    const item = createPathimonScreensaverItem({ ...options, random });
    return {
      ...item,
      delayMs: 0,
      startX: randomRange(options.width * 0.08, options.width * 0.92, random),
      startY: randomRange(options.height * 0.12, options.height * 0.88, random),
    };
  });
}
