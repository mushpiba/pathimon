import type { RuntimeMonster } from '../types/game';

export type CaptureResult =
  | { kind: 'blocked'; capsules: number }
  | { kind: 'noCapsules'; capsules: number }
  | { kind: 'captured'; capsules: number; chance: number }
  | { kind: 'missed'; capsules: number; chance: number };

export function tryCapture(enemy: RuntimeMonster, capsules: number, roll: number): CaptureResult {
  if (enemy.isBoss) {
    return { kind: 'blocked', capsules };
  }

  if (capsules <= 0) {
    return { kind: 'noCapsules', capsules };
  }

  const hpLoss = (enemy.maxHp - enemy.hp) / enemy.maxHp;
  const chance = Math.min(0.95, enemy.captureRate + hpLoss * 0.4);
  const remainingCapsules = capsules - 1;

  if (roll <= chance) {
    return { kind: 'captured', capsules: remainingCapsules, chance };
  }

  return { kind: 'missed', capsules: remainingCapsules, chance };
}