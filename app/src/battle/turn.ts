import { tryCapture } from './capture';
import { calculateDamage } from './damage';
import { applyEffects } from './effects';
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

function markEnemyDamage(enemy: RuntimeMonster, damage: number): void {
  enemy.hp = Math.max(0, enemy.hp - damage);
  enemy.fainted = enemy.hp <= 0;
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
  markEnemyDamage(enemy, result.damage);
  applyEffects(actor, enemy, move.effects);

  if (enemy.hp <= 0) {
    return setWinState(nextState, `${enemy.name} was defeated.`);
  }

  nextState.phase = 'battle';
  nextState.lastLog = `${actor.name} used ${move.name}.`;
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