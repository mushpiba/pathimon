import type { MoveData, RuntimeMonster } from '../types/game';
import { calculateMultiplier, type MultiplierResult } from './effectiveness';
import { attackStatMultiplier, defenseStatMultiplier, directDamageMultiplier } from '../data/statusConditions';

export interface DamageResult {
  damage: number;
  multiplier: MultiplierResult;
  blockedByInvulnerability: boolean;
  critical: boolean;
}

const CRITICAL_HIT_DENOMINATORS = [24, 8, 2, 1] as const;
const CRITICAL_DAMAGE_MULTIPLIER = 1.5;

export function randomDamageVariance(random: () => number = Math.random): number {
  return 0.85 + random() * 0.15;
}

export function criticalHitChance(stage = 0): number {
  const index = Math.min(CRITICAL_HIT_DENOMINATORS.length - 1, Math.max(0, Math.floor(stage)));
  return 1 / CRITICAL_HIT_DENOMINATORS[index]!;
}

export function rollsCriticalHit(roll: number, stage = 0): boolean {
  return roll < criticalHitChance(stage);
}

function getIncomingFactor(defender: RuntimeMonster): number {
  return defender.effects
    .filter((effect) => effect.kind === 'field' && effect.side === 'incoming')
    .reduce((factor, effect) => factor * (effect.factor ?? 1), 1);
}

function isInvulnerable(defender: RuntimeMonster): boolean {
  return defender.effects.some((effect) => effect.kind === 'invuln');
}

function resolveStat(monster: RuntimeMonster, stat: 'attack' | 'defense'): number {
  const pct = monster.effects
    .filter((effect) => effect.kind === 'buff' && effect.stat === stat)
    .reduce((total, effect) => total + (effect.pct ?? 0), 0);

  const conditionMultiplier = stat === 'attack' ? attackStatMultiplier(monster) : defenseStatMultiplier(monster);
  return Math.max(1, Math.round(monster[stat] * (1 + pct / 100) * conditionMultiplier));
}

export function calculateDamage(
  attacker: RuntimeMonster,
  defender: RuntimeMonster,
  move: MoveData,
  variance = 1,
  multiplierOverride?: MultiplierResult,
  critical = false,
): DamageResult {
  const multiplier = multiplierOverride ?? calculateMultiplier(move, attacker, defender);
  const blockedByInvulnerability = isInvulnerable(defender);

  if (move.power === 0 || multiplier.total === 0 || blockedByInvulnerability) {
    return {
      damage: 0,
      multiplier,
      blockedByInvulnerability,
      critical: false,
    };
  }

  const baseDamage = move.power * (resolveStat(attacker, 'attack') / resolveStat(defender, 'defense'));
  const criticalMultiplier = critical ? CRITICAL_DAMAGE_MULTIPLIER : 1;
  const totalDamage = baseDamage
    * multiplier.total
    * getIncomingFactor(defender)
    * directDamageMultiplier(defender)
    * variance
    * criticalMultiplier;

  return {
    damage: Math.max(1, Math.round(totalDamage)),
    multiplier,
    blockedByInvulnerability,
    critical,
  };
}
