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
      lines: ['정비구역 없이 진행', '전투 시작마다 회복', '학습 피드백 강화'],
    },
    {
      kind: 'mode',
      value: 'challenge',
      label: '도전모드',
      lines: ['정비구역 이용', '자동 회복 없음', '자원 관리 중심'],
    },
    {
      kind: 'visualStyle',
      value: 'character',
      label: '캐릭터풍',
      lines: ['패시몬 몬스터풍', '기존 픽셀 감성'],
    },
    {
      kind: 'visualStyle',
      value: 'micro',
      label: '실사풍',
      lines: ['현미경 표본에 가까움', '학습 관찰감 우선'],
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
