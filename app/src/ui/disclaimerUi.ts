export interface DisclaimerContent {
  durationMs: number;
  lines: string[];
  title: string;
}

export function disclaimerContent(): DisclaimerContent {
  return {
    durationMs: 700,
    title: '면책조항',
    lines: [
      '이 게임은 비상업적 학습용 미완성 프로토타입입니다.',
      '이 게임의 상업적 이용을 금합니다.',
      '저작권, 상표권, 라이선스 관련 문제는 전혀 해결되지 않았으며 임시 자산은 교체될 수 있습니다.',
      '의학 정보는 학습을 돕기 위해 단순화된 표현이며 진단이나 치료 목적이 아닙니다.',
    ],
  };
}
