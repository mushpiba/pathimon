import type { MonsterData, MoveId } from '../types/game';

export function buildLoadout(monster: MonsterData): MoveId[] {
  const slots: MoveId[] = [];

  if (monster.signature) {
    slots.push(monster.signature);
  }

  for (const moveId of monster.learnset) {
    if (slots.length >= 4) {
      break;
    }

    if (!slots.includes(moveId)) {
      slots.push(moveId);
    }
  }

  return slots.slice(0, 4);
}
