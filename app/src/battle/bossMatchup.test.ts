import { describe, expect, it } from 'vitest';
import { MOVES } from '../data/moves';
import type { RuntimeMonster } from '../types/game';
import { bossMoveEffectiveness, chooseBossMove, createBossDefenseProfile } from './bossMatchup';

function createMonster(overrides: Partial<RuntimeMonster> = {}): RuntimeMonster {
  return {
    templateId: 'test',
    name: '테스트몬',
    scientificName: 'Test pathogen',
    category: '세균',
    glyph: 'TST',
    tags: { wall: 'gram_positive', location: 'extracellular', size: 'microscopic' },
    maxHp: 100,
    hp: 100,
    attack: 10,
    defense: 5,
    speed: 5,
    captureRate: 0.4,
    ability: 'none',
    abilities: [],
    moveset: ['alpha_toxin'],
    moveSlots: ['alpha_toxin', null, null, null],
    moveStages: {},
    effects: [],
    statusConditions: {},
    stunned: false,
    fainted: false,
    isBoss: false,
    ...overrides,
  };
}

describe('boss attack matchup', () => {
  it('builds defense profiles from explicit traits, tags, category, and derived traits', () => {
    const profile = createBossDefenseProfile(createMonster({
      ability: 'capsule',
      abilities: ['capsule'],
      moveset: ['anthrax_toxin'],
      tags: { wall: 'gram_positive', location: 'extracellular', size: 'microscopic' },
    }));

    expect(profile.traits).toEqual(expect.arrayContaining([
      'capsule',
      'gram_positive',
      'extracellular',
      'category_bacteria',
      'bacterial_cell_wall',
      'toxin_axis',
    ]));
  });

  it('uses only none, normal, and super effectiveness for boss attacks', () => {
    const capsuleProfile = createBossDefenseProfile(createMonster({ ability: 'capsule', abilities: ['capsule'] }));
    const viralProfile = createBossDefenseProfile(createMonster({
      category: '바이러스',
      tags: { wall: 'enveloped_virus', location: 'intracellular_cytosol', size: 'microscopic' },
      ability: 'antigen_var',
      abilities: ['antigen_var'],
    }));

    expect(bossMoveEffectiveness(MOVES.m_phago, capsuleProfile).kind).toBe('none');
    expect(bossMoveEffectiveness(MOVES.m_opsonin, capsuleProfile).kind).toBe('super');
    expect(bossMoveEffectiveness(MOVES.m_interferon, viralProfile).kind).toBe('super');
    expect(bossMoveEffectiveness(MOVES.m_cell_wall_inhibitor, viralProfile).kind).toBe('none');
  });

  it('chooses a super-effective unsealed boss move before neutral options', () => {
    const profile = createBossDefenseProfile(createMonster({ ability: 'capsule', abilities: ['capsule'] }));
    const moveId = chooseBossMove(['m_phago', 'm_opsonin', 'm_antibody'], profile, [], () => 0);

    expect(moveId).toBe('m_opsonin');
  });
});
