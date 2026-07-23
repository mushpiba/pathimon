import { describe, expect, it } from 'vitest';
import type { RuntimeMonster } from '../types/game';
import { randomLearningPoint } from './learning';

function monsterWithLearningPoints(points?: string[]): RuntimeMonster {
  return {
    templateId: 'test',
    name: '테스트몬',
    scientificName: 'Testimon example',
    category: '세균',
    glyph: 'TST',
    tags: {},
    maxHp: 60,
    hp: 60,
    attack: 60,
    defense: 60,
    speed: 1,
    captureRate: 0.5,
    ability: 'none',
    abilities: [],
    moveset: [],
    profileMemo: points,
    effects: [],
    statusConditions: {},
    stunned: false,
    fainted: false,
    isBoss: false,
  };
}

describe('learning points', () => {
  it('selects one numbered learning point with an injected random roll', () => {
    const monster = monsterWithLearningPoints([
      'L1 [감별점] 첫 번째 포인트',
      'L2 [기전] 두 번째 포인트',
      'L3 [치료] 세 번째 포인트',
    ]);

    expect(randomLearningPoint(monster, () => 0)).toBe('L1 [감별점] 첫 번째 포인트');
    expect(randomLearningPoint(monster, () => 0.99)).toBe('L3 [치료] 세 번째 포인트');
  });

  it('ignores blank lines and falls back when no learning point exists', () => {
    const monster = monsterWithLearningPoints(['', '  ', 'L1 [감별점] 유효한 포인트']);
    const emptyMonster = monsterWithLearningPoints();

    expect(randomLearningPoint(monster, () => 0.5)).toBe('L1 [감별점] 유효한 포인트');
    expect(randomLearningPoint(emptyMonster, () => 0.5)).toBe('');
  });
});
