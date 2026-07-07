import { describe, expect, it } from 'vitest';
import { MOVES } from '../data/moves';
import type { EffectPrimitive, RuntimeMonster } from '../types/game';
import { tryCapture } from './capture';
import { calculateDamage } from './damage';
import { applyEffects, tickEffects } from './effects';
import { calculateMultiplier } from './effectiveness';
import { buildLoadout } from './loadout';

const attacker: RuntimeMonster = {
  templateId: 'strep',
  name: '화농성연쇄상구균',
  scientificName: 'Streptococcus pyogenes',
  category: '세균',
  glyph: '🔗',
  tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
  maxHp: 44,
  hp: 44,
  attack: 10,
  defense: 3,
  speed: 9,
  captureRate: 0.5,
  ability: 'comp_evade',
  moveset: ['streptokinase', 'hyaluronidase', 'enterotoxin', 'alpha_toxin'],
  effects: [],
  stunned: false,
  fainted: false,
  isBoss: false,
};

const capsuleTarget: RuntimeMonster = {
  ...attacker,
  templateId: 'staph',
  name: '황색포도알균',
  scientificName: 'Staphylococcus aureus',
  ability: 'capsule',
  captureRate: 0.42,
  hp: 10,
  maxHp: 46,
  moveset: ['tsst', 'alpha_toxin', 'pvl', 'hyaluronidase'],
};

function createMonster(overrides: Partial<RuntimeMonster> = {}): RuntimeMonster {
  const { effects, moveset, tags, ...rest } = overrides;

  return {
    ...attacker,
    ...rest,
    tags: {
      ...attacker.tags,
      ...tags,
    },
    moveset: moveset ?? [...attacker.moveset],
    effects: effects ? [...effects] : [],
  };
}

describe('battle engine', () => {
  it('builds four move slots with signature first', () => {
    const moves = buildLoadout({
      id: 'staph',
      name: '황색포도알균',
      scientificName: 'Staphylococcus aureus',
      category: '세균',
      glyph: '🟡',
      tags: { pathway: 'skin', wall: 'gram_positive', location: 'extracellular' },
      maxHp: 46,
      attack: 11,
      defense: 4,
      speed: 8,
      captureRate: 0.42,
      ability: 'proteinA',
      signature: 'tsst',
      learnset: ['alpha_toxin', 'pvl', 'hyaluronidase', 'coagulase', 'enterotoxin'],
    });

    expect(moves).toEqual(['tsst', 'alpha_toxin', 'pvl', 'hyaluronidase']);
  });

  it('combines type matchup and tag defense', () => {
    const defender: RuntimeMonster = {
      ...capsuleTarget,
      ability: 'mask',
      tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    };

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
    expect(result.notes).toContain('점액섬모가 호흡기 태그를 반감했다');
  });

  it('calculates deterministic damage with the exact formula and fixed variance', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(17);
    expect(result.multiplier.total).toBe(1);
    expect(result.blockedByInvulnerability).toBe(false);
  });

  it('returns zero damage for zero-power moves', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.coagulase, 1);

    expect(result.damage).toBe(0);
    expect(result.blockedByInvulnerability).toBe(false);
  });

  it('returns zero damage and marks invulnerability blocks', () => {
    const defender = createMonster({
      effects: [{ kind: 'invuln', turns: 1 }],
    });

    const result = calculateDamage(attacker, defender, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(0);
    expect(result.blockedByInvulnerability).toBe(true);
  });

  it('applies incoming field factors to damage', () => {
    const defender = createMonster({
      effects: [{ kind: 'field', side: 'incoming', factor: 0.5, turns: 2 }],
    });

    const result = calculateDamage(attacker, defender, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(9);
  });

  it('blocks capsule capture against bosses', () => {
    const result = tryCapture({ ...capsuleTarget, isBoss: true }, 3, 0.1);

    expect(result.kind).toBe('blocked');
    expect(result.capsules).toBe(3);
  });

  it('preserves zero capsules on no-capsule capture attempts', () => {
    const result = tryCapture(capsuleTarget, 0, 0.1);

    expect(result.kind).toBe('noCapsules');
    expect(result.capsules).toBe(0);
  });

  it('uses hp loss to improve capsule capture chance', () => {
    const result = tryCapture(capsuleTarget, 2, 0.6);

    expect(result.kind).toBe('captured');
    expect(result.capsules).toBe(1);
  });

  it('spends exactly one capsule and reports missed captures', () => {
    const result = tryCapture(capsuleTarget, 2, 0.95);

    expect(result.kind).toBe('missed');
    expect(result.capsules).toBe(1);
  });

  it('adds the lysozyme note for gram-positive attackers', () => {
    const defender = createMonster({
      ability: 'lysozyme',
    });

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
    expect(result.notes).toContain('라이소자임이 그람양성 태그를 반감했다');
  });

  it('clamps the type-table portion of multipliers to three', () => {
    const defender = createMonster({
      ability: 'acidfast',
      tags: { pathway: 'skin', wall: 'gram_positive', location: 'intracellular' },
    });

    const result = calculateMultiplier(MOVES.m_th1, attacker, defender);

    expect(result.total).toBe(3);
  });

  it('applies buff, field, heal, invuln, dot, and convert primitives', () => {
    const user = createMonster({ hp: 20 });
    const enemy = createMonster({ hp: 12 });
    const effects: EffectPrimitive[] = [
      { kind: 'buff', stat: 'attack', pct: 25, turns: 2, target: 'self' },
      { kind: 'field', side: 'incoming', factor: 0.5, turns: 3, target: 'enemy' },
      { kind: 'heal', pct: 50, target: 'self' },
      { kind: 'invuln', turns: 1, target: 'enemy' },
      { kind: 'dot', power: 4, turns: 2, target: 'enemy' },
      { kind: 'convert', power: 6, target: 'enemy' },
    ];

    applyEffects(user, enemy, effects);

    expect(user.hp).toBe(42);
    expect(user.effects).toEqual([{ kind: 'buff', stat: 'attack', pct: 25, turns: 2 }]);
    expect(enemy.effects).toEqual([
      { kind: 'field', side: 'incoming', factor: 0.5, turns: 3 },
      { kind: 'invuln', turns: 1 },
      { kind: 'dot', power: 4, turns: 2 },
      { kind: 'convert', power: 6, turns: 99 },
    ]);
  });

  it('ticks damage-over-time effects, expires timed effects, and grows convert each tick', () => {
    const monster = createMonster({
      hp: 30,
      effects: [
        { kind: 'dot', power: 4, turns: 2 },
        { kind: 'field', side: 'incoming', factor: 0.5, turns: 1 },
        { kind: 'invuln', turns: 1 },
        { kind: 'buff', stat: 'defense', pct: 50, turns: 3 },
        { kind: 'convert', power: 6, turns: 99 },
      ],
    });

    const damage = tickEffects(monster);

    expect(damage).toBe(10);
    expect(monster.hp).toBe(20);
    expect(monster.effects).toEqual([
      { kind: 'dot', power: 4, turns: 1 },
      { kind: 'buff', stat: 'defense', pct: 50, turns: 2 },
      { kind: 'convert', power: 9, turns: 98 },
    ]);
  });
});