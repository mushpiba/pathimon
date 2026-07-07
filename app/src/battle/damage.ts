import type { MoveData, RuntimeMonster } from '../types/game';
import { calculateMultiplier, type MultiplierResult } from './effectiveness';

export interface DamageResult {
  damage: number;
  multiplier: MultiplierResult;
  blockedByInvulnerability: boolean;
}

function getIncomingFactor(defender: RuntimeMonster): number {
  return defender.effects
    .filter((effect) => effect.kind === 'field' && effect.side === 'incoming')
    .reduce((factor, effect) => factor * (effect.factor ?? 1), 1);
}

function isInvulnerable(defender: RuntimeMonster): boolean {
  return defender.effects.some((effect) => effect.kind === 'invuln');
}

export function calculateDamage(
  attacker: RuntimeMonster,
  defender: RuntimeMonster,
  move: MoveData,
  variance = 1,
): DamageResult {
  const multiplier = calculateMultiplier(move, attacker, defender);
  const blockedByInvulnerability = isInvulnerable(defender);

  if (move.power === 0 || multiplier.total === 0 || blockedByInvulnerability) {
    return {
      damage: 0,
      multiplier,
      blockedByInvulnerability,
    };
  }

  const baseDamage = Math.max(1, attacker.attack + move.power - defender.defense);
  const totalDamage = baseDamage * multiplier.total * getIncomingFactor(defender) * variance;

  return {
    damage: Math.max(1, Math.round(totalDamage)),
    multiplier,
    blockedByInvulnerability,
  };
}
