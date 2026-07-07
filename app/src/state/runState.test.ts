import { describe, expect, it } from 'vitest';
import { resolveCapsuleAction, resolvePlayerMove } from '../battle/turn';
import { MOVES } from '../data/moves';
import { STARTER_ID, TOTAL_FLOORS } from '../data/monsters';
import { advanceFromShop, createInitialRunState, enterBattle } from './runState';

describe('run state loop', () => {
  it('starts with one active starter and battle resources', () => {
    const state = createInitialRunState();

    expect(state.floor).toBe(1);
    expect(state.money).toBe(0);
    expect(state.capsules).toBe(3);
    expect(state.party[0].name).toBe('화농성연쇄상구균');
    expect(state.party[0].templateId).toBe(STARTER_ID);
    expect(state.phase).toBe('story');
  });

  it('enters a normal wild battle', () => {
    const state = enterBattle(createInitialRunState(), 1);

    expect(state.phase).toBe('battle');
    expect(state.enemy?.isBoss).toBe(false);
    expect(state.enemy?.scientificName).toBe('Staphylococcus aureus');
  });

  it('enters a boss intro at the final floor', () => {
    const state = createInitialRunState();
    state.floor = TOTAL_FLOORS;

    const result = enterBattle(state);

    expect(result.phase).toBe('bossIntro');
    expect(result.enemy?.isBoss).toBe(true);
    expect(result.enemy?.captureRate).toBe(0);
  });

  it('moves to shop and grants money after defeating the enemy', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.hp = 1;

    const result = resolvePlayerMove(battle, battle.party[0].moveset[0], 1);

    expect(result.phase).toBe('shop');
    expect(result.money).toBeGreaterThan(0);
  });

  it('captures a normal enemy and spends one capsule', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.hp = 1;

    const result = resolveCapsuleAction(battle, 0);

    expect(result.phase).toBe('shop');
    expect(result.capsules).toBe(2);
    expect(result.party.length).toBe(2);
  });

  it('does not spend capsules when capture is blocked against a boss', () => {
    const state = createInitialRunState();
    state.floor = TOTAL_FLOORS;
    const battle = enterBattle(state);

    const result = resolveCapsuleAction(battle, 0);

    expect(result.phase).toBe('battle');
    expect(result.capsules).toBe(3);
    expect(result.party).toHaveLength(1);
  });

  it('advances from shop to the next battle floor', () => {
    const state = createInitialRunState();
    state.phase = 'shop';

    const result = advanceFromShop(state);

    expect(result.floor).toBe(2);
    expect(result.phase).toBe('battle');
  });

  it('can expose move descriptions through move data', () => {
    expect(MOVES.streptokinase.description).toContain('혈전');
    expect(MOVES.streptokinase.learnText).toContain('확산');
  });
});