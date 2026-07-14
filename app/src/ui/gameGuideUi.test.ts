import { describe, expect, it } from 'vitest';
import { gameGuideContent, gameGuideLineLayout } from './gameGuideUi';

describe('game guide UI content', () => {
  it('summarizes the battle rules before mode selection', () => {
    const content = gameGuideContent();
    const text = content.sections.flatMap((section) => [section.title, ...section.lines]).join(' ');

    expect(content.title).toBe('전투 안내');
    expect(content.continueLabel).toBe('모드 선택');
    expect(text).toContain('데미지 공식은 포켓몬 본가 시리즈를 따릅니다.');
    expect(text).toContain('직접 처치 4배, 증상/태그 처치 2배');
    expect(text).toContain('항상 패시몬이 먼저');
    expect(text).not.toContain('항상 병원체 패시몬이');
    expect(text).toContain('이상한 사탕으로 해금됩니다.');
    expect(text).toContain('상태이상은 실제로 전투에 영향을 끼치고');
    expect(text).toContain('증상은 텍스트만 표기됩니다.');
    expect(text).toContain('상태이상을 누적시켜 전투를 승리로 이끌어보세요!');
    expect(text).toContain('두 가지 처치기를 예고하고 사용합니다.');
    expect(text).not.toContain('대처 기술');
    expect(text).not.toContain('봉인');
  });

  it('reserves fixed non-overlapping boxes for wrapped guide lines', () => {
    const layout = gameGuideLineLayout();

    expect(layout.lineHeight).toBeGreaterThanOrEqual(42);
    expect(layout.maxLines).toBe(2);
    expect(layout.secondLineOffset).toBeGreaterThanOrEqual(layout.lineHeight);
  });
});
