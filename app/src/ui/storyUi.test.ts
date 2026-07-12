import { describe, expect, it } from 'vitest';
import { storyPages } from './storyUi';

describe('story UI content', () => {
  it('uses the three requested story pages and visual beats', () => {
    const pages = storyPages();

    expect(pages).toHaveLength(3);
    expect(pages[0].lines[0]).toContain('서기 20000년');
    expect(pages[0].imagePath).toBe('images/story/war_page1.png');
    expect(pages[0].imageFrame).toBe('wide');
    expect(pages[1].lines.join(' ')).toContain('인하대학교 의과대학');
    expect(pages[1].imagePath).toBe('images/story/inha-logo.png');
    expect(pages[2].lines[0]).toBe('패시몬 캡슐.');
    expect(pages[2].imagePath).toBe('images/capsules/universal.png');
  });
});
