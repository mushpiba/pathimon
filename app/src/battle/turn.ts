import { tryCapture } from './capture';
import { calculateDamage } from './damage';
import { applyEffects, tickEffects } from './effects';
import { MOVES } from '../data/moves';
import { MONSTERS } from '../data/monsters';
import { createMonsterInstance } from '../state/factory';
import type { MoveId, RunState, RuntimeMonster } from '../types/game';

const WIN_REWARD = 3;

function cloneMonster(monster: RuntimeMonster): RuntimeMonster {
  return {
    ...monster,
    tags: { ...monster.tags },
    moveset: [...monster.moveset],
    effects: monster.effects.map((effect) => ({ ...effect })),
  };
}

function cloneState(state: RunState): RunState {
  return {
    ...state,
    party: state.party.map(cloneMonster),
    enemy: state.enemy ? cloneMonster(state.enemy) : null,
  };
}

function setWinState(state: RunState, message: string): RunState {
  return {
    ...state,
    money: state.money + WIN_REWARD,
    phase: 'shop',
    lastLog: message,
  };
}

function markDamage(monster: RuntimeMonster, damage: number): void {
  monster.hp = Math.max(0, monster.hp - damage);
  monster.fainted = monster.hp <= 0;
}

export function resolvePlayerMove(state: RunState, moveId: MoveId, variance = 1): RunState {
  const nextState = cloneState(state);
  const actor = nextState.party[nextState.activeIndex];
  const enemy = nextState.enemy;
  const move = MOVES[moveId];

  if (!actor || !enemy || !move) {
    return nextState;
  }

  const result = calculateDamage(actor, enemy, move, variance);
  markDamage(enemy, result.damage);
  applyEffects(actor, enemy, move.effects);

  if (enemy.hp <= 0) {
    return setWinState(nextState, `${enemy.name} was defeated.`);
  }

  let enemyLog = `${enemy.name} could not act.`;
  if (enemy.stunned) {
    enemy.stunned = false;
    enemyLog = `${enemy.name} is stunned.`;
  } else {
    const enemyMoveId = enemy.moveset[0];
    const enemyMove = enemyMoveId ? MOVES[enemyMoveId] : undefined;

    if (enemyMove) {
      const enemyResult = calculateDamage(enemy, actor, enemyMove, variance);
      markDamage(actor, enemyResult.damage);
      applyEffects(enemy, actor, enemyMove.effects);
      enemyLog = `${enemy.name} used ${enemyMove.name}.`;
    }
  }

  const actorEffectDamage = tickEffects(actor);
  const enemyEffectDamage = tickEffects(enemy);

  if (enemy.hp <= 0) {
    return setWinState(nextState, `${enemy.name} was defeated by ongoing effects.`);
  }

  if (actor.hp <= 0) {
    nextState.phase = 'defeat';
    nextState.lastLog = `${actor.name} collapsed.`;
    return nextState;
  }

  const effectLog = actorEffectDamage + enemyEffectDamage > 0 ? ' Ongoing effects dealt damage.' : '';
  nextState.phase = 'battle';
  nextState.lastLog = `${actor.name} used ${move.name}. ${enemyLog}${effectLog}`;
  return nextState;
}

export function resolveCapsuleAction(state: RunState, roll: number): RunState {
  const nextState = cloneState(state);
  const enemy = nextState.enemy;

  if (!enemy) {
    return nextState;
  }

  const result = tryCapture(enemy, nextState.capsules, roll);
  nextState.capsules = result.capsules;

  if (result.kind === 'captured') {
    const capturedData = MONSTERS.find((monster) => monster.id === enemy.templateId);
    if (!capturedData) {
      throw new Error(`Unknown captured monster: ${enemy.templateId}`);
    }

    nextState.party.push(createMonsterInstance(capturedData));
    return setWinState(nextState, `${enemy.name} was captured.`);
  }

  nextState.phase = 'battle';

  if (result.kind === 'blocked') {
    nextState.lastLog = `${enemy.name} cannot be captured.`;
    return nextState;
  }

  if (result.kind === 'noCapsules') {
    nextState.lastLog = 'No capsules remain.';
    return nextState;
  }

  nextState.lastLog = `${enemy.name} broke free.`;
  return nextState;
}