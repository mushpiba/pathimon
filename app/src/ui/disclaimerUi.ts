export interface DisclaimerContent {
  blinkEffect: DisclaimerBlinkEffect;
  durationMs: number;
  lines: string[];
  title: string;
}

export interface DisclaimerBlinkCycle {
  closedMs: number;
  closeMs: number;
  openHoldMs: number;
  openMs: number;
}

export interface DisclaimerBlinkEffect {
  cycles: DisclaimerBlinkCycle[];
  finalCloseMs: number;
  finalHoldMs: number;
  initialHoldMs: number;
  mode: 'horizontal-curtain';
}

export function disclaimerBlinkDurationMs(effect: DisclaimerBlinkEffect): number {
  return effect.initialHoldMs
    + effect.cycles.reduce((sum, cycle) => sum + cycle.closeMs + cycle.closedMs + cycle.openMs + cycle.openHoldMs, 0)
    + effect.finalCloseMs
    + effect.finalHoldMs;
}

export function disclaimerContent(): DisclaimerContent {
  const blinkEffect: DisclaimerBlinkEffect = {
    mode: 'horizontal-curtain',
    initialHoldMs: 1500,
    cycles: [
      { closeMs: 200, closedMs: 80, openMs: 120, openHoldMs: 800 },
      { closeMs: 350, closedMs: 200, openMs: 180, openHoldMs: 400 },
      { closeMs: 500, closedMs: 400, openMs: 250, openHoldMs: 150 },
    ],
    finalCloseMs: 800,
    finalHoldMs: 1200,
  };

  return {
    blinkEffect,
    durationMs: disclaimerBlinkDurationMs(blinkEffect),
    title: '면책조항',
    lines: [
      '이 게임은 비상업적 학습용 미완성 프로토타입입니다.',
      '이 게임의 상업적 이용을 금합니다.',
      '저작권, 상표권, 라이선스 관련 문제는 전혀 해결되지 않았으며 임시 자산은 교체될 수 있습니다.',
      '의학 정보는 학습을 돕기 위해 단순화된 표현이며 진단이나 치료 목적이 아닙니다.',
    ],
  };
}
