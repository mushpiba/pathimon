import { describe, expect, it } from 'vitest';
import { disclaimerContent } from './disclaimerUi';

describe('disclaimer UI content', () => {
  it('shows a short non-commercial unfinished-project disclaimer before story', () => {
    const content = disclaimerContent();
    const copy = [content.title, ...content.lines].join(' ');

    expect(content.durationMs).toBe(700);
    expect(copy).toContain('상업적 이용을 금합니다');
    expect(copy).toContain('저작권');
    expect(copy).toContain('미완성');
    expect(copy).toContain('학습');
  });
});
