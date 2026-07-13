import { describe, expect, it } from 'vitest';
import { disclaimerBlinkDurationMs, disclaimerContent } from './disclaimerUi';

describe('disclaimer UI content', () => {
  it('shows a short non-commercial unfinished-project disclaimer before story', () => {
    const content = disclaimerContent();
    const copy = [content.title, ...content.lines].join(' ');

    expect(content.blinkEffect.mode).toBe('horizontal-curtain');
    expect(content.blinkEffect.initialHoldMs).toBe(1000);
    expect(content.durationMs).toBe(disclaimerBlinkDurationMs(content.blinkEffect));
    expect(content.blinkEffect.cycles.map((cycle) => cycle.openHoldMs)).toEqual([520, 390, 280, 190]);
    expect(content.blinkEffect.finalHoldMs).toBe(1000);
    expect(copy).toContain('상업적 이용을 금합니다');
    expect(copy).toContain('저작권');
    expect(copy).toContain('미완성');
    expect(copy).toContain('학습');
  });
});
