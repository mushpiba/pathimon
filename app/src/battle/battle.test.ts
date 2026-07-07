import { describe, expect, it } from 'vitest';
import { MOVES } from '../data/moves';
import type { RuntimeMonster } from '../types/game';
import { tryCapture } from './capture';
import { calculateDamage } from './damage';
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

  it('calculates deterministic damage with fixed variance', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1);

    expect(result.damage).toBeGreaterThan(0);
    expect(result.multiplier.total).toBe(1);
  });

  it('blocks capsule capture against bosses', () => {
    const result = tryCapture({ ...capsuleTarget, isBoss: true }, 3, 0.1);

    expect(result.kind).toBe('blocked');
    expect(result.capsules).toBe(3);
  });

  it('uses hp loss to improve capsule capture chance', () => {
    const result = tryCapture(capsuleTarget, 2, 0.6);

    expect(result.kind).toBe('captured');
    expect(result.capsules).toBe(1);
  });
});
