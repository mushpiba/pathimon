export interface GameGuideSection {
  title: string;
  lines: string[];
}

export interface GameGuideContent {
  title: string;
  subtitle: string;
  sections: GameGuideSection[];
  continueLabel: string;
}

export interface GameGuideLineLayout {
  lineHeight: number;
  maxLines: number;
  secondLineOffset: number;
}

export function gameGuideLineLayout(): GameGuideLineLayout {
  return {
    lineHeight: 46,
    maxLines: 2,
    secondLineOffset: 46,
  };
}

export function gameGuideContent(): GameGuideContent {
  return {
    title: '전투 안내',
    subtitle: '모드 선택 전에 핵심 규칙을 확인하세요.',
    continueLabel: '모드 선택',
    sections: [
      {
        title: '피해 계산',
        lines: [
          '피해량은 기술 위력 × 공격/방어 × 난수(0.85~1) × 상성으로 계산됩니다.',
          '상성은 효과 굉장 2배, 보통 1배, 무효 0배로 반영됩니다.',
        ],
      },
      {
        title: '행동 순서',
        lines: [
          '전투에서는 항상 병원체 패시몬이 먼저 행동합니다.',
          '상대의 공격 타입과 내 패시몬의 방어특성을 읽고 교체 타이밍을 잡는 것이 중요합니다.',
        ],
      },
      {
        title: '기술과 봉인',
        lines: [
          '기술은 준비기, 공격기, 전용기로 나뉩니다.',
          '전용기는 전투당 한 번만 사용할 수 있으며, 도전모드에서는 이상한 사탕으로 해금합니다.',
          '보스 공격이 방어특성에 막혀 무효가 되면 그 기술은 봉인됩니다.',
        ],
      },
      {
        title: '상태와 증상',
        lines: [
          '상태이상과 증상은 누적되며 같은 항목은 기침(2)처럼 표시됩니다.',
          '보스의 네 기술이 모두 봉인되면 보스는 1턴 동안 재정비하고 새 기술을 준비합니다.',
        ],
      },
    ],
  };
}
