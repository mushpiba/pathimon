import { describe, expect, it } from 'vitest';
import modeSelectSceneSource from './ModeSelectScene.ts?raw';

describe('ModeSelectScene copy', () => {
  it('uses concise mode and visual-style labels without helper hints', () => {
    expect(modeSelectSceneSource).toContain('진행 방식과 표현 방식을 선택합니다.');
    expect(modeSelectSceneSource).toContain('진행 방식');
    expect(modeSelectSceneSource).not.toContain('학습 핵심:');
    expect(modeSelectSceneSource).not.toContain('진행 모드');
    expect(modeSelectSceneSource).not.toContain('진행 모드와 표현 방식을 모두 선택하면 시작합니다.');
  });
});
