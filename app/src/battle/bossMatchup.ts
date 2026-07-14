import { BOSS_ATTACK_MOVE_IDS } from '../data/bossAttackMatchups';
import { MOVES } from '../data/moves';
import type { CountermeasureProfile, MoveData, MoveId, RuntimeMonster } from '../types/game';

export type BossEffectivenessKind = 'normal' | 'effective' | 'super';

export interface BossDefenseProfile extends CountermeasureProfile {}

export interface BossMoveEffectiveness {
  kind: BossEffectivenessKind;
  multiplier: 1 | 2 | 4;
  matchedTags: string[];
}

function normalizeTag(tag: string): string {
  return tag.trim().replace(/\s+/g, ' ').toLocaleLowerCase('ko');
}

function uniqueTags(tags: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const tag of tags.map((value) => value.trim()).filter(Boolean)) {
    const key = normalizeTag(tag);
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(tag);
  }

  return result;
}

function matchedProfileTags(profileTags: string[], moveTags: string[]): string[] {
  const moveTagSet = new Set(moveTags.map(normalizeTag));
  return profileTags.filter((tag) => moveTagSet.has(normalizeTag(tag)));
}

export function createBossDefenseProfile(monster: RuntimeMonster): BossDefenseProfile {
  return {
    direct: uniqueTags(monster.countermeasures?.direct ?? []),
    symptomTags: uniqueTags(monster.countermeasures?.symptomTags ?? []),
  };
}

export function bossMoveEffectiveness(move: MoveData | undefined, profile: BossDefenseProfile): BossMoveEffectiveness {
  const targetTags = uniqueTags(move?.targetTags ?? []);
  if (targetTags.length === 0) return { kind: 'normal', multiplier: 1, matchedTags: [] };

  const directMatches = matchedProfileTags(profile.direct, targetTags);
  if (directMatches.length > 0) {
    return { kind: 'super', multiplier: 4, matchedTags: directMatches };
  }

  const symptomMatches = matchedProfileTags(profile.symptomTags, targetTags);
  if (symptomMatches.length > 0) {
    return { kind: 'effective', multiplier: 2, matchedTags: symptomMatches };
  }

  return { kind: 'normal', multiplier: 1, matchedTags: [] };
}

function randomIndex(length: number, random: () => number): number {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}

function chooseFrom<T>(items: T[], random: () => number): T | undefined {
  return items[randomIndex(items.length, random)];
}

export function chooseBossMove(
  moveIds: MoveId[],
  profile: BossDefenseProfile,
  _sealedMoveIds: MoveId[] = [],
  random: () => number = Math.random,
): MoveId | undefined {
  const candidates = moveIds.filter((moveId) => MOVES[moveId]);
  if (candidates.length === 0) return undefined;

  const effectiveMoves = candidates.filter((moveId) => bossMoveEffectiveness(MOVES[moveId], profile).kind !== 'normal');
  if (effectiveMoves.length > 0 && random() < 0.5) {
    return chooseFrom(effectiveMoves, random);
  }

  return chooseFrom(candidates, random);
}

export function chooseEffectiveBossMove(
  moveIds: MoveId[],
  profile: BossDefenseProfile,
  random: () => number = Math.random,
): MoveId | undefined {
  const effectiveMoves = moveIds.filter((moveId) => MOVES[moveId] && bossMoveEffectiveness(MOVES[moveId], profile).kind !== 'normal');
  return chooseFrom(effectiveMoves, random);
}

export function selectBossMoveSet(
  movePool: MoveId[] = BOSS_ATTACK_MOVE_IDS,
  random: () => number = Math.random,
  count = 4,
): MoveId[] {
  const remaining = movePool.filter((moveId) => MOVES[moveId]);
  const selected: MoveId[] = [];

  while (selected.length < count && remaining.length > 0) {
    const index = randomIndex(remaining.length, random);
    const [moveId] = remaining.splice(index, 1);
    if (moveId) selected.push(moveId);
  }

  return selected;
}