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
  it('builds countermeasure profiles from direct and symptom/tag note data', () => {
    const profile = createBossDefenseProfile(createMonster({
      countermeasures: {
        direct: ['알벤다졸'],
        symptomTags: ['탈수', '장관기생'],
      },
    } as Partial<RuntimeMonster>)) as any;

    expect(profile.direct).toEqual(['알벤다졸']);
    expect(profile.symptomTags).toEqual(['탈수', '장관기생']);
  });

  it('uses direct treatment as 4x, symptom/tag treatment as 2x, and unrelated moves as 1x', () => {
    const profile = createBossDefenseProfile(createMonster({
      countermeasures: {
        direct: ['알벤다졸'],
        symptomTags: ['탈수', '장관기생'],
      },
    } as Partial<RuntimeMonster>));
    const directMove = { ...MOVES.m_anthelmintic, targetTags: ['알벤다졸', '선충'] };
    const symptomMove = { ...MOVES.m_th2, targetTags: ['탈수', '구토'] };
    const unrelatedMove = { ...MOVES.m_interferon, targetTags: ['바이러스'] };

    expect(bossMoveEffectiveness(directMove, profile)).toMatchObject({
      kind: 'super',
      multiplier: 4,
      matchedTags: ['알벤다졸'],
    });
    expect(bossMoveEffectiveness(symptomMove, profile)).toMatchObject({
      kind: 'effective',
      multiplier: 2,
      matchedTags: ['탈수'],
    });
    expect(bossMoveEffectiveness(unrelatedMove, profile)).toMatchObject({
      kind: 'normal',
      multiplier: 1,
      matchedTags: [],
    });
  });

  it('splits move selection evenly between 4x, 2x, and 1x groups', () => {
    // 알벤다졸=×4(구충제), 발열=×2(해열제 대증), m_antibody=×1(무관). 세 그룹을 1/3씩 뽑는다.
    const profile = createBossDefenseProfile(createMonster({
      countermeasures: {
        direct: ['알벤다졸'],
        symptomTags: ['발열'],
      },
    } as Partial<RuntimeMonster>));
    const moveIds = ['m_anthelmintic', 'm_antipyretic', 'm_antibody'] as const;

    expect(chooseBossMove([...moveIds], profile, [], () => 0.1)).toBe('m_anthelmintic');
    expect(chooseBossMove([...moveIds], profile, [], () => 0.4)).toBe('m_antipyretic');
    expect(chooseBossMove([...moveIds], profile, [], () => 0.9)).toBe('m_antibody');
  });
});
