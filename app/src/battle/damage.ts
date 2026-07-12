import type { MoveData, RuntimeMonster } from '../types/game';
import { calculateMultiplier, type MultiplierResult } from './effectiveness';
import { attackStatMultiplier, directDamageMultiplier } from '../data/statusConditions';

export interface DamageResult {
  damage: number;
  multiplier: MultiplierResult;
  blockedByInvulnerability: boolean;
}

export function randomDamageVariance(random: () => number = Math.random): number {
  return 0.85 + random() * 0.15;
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

  const conditionMultiplier = stat === 'attack' ? attackStatMultiplier(monster) : 1;
  return Math.max(1, Math.round(monster[stat] * (1 + pct / 100) * conditionMultiplier));
}

export function calculateDamage(
  attacker: RuntimeMonster,
  defender: RuntimeMonster,
  move: MoveData,
  variance = 1,
  multiplierOverride?: MultiplierResult,
): DamageResult {
  const multiplier = multiplierOverride ?? calculateMultiplier(move, attacker, defender);
  const blockedByInvulnerability = isInvulnerable(defender);

  if (move.power === 0 || multiplier.total === 0 || blockedByInvulnerability) {
    return {
      damage: 0,
      multiplier,
      blockedByInvulnerability,
    };
  }

  const baseDamage = move.power * (resolveStat(attacker, 'attack') / resolveStat(defender, 'defense'));
  const totalDamage = baseDamage * multiplier.total * getIncomingFactor(defender) * directDamageMultiplier(defender) * variance;

  return {
    damage: Math.max(1, Math.round(totalDamage)),
    multiplier,
    blockedByInvulnerability,
  };
}
