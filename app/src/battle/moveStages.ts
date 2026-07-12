import type { MoveData, MoveOutcome, RuntimeMonster } from '../types/game';

function stageIndex(move: MoveData, monster?: RuntimeMonster): number {
  const stages = move.stageCycle;
  if (!stages?.length) return 0;

  const index = monster?.moveStages?.[move.id] ?? 0;
  return Math.min(stages.length - 1, Math.max(0, index));
}

export function currentMoveData(move: MoveData, monster?: RuntimeMonster): MoveData {
  const stage = move.stageCycle?.[stageIndex(move, monster)];
  if (!stage) return move;

  return {
    ...move,
    name: stage.name,
    power: stage.power,
    description: stage.description,
    effectText: stage.effectText,
    learnText: stage.learnText,
    effects: stage.effects,
    symptom: stage.symptom,
  };
}

export function currentMoveName(move: MoveData, monster?: RuntimeMonster): string {
  return currentMoveData(move, monster).name;
}

export function advanceStagedMove(monster: RuntimeMonster, move: MoveData): void {
  const stages = move.stageCycle;
  if (!stages?.length) return;

  const current = monster.moveStages?.[move.id] ?? 0;
  monster.moveStages = {
    ...(monster.moveStages ?? {}),
    [move.id]: (current + 1) % stages.length,
  };
}

export function resolveMoveOutcome(move: MoveData, roll: number): MoveData {
  const outcomes = move.outcomes;
  if (!outcomes?.length) return move;

  let cursor = 0;
  const selected = outcomes.find((outcome) => {
    cursor += outcome.chance;
    return roll < cursor;
  }) ?? outcomes[outcomes.length - 1];

  return applyOutcome(move, selected);
}

function applyOutcome(move: MoveData, outcome: MoveOutcome): MoveData {
  return {
    ...move,
    power: outcome.power ?? move.power,
    description: outcome.description,
    effectText: outcome.effectText,
    learnText: outcome.learnText,
    effects: outcome.effects,
    symptom: outcome.symptom,
  };
}
