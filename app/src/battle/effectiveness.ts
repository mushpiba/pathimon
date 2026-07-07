import { ABILITIES } from '../data/abilities';
import { EFFECTIVENESS } from '../data/effectiveness';
import type { MoveData, RuntimeMonster, TagAxis, TagValue } from '../types/game';

export interface MultiplierResult {
  total: number;
  notes: string[];
}

export function calculateMultiplier(
  move: MoveData,
  attacker: RuntimeMonster,
  defender: RuntimeMonster,
): MultiplierResult {
  const notes: string[] = [];
  const table = EFFECTIVENESS[move.type];
  let typeMultiplier = 1;

  if (table) {
    const abilityHit = table[defender.ability];
    if (abilityHit !== undefined) {
      typeMultiplier *= abilityHit;
    }

    for (const tagValue of Object.values(defender.tags) as TagValue[]) {
      if (!tagValue) {
        continue;
      }

      const tagHit = table[tagValue];
      if (tagHit !== undefined) {
        typeMultiplier *= tagHit;
      }
    }
  }

  typeMultiplier = Math.min(3, Math.max(0, typeMultiplier));

  let total = typeMultiplier;
  const resistTag = ABILITIES[defender.ability].resistTag;

  if (resistTag) {
    for (const axis of Object.keys(resistTag) as TagAxis[]) {
      const tagMap = resistTag[axis];
      const attackTag = attacker.tags[axis];

      if (!attackTag) {
        continue;
      }

      const reaction = tagMap?.[attackTag as TagValue];
      if (reaction === undefined) {
        continue;
      }

      total *= reaction;

      if (defender.ability === 'mask' && axis === 'pathway' && attackTag === 'respiratory') {
        notes.push('점액섬모가 호흡기 태그를 반감했다');
      }

      if (defender.ability === 'lysozyme' && axis === 'wall' && attackTag === 'gram_positive') {
        notes.push('라이소자임이 그람양성 태그를 반감했다');
      }
    }
  }

  return { total, notes };
}
