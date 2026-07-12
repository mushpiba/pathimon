import { MOVES } from '../data/moves';
import type { MonsterData, MoveId, MoveSlot } from '../types/game';

function pickAttacks(attackPool: MoveId[], rolls: number[]): MoveId[] {
  const remaining = [...attackPool];
  const picks: MoveId[] = [];

  while (remaining.length > 0 && picks.length < 2) {
    const roll = rolls[picks.length] ?? Math.random();
    const index = Math.min(remaining.length - 1, Math.max(0, Math.floor(roll * remaining.length)));
    const [moveId] = remaining.splice(index, 1);
    picks.push(moveId);
  }

  return picks;
}

export function buildMoveSlots(monster: MonsterData, attackRolls: number[] = []): MoveSlot[] {
  const prep = monster.prep ?? monster.learnset.find((moveId) => MOVES[moveId]?.kind === 'prep') ?? null;
  const attackPool: MoveId[] = [];

  for (const moveId of monster.learnset) {
    const move = MOVES[moveId];
    const isPrep = moveId === prep || move?.kind === 'prep';
    const isSignature = moveId === monster.signature || move?.signature || move?.kind === 'signature';

    if (!isPrep && !isSignature && !attackPool.includes(moveId)) {
      attackPool.push(moveId);
    }
  }

  const attacks = pickAttacks(attackPool, attackRolls);
  return [
    prep,
    attacks[0] ?? null,
    attacks[1] ?? null,
    monster.signature ?? null,
  ];
}

export function buildLoadout(monster: MonsterData, attackRolls: number[] = []): MoveId[] {
  return buildMoveSlots(monster, attackRolls).filter((moveId): moveId is MoveId => Boolean(moveId));
}
