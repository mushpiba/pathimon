import { BOSSES } from '../data/bosses';
import { wildEncounterRoster } from '../data/monsters';

export interface TitleScreenContent {
  bossSprites: string[];
  pathimonSprites: string[];
  startLabel: string;
  subtitle: string;
  title: string;
}

export interface TitleLogoChunk {
  fill: string;
  fontSize: number;
  shade: string;
  text: string;
  x: number;
  y: number;
}

export interface TitleLogoDecoration {
  color: string;
  kind: 'cell' | 'rod';
  radius: number;
  x: number;
  y: number;
}

export interface TitleLogoStyle {
  canvas: {
    height: number;
    width: number;
  };
  chunks: TitleLogoChunk[];
  decorations: TitleLogoDecoration[];
  display: {
    height: number;
    width: number;
    y: number;
  };
  outline: {
    glow: string;
    inner: string;
    outer: string;
  };
}

type RandomSource = () => number;

export interface TitleScreenContentOptions {
  bossRosterIds?: string[];
  random?: RandomSource;
}

function randomIndex(length: number, random: RandomSource): number {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}

function shuffled<T>(items: T[], random: RandomSource): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomIndex(index + 1, random);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function titlePathimonSprites(random: RandomSource): string[] {
  return shuffled(wildEncounterRoster(), random)
    .slice(0, 7)
    .map((monster) => `images/pathimon/${monster.assetBaseId ?? monster.id}-front.png`);
}

function titleBossSprites(bossRosterIds: string[] | undefined, random: RandomSource): string[] {
  const bossById = new Map(BOSSES.map((boss) => [boss.id, boss]));
  const rosterBosses = (bossRosterIds ?? [])
    .map((bossId) => bossById.get(bossId))
    .filter((boss): boss is (typeof BOSSES)[number] => Boolean(boss));
  const bosses = rosterBosses.length > 0 ? rosterBosses : shuffled(BOSSES, random);

  return bosses.slice(0, 6).map((boss) => boss.assetPath);
}

export function titleScreenContent(options: TitleScreenContentOptions = {}): TitleScreenContent {
  const random = options.random ?? Math.random;

  return {
    bossSprites: titleBossSprites(options.bossRosterIds, random),
    pathimonSprites: titlePathimonSprites(random),
    title: '감염과 면역',
    subtitle: '100층에 도전하세요!',
    startLabel: '게임 시작',
  };
}

export function titleCharacterDisplaySize(sourceWidth: number, sourceHeight: number, targetHeight: number): { height: number; width: number } {
  return {
    width: Math.round(targetHeight * sourceWidth / sourceHeight),
    height: targetHeight,
  };
}

export function titleLogoStyle(title: string): TitleLogoStyle {
  const chunks = title === '감염과 면역'
    ? [
      { text: '감염', x: 134, y: 56, fontSize: 58, fill: '#8e36a6', shade: '#4f185d' },
      { text: '과', x: 238, y: 64, fontSize: 47, fill: '#ffb52b', shade: '#a75308' },
      { text: '면역', x: 180, y: 117, fontSize: 58, fill: '#2e88e6', shade: '#174585' },
    ]
    : [
      { text: title, x: 180, y: 78, fontSize: 54, fill: '#8e36a6', shade: '#4f185d' },
    ];

  return {
    canvas: { width: 360, height: 150 },
    display: { width: 640, height: 266, y: 214 },
    outline: {
      outer: '#05070b',
      inner: '#f6fbff',
      glow: '#91ffe8',
    },
    chunks,
    decorations: [
      { kind: 'cell', x: 102, y: 26, radius: 4, color: '#6be18b' },
      { kind: 'rod', x: 158, y: 38, radius: 3, color: '#7cf3ac' },
      { kind: 'cell', x: 203, y: 33, radius: 3, color: '#61d3ff' },
      { kind: 'cell', x: 248, y: 31, radius: 4, color: '#a36fe3' },
      { kind: 'rod', x: 296, y: 50, radius: 3, color: '#91ffe8' },
      { kind: 'cell', x: 110, y: 83, radius: 3, color: '#72d6ff' },
      { kind: 'rod', x: 151, y: 103, radius: 3, color: '#d6f6ff' },
      { kind: 'cell', x: 215, y: 96, radius: 4, color: '#c7e7ff' },
      { kind: 'rod', x: 253, y: 121, radius: 3, color: '#e5f1ff' },
    ],
  };
}
