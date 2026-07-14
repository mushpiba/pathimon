import { describe, expect, it } from 'vitest';
import { titleLogoStyle, titleScreenContent } from './titleUi';

describe('title UI content', () => {
  it('uses the infection and immunity title with sprite-backed sides', () => {
    const content = titleScreenContent({ random: () => 0 });

    expect(content.title).toBe('감염과 면역');
    expect(content.subtitle).toBe('100층에 도전하세요!');
    expect(content.startLabel).toBe('게임 시작');
    expect(content.pathimonSprites).toHaveLength(7);
    expect(content.pathimonSprites.every((path) => path.startsWith('images/pathimon/'))).toBe(true);
    expect(content.pathimonSprites.every((path) => path.endsWith('-front.png'))).toBe(true);
    expect(content.pathimonSprites).not.toEqual(expect.arrayContaining([
      'images/pathimon/influenza-front.png',
      'images/pathimon/cholera-front.png',
      'images/pathimon/candida-front.png',
      'images/pathimon/aspergillus-front.png',
      'images/pathimon/malaria-front.png',
      'images/pathimon/entamoeba-front.png',
    ]));
    expect(content.bossSprites.length).toBeGreaterThanOrEqual(6);
  });

  it('uses the supplied run boss roster for the six title-side boss previews', () => {
    const content = titleScreenContent({
      bossRosterIds: ['red', 'blue', 'giovanni', 'brock', 'koga', 'lance'],
    });

    expect(content.bossSprites).toEqual([
      'images/trainers/boss/red.png',
      'images/trainers/boss/blue.png',
      'images/trainers/boss/giovanni.png',
      'images/trainers/boss/brock.png',
      'images/trainers/boss/koga.png',
      'images/trainers/boss/lance.png',
    ]);
  });

  it('can roll different pathimon side previews without changing the fixed title copy', () => {
    const lowRoll = titleScreenContent({ random: () => 0 });
    const highRoll = titleScreenContent({ random: () => 0.99 });

    expect(lowRoll.pathimonSprites).toHaveLength(7);
    expect(highRoll.pathimonSprites).toHaveLength(7);
    expect(lowRoll.pathimonSprites).not.toEqual(highRoll.pathimonSprites);
    expect(lowRoll.title).toBe(highRoll.title);
    expect(lowRoll.startLabel).toBe(highRoll.startLabel);
  });

  it('lays out the title as a chunky two-line pixel logo', () => {
    const logo = titleLogoStyle('감염과 면역');

    expect(logo.canvas).toEqual({ width: 360, height: 150 });
    expect(logo.display).toEqual({ width: 640, height: 266, y: 214 });
    expect(logo.chunks.map((chunk) => chunk.text)).toEqual(['감염', '과', '면역']);
    expect(logo.chunks.map((chunk) => chunk.fill)).toEqual(['#8e36a6', '#ffb52b', '#2e88e6']);
    expect(logo.chunks[1].x - logo.chunks[0].x).toBeLessThanOrEqual(108);
    expect(logo.outline.glow).toBe('#91ffe8');
    expect(logo.decorations.length).toBeGreaterThanOrEqual(8);
  });
});
