import { BOSS_ATTACK_MATCHUPS, BOSS_ATTACK_MOVE_IDS, type BossDefenseTrait, type BossEffectivenessKind } from '../data/bossAttackMatchups';
import { MOVES } from '../data/moves';
import { statusConditionStacks } from '../data/statusConditions';
import type { AbilityId, MoveData, MoveId, RuntimeMonster, TagValue } from '../types/game';

export interface BossDefenseProfile {
  traits: BossDefenseTrait[];
}

export interface BossMoveEffectiveness {
  kind: BossEffectivenessKind;
  multiplier: 0 | 1 | 2;
  matchedTraits: BossDefenseTrait[];
}

function activeDefenseAbilities(monster: RuntimeMonster): AbilityId[] {
  const abilities = monster.abilities?.length ? monster.abilities : [monster.ability];
  const disabledCount = Math.floor(statusConditionStacks(monster, 'immune_abnormal') / 2);
  return abilities.slice(disabledCount).filter((ability) => ability !== 'none');
}

function categoryTraits(category: string): BossDefenseTrait[] {
  if (category === '세균') return ['category_bacteria'];
  if (category === '바이러스') return ['category_virus', 'viral'];
  if (category === '진균') return ['category_fungus', 'fungal_membrane'];
  if (['원충', '원생동물', '프로토조아'].includes(category)) return ['category_protozoa'];
  if (['연충', '선충', '흡충', '조충', '기생충'].includes(category)) return ['category_parasite', 'large_body'];
  if (category === '프리온') return ['no_nucleic'];
  return [];
}

function tagTraits(tagValues: TagValue[]): BossDefenseTrait[] {
  const traits: BossDefenseTrait[] = [...tagValues];

  if (tagValues.some((tag) => tag === 'gram_positive' || tag === 'gram_negative')) {
    traits.push('bacterial_cell_wall');
  }

  if (tagValues.some((tag) => tag === 'fungal' || tag === 'fungal_dimorphic' || tag === 'fungal_hypha')) {
    traits.push('fungal_membrane');
  }

  if (tagValues.some((tag) => tag === 'enveloped_virus' || tag === 'retrovirus')) {
    traits.push('viral');
  }

  if (tagValues.includes('large')) {
    traits.push('large_body');
  }

  return traits;
}

function abilityDerivedTraits(abilities: AbilityId[]): BossDefenseTrait[] {
  const traits: BossDefenseTrait[] = [];
  if (abilities.includes('barrier')) traits.push('no_cell_wall');
  if (abilities.includes('large_resistance')) traits.push('large_body');
  return traits;
}

function moveDerivedTraits(monster: RuntimeMonster): BossDefenseTrait[] {
  const traits: BossDefenseTrait[] = [];
  const moves = monster.moveset.map((moveId) => MOVES[moveId]).filter((move): move is MoveData => Boolean(move));

  if (moves.some((move) => move.type === 'toxin' || move.type === 'superantigen' || move.typeLabel?.includes('독소'))) {
    traits.push('toxin_axis');
  }

  if (moves.some((move) => move.type === 'superantigen')) {
    traits.push('superantigen_axis');
  }

  return traits;
}

function uniqueTraits(traits: BossDefenseTrait[]): BossDefenseTrait[] {
  return [...new Set(traits)].sort((a, b) => a.localeCompare(b, 'ko'));
}

export function createBossDefenseProfile(monster: RuntimeMonster): BossDefenseProfile {
  const abilities = activeDefenseAbilities(monster);
  const tags = Object.values(monster.tags).filter((tag): tag is TagValue => Boolean(tag));

  return {
    traits: uniqueTraits([
      ...abilities,
      ...abilityDerivedTraits(abilities),
      ...tags,
      ...tagTraits(tags),
      ...categoryTraits(monster.category),
      ...moveDerivedTraits(monster),
      ...(abilities.length === 0 ? ['none'] : []),
    ]),
  };
}

function matchedTraits(profile: BossDefenseProfile, candidates: BossDefenseTrait[]): BossDefenseTrait[] {
  return candidates.filter((trait) => profile.traits.includes(trait));
}

export function bossMoveEffectiveness(move: MoveData | undefined, profile: BossDefenseProfile): BossMoveEffectiveness {
  const matchup = move ? BOSS_ATTACK_MATCHUPS[move.type] : undefined;
  if (!matchup) return { kind: 'normal', multiplier: 1, matchedTraits: [] };

  const noneTraits = matchedTraits(profile, matchup.none);
  if (noneTraits.length > 0) return { kind: 'none', multiplier: 0, matchedTraits: noneTraits };

  const superTraits = matchedTraits(profile, matchup.super);
  if (superTraits.length > 0) return { kind: 'super', multiplier: 2, matchedTraits: superTraits };

  return { kind: 'normal', multiplier: 1, matchedTraits: [] };
}

function randomIndex(length: number, random: () => number): number {
  return Math.min(length - 1, Math.max(0, Math.floor(random() * length)));
}

export function chooseBossMove(
  moveIds: MoveId[],
  profile: BossDefenseProfile,
  sealedMoveIds: MoveId[] = [],
  random: () => number = Math.random,
): MoveId | undefined {
  const unsealedMoves = moveIds.filter((moveId) => !sealedMoveIds.includes(moveId) && MOVES[moveId]);
  if (unsealedMoves.length === 0) return undefined;

  const superMoves = unsealedMoves.filter((moveId) => bossMoveEffectiveness(MOVES[moveId], profile).kind === 'super');
  if (superMoves.length > 0) return superMoves[randomIndex(superMoves.length, random)];

  const normalMoves = unsealedMoves.filter((moveId) => bossMoveEffectiveness(MOVES[moveId], profile).kind === 'normal');
  const candidates = normalMoves.length > 0 ? normalMoves : unsealedMoves;
  return candidates[randomIndex(candidates.length, random)];
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
