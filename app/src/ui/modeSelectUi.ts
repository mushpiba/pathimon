import type { RunMode, VisualStyle } from '../types/game';

export type ModeSelectOption =
  | { kind: 'mode'; label: string; lines: string[]; value: RunMode }
  | { kind: 'visualStyle'; label: string; lines: string[]; value: VisualStyle };

export interface ModeSelectChoice {
  mode?: RunMode;
  visualStyle?: VisualStyle;
}

export function modeSelectButtonOptions(): ModeSelectOption[] {
  return [
    {
      kind: 'mode',
      value: 'learning',
      label: '학습모드',
      lines: ['정비구역 없이 진행', '자동 회복', '학습 피드백 강화'],
    },
    {
      kind: 'mode',
      value: 'challenge',
      label: '도전모드',
      lines: ['정비구역 등장', '회복 없음'],
    },
    {
      kind: 'visualStyle',
      value: 'character',
      label: '캐릭터풍',
      lines: [],
    },
    {
      kind: 'visualStyle',
      value: 'micro',
      label: '실사풍',
      lines: [],
    },
  ];
}

export function resolveModeSelectChoice(choice: ModeSelectChoice, option: ModeSelectOption): ModeSelectChoice {
  if (option.kind === 'mode') {
    return { ...choice, mode: option.value };
  }

  return { ...choice, visualStyle: option.value };
}

export function shouldStartRun(choice: ModeSelectChoice): choice is Required<ModeSelectChoice> {
  return Boolean(choice.mode && choice.visualStyle);
}
