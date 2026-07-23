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
          '데미지 공식은 포켓몬 본가 시리즈를 따릅니다.',
          '적의 공격은 직접적인 처치 4배, 간접적인 처치 2배, 무관한 처치 1배로 반영됩니다.',
        ],
      },
      {
        title: '행동 순서',
        lines: [
          '전투에서는 항상 패시몬이 먼저 행동합니다.',
          '상대가 예고한 처치와 내 패시몬을 비교하여 교체 타이밍을 잡는 것이 중요합니다.',
        ],
      },
      {
        title: '기술과 예고',
        lines: [
          '패시몬의 기술은 준비기, 공격기, 전용기로 나뉘며 전용기는 전투당 한 번만 사용할 수 있습니다.',
          '도전모드에서는 이상한 사탕으로 해금됩니다.',
          '보스는 체력이 절반 이하가 되면 한 턴에 두 가지 처치를 예고하고 사용합니다.',
        ],
      },
      {
        title: '상태와 증상',
        lines: [
          '상태이상과 증상은 누적되며, 상태이상은 실제로 전투에 영향을 끼치고, 증상은 텍스트만 표기됩니다.',
          '상태이상을 누적시켜 전투를 승리로 이끌어보세요!',
        ],
      },
    ],
  };
}
