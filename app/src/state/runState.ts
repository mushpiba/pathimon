import { TOTAL_FLOORS, MONSTERS, STARTER_ID } from '../data/monsters';
import type { MonsterData, RunState, RuntimeMonster } from '../types/game';
import { createBossInstance, createMonsterInstance } from './factory';

function cloneMonster(monster: RuntimeMonster): RuntimeMonster {
  return {
    ...monster,
    tags: { ...monster.tags },
    moveset: [...monster.moveset],
    effects: monster.effects.map((effect) => ({ ...effect })),
  };
}

function healMonster(monster: RuntimeMonster): RuntimeMonster {
  return {
    ...cloneMonster(monster),
    hp: monster.maxHp,
    effects: [],
    stunned: false,
    fainted: false,
  };
}

function selectWildMonster(enemyIndex: number | undefined, floor: number): MonsterData {
  const wildRoster = MONSTERS.filter((monster) => monster.id !== STARTER_ID);
  const indexedMonster = enemyIndex === undefined ? undefined : MONSTERS[enemyIndex];

  if (indexedMonster && indexedMonster.id !== STARTER_ID) {
    return indexedMonster;
  }

  const rosterIndex = enemyIndex === undefined ? floor - 1 : enemyIndex;
  return wildRoster[rosterIndex % wildRoster.length];
}

export function createInitialRunState(): RunState {
  const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);
  if (!starter) {
    throw new Error('starter missing');
  }

  return {
    floor: 1,
    money: 0,
    capsules: 3,
    party: [createMonsterInstance(starter)],
    activeIndex: 0,
    enemy: null,
    phase: 'story',
    lastLog: '',
  };
}

export function enterBattle(state: RunState, enemyIndex?: number): RunState {
  const nextState: RunState = {
    ...state,
    party: state.party.map(cloneMonster),
    enemy: null,
  };

  if (nextState.floor >= TOTAL_FLOORS) {
    nextState.enemy = createBossInstance(enemyIndex);
    nextState.phase = 'bossIntro';
    nextState.lastLog = `${nextState.enemy.name} appears.`;
    return nextState;
  }

  const enemyData = selectWildMonster(enemyIndex, nextState.floor);
  nextState.enemy = createMonsterInstance(enemyData);
  nextState.phase = 'battle';
  nextState.lastLog = `${nextState.enemy.name} appears.`;
  return nextState;
}

export function advanceFromShop(state: RunState): RunState {
  const healedState: RunState = {
    ...state,
    floor: state.floor + 1,
    activeIndex: 0,
    party: state.party.map(healMonster),
    enemy: null,
    phase: 'story',
    lastLog: 'The party is ready for the next floor.',
  };

  return enterBattle(healedState);
}