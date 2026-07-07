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

  it('captures a fresh party member instead of the damaged battle clone', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.hp = 1;
    battle.enemy.effects.push({ kind: 'dot', power: 4, turns: 2 });
    battle.enemy.stunned = true;
    battle.enemy.fainted = true;

    const result = resolveCapsuleAction(battle, 0);
    const captured = result.party[1];

    expect(captured.hp).toBe(captured.maxHp);
    expect(captured.effects).toEqual([]);
    expect(captured.stunned).toBe(false);
    expect(captured.fainted).toBe(false);
  });

  it('applies confusion from enterotoxin when status chance is deterministic', () => {
    const originalEffects = MOVES.enterotoxin.effects;
    MOVES.enterotoxin.effects = [
      { kind: 'status', status: 'confusion', chance: 1, turns: 2, target: 'enemy' },
    ];

    try {
      const battle = enterBattle(createInitialRunState(), 1);
      const result = resolvePlayerMove(battle, 'enterotoxin', 1);

      expect(result.enemy?.effects).toContainEqual({ kind: 'confusion', turns: 1 });
    } finally {
      MOVES.enterotoxin.effects = originalEffects;
    }
  });

  it('lets a surviving enemy take a turn after the player acts', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    const startingHp = battle.party[0].hp;

    const result = resolvePlayerMove(battle, 'coagulase', 1);

    expect(result.phase).toBe('battle');
    expect(result.party[0].hp).toBeLessThan(startingHp);
    expect(result.lastLog).toContain('황색포도알균 used');
  });

  it('ticks round-end effects after both sides act', () => {
    const battle = enterBattle(createInitialRunState(), 1);
    if (!battle.enemy) throw new Error('enemy missing');
    battle.enemy.effects.push({ kind: 'dot', power: 4, turns: 2 });
    const startingEnemyHp = battle.enemy.hp;

    const result = resolvePlayerMove(battle, 'coagulase', 1);

    expect(result.enemy?.hp).toBe(startingEnemyHp - 4);
    expect(result.enemy?.effects).toContainEqual({ kind: 'dot', power: 4, turns: 1 });
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