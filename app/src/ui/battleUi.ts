import { ATTACK_TYPE_LABELS } from '../data/labels';
import { MOVES } from '../data/moves';
import type { MoveId, RuntimeMonster } from '../types/game';

interface MoveSelectionPressInput {
  armedMoveId: MoveId;
  moveId: MoveId;
  selectedMoveId: MoveId;
}

interface MoveSelectionPressResult {
  armedMoveId: MoveId;
  intent: 'execute' | 'preview';
  selectedMoveId: MoveId;
}

export function resolveMoveSelectionPress(input: MoveSelectionPressInput): MoveSelectionPressResult {
  const canExecute = input.armedMoveId === input.moveId && input.selectedMoveId === input.moveId;

  return {
    armedMoveId: input.moveId,
    intent: canExecute ? 'execute' : 'preview',
    selectedMoveId: input.moveId,
  };
}

export function hpPct(monster: RuntimeMonster): number {
  return monster.hp / monster.maxHp;
}

export function formatMoveDetails(moveId: MoveId): string[] {
  const move = MOVES[moveId];
  return [
    move.name,
    `타입: ${ATTACK_TYPE_LABELS[move.type]}`,
    `위력: ${move.power}`,
    `명중률: ${Math.round(move.accuracy * 100)}%`,
    move.description,
    move.learnText,
  ];
}

export function effectLabels(monster: RuntimeMonster): string[] {
  return monster.effects.map((effect) => {
    if (effect.kind === 'buff') return `${effect.stat === 'attack' ? '공격' : '방어'} ${effect.pct ?? 0}%`;
    if (effect.kind === 'field') return '피해감소';
    if (effect.kind === 'invuln') return '잠복';
    if (effect.kind === 'dot') return '지속피해';
    if (effect.kind === 'convert') return '개종';
    return effect.kind;
  });
}

export function statusSummary(monster: RuntimeMonster): string {
  const labels = effectLabels(monster);
  return labels.length > 0 ? `상태: ${labels.join(', ')}` : '상태: 정상';
}