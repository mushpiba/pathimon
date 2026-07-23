import { describe, expect, it } from 'vitest';
import {
  modeSelectButtonOptions,
  resolveModeSelectChoice,
  shouldStartRun,
} from './modeSelectUi';

describe('mode select UI helpers', () => {
  it('shows two run modes and two visual styles as four selectable buttons', () => {
    const options = modeSelectButtonOptions();

    expect(options.map((option) => option.label)).toEqual([
      '학습모드',
      '도전모드',
      '캐릭터풍',
      '실사풍',
    ]);
    const copy = options.flatMap((option) => option.lines).join(' ');
    expect(copy).toContain('자동 회복');
    expect(copy).toContain('정비구역 등장');
    expect(copy).toContain('회복 없음');
    expect(copy).not.toContain('전투 화면 가독성 우선');
    expect(copy).not.toContain('캐릭터화 최소화');
    expect(copy).not.toContain('패시몬 몬스터풍');
    expect(copy).not.toContain('현미경 표본에 가까움');
  });

  it('does not start until both a run mode and a visual style are selected', () => {
    const options = modeSelectButtonOptions();
    const learning = options.find((option) => option.kind === 'mode' && option.value === 'learning');
    const micro = options.find((option) => option.kind === 'visualStyle' && option.value === 'micro');
    if (!learning || !micro) throw new Error('mode select options missing');

    const modeOnly = resolveModeSelectChoice({}, learning);
    expect(modeOnly).toEqual({ mode: 'learning' });
    expect(shouldStartRun(modeOnly)).toBe(false);

    const complete = resolveModeSelectChoice(modeOnly, micro);
    expect(complete).toEqual({ mode: 'learning', visualStyle: 'micro' });
    expect(shouldStartRun(complete)).toBe(true);
  });
});
