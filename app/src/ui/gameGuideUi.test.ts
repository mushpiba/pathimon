import { describe, expect, it } from 'vitest';
import { gameGuideContent, gameGuideLineLayout } from './gameGuideUi';

describe('game guide UI content', () => {
  it('summarizes the battle rules before mode selection', () => {
    const content = gameGuideContent();
    const text = content.sections.flatMap((section) => [section.title, ...section.lines]).join(' ');

    expect(content.title).toBe('전투 안내');
    expect(content.continueLabel).toBe('모드 선택');
    expect(text).toContain('기술 위력 × 공격/방어');
    expect(text).toContain('항상 병원체 패시몬이 먼저');
    expect(text).toContain('전용기는 전투당 한 번');
    expect(text).toContain('기침(2)');
    expect(text).toContain('봉인');
  });

  it('reserves fixed non-overlapping boxes for wrapped guide lines', () => {
    const layout = gameGuideLineLayout();

    expect(layout.lineHeight).toBeGreaterThanOrEqual(42);
    expect(layout.maxLines).toBe(2);
    expect(layout.secondLineOffset).toBeGreaterThanOrEqual(layout.lineHeight);
  });
});
