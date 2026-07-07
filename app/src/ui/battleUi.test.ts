import { describe, expect, it } from 'vitest';
import type { RuntimeMonster } from '../types/game';
import { effectLabels, formatMoveDetails, hpPct, statusSummary } from './battleUi';

function createMonster(overrides: Partial<RuntimeMonster> = {}): RuntimeMonster {
  return {
    templateId: 'strep',
    name: '화농성연쇄상구균',
    scientificName: 'Streptococcus pyogenes',
    category: '세균',
    glyph: '🔗',
    tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    maxHp: 44,
    hp: 22,
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
    ...overrides,
  };
}

describe('battle UI helpers', () => {
  it('formats move details with Korean combat labels', () => {
    expect(formatMoveDetails('streptokinase')).toEqual([
      '혈전융해',
      '타입: 조직융해',
      '위력: 11',
      '명중률: 92%',
      '혈전과 장벽을 무너뜨려 방어를 깎는다.',
      '확산하기 쉽게 숙주의 방어선을 흐린다.',
    ]);
  });

  it('returns hp percentage and effect labels for the unit panel', () => {
    const monster = createMonster({
      effects: [
        { kind: 'buff', stat: 'attack', pct: 25, turns: 2 },
        { kind: 'field', side: 'incoming', factor: 0.5, turns: 2 },
        { kind: 'invuln', turns: 1 },
        { kind: 'dot', power: 4, turns: 2 },
        { kind: 'convert', power: 6, turns: 99 },
      ],
    });

    expect(hpPct(monster)).toBe(0.5);
    expect(effectLabels(monster)).toEqual([
      '공격 25%',
      '피해감소',
      '잠복',
      '지속피해',
      '개종',
    ]);
    expect(statusSummary(monster)).toBe('상태: 공격 25%, 피해감소, 잠복, 지속피해, 개종');
  });

  it('uses a short fallback label when no status effects are active', () => {
    expect(statusSummary(createMonster())).toBe('상태: 정상');
  });
});