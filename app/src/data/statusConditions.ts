import type { RuntimeMonster, StatusConditionId } from '../types/game';

export interface StatusConditionData {
  effect: string;
  id: StatusConditionId;
  label: string;
}

export const STATUS_CONDITION_IDS: StatusConditionId[] = [
  'fever',
  'dehydration',
  'fatigue',
  'vomiting',
  'excretory_dysfunction',
  'cough',
  'blood_pressure',
  'dyspnea',
  'edema',
  'neurologic',
  'paralysis',
  'bleeding',
  'immune_abnormal',
  'necrosis',
  'blindness',
  'hearing_abnormal',
  'pain',
  'itching',
  'jaundice',
];

export const STATUS_CONDITIONS: Record<StatusConditionId, StatusConditionData> = {
  fever: { id: 'fever', label: '발열', effect: '매 턴 최대 체력 2% 피해' },
  dehydration: { id: 'dehydration', label: '탈수', effect: '받는 직접 피해 10% 증가' },
  fatigue: { id: 'fatigue', label: '피로', effect: '공격력 10% 감소' },
  vomiting: { id: 'vomiting', label: '구토', effect: '체력 회복량 10% 감소' },
  excretory_dysfunction: { id: 'excretory_dysfunction', label: '배설 이상', effect: '턴 종료 시 20% 확률로 탈수 1스택 추가' },
  cough: { id: 'cough', label: '기침', effect: '보스가 공격할 때마다 현재 체력 2% 피해' },
  blood_pressure: { id: 'blood_pressure', label: '혈압 이상', effect: '상태이상으로 받는 피해 10% 증가' },
  dyspnea: { id: 'dyspnea', label: '호흡 곤란', effect: '즉사 확률 1% 증가' },
  edema: { id: 'edema', label: '부종', effect: '모든 상태이상의 확률 1%p 증가' },
  neurologic: { id: 'neurologic', label: '신경 이상', effect: '혼란 확률 10%p 증가' },
  paralysis: { id: 'paralysis', label: '마비', effect: '마비 확률 5%p 증가' },
  bleeding: { id: 'bleeding', label: '출혈', effect: '매 턴 현재 체력 2% 피해' },
  immune_abnormal: { id: 'immune_abnormal', label: '면역 이상', effect: '2스택마다 방어 특성 1개 무력화' },
  necrosis: { id: 'necrosis', label: '괴사', effect: '최대 체력 상한 5% 감소' },
  blindness: { id: 'blindness', label: '시력 이상', effect: '명중률 25% 감소' },
  hearing_abnormal: { id: 'hearing_abnormal', label: '청력 이상', effect: '명중률 25% 감소' },
  pain: { id: 'pain', label: '통증', effect: '매 턴 최대 체력 2% 피해' },
  itching: { id: 'itching', label: '가려움', effect: '마비 확률 2%p 증가' },
  jaundice: { id: 'jaundice', label: '황달', effect: '받는 직접 피해 5% 증가' },
};

function clampChance(chance: number): number {
  return Math.max(0, Math.min(1, chance));
}

export function statusConditionStacks(monster: RuntimeMonster, id: StatusConditionId): number {
  return monster.statusConditions?.[id] ?? 0;
}

export function hasStatusConditions(monster: RuntimeMonster): boolean {
  return STATUS_CONDITION_IDS.some((id) => statusConditionStacks(monster, id) > 0);
}

export function addStatusCondition(monster: RuntimeMonster, id: StatusConditionId, stacks = 1): void {
  if (stacks <= 0) {
    return;
  }

  monster.statusConditions = {
    ...(monster.statusConditions ?? {}),
    [id]: statusConditionStacks(monster, id) + stacks,
  };

  clampHpToEffectiveMax(monster);
}

export function statusConditionLabels(monster: RuntimeMonster): string[] {
  return STATUS_CONDITION_IDS
    .map((id) => {
      const stacks = statusConditionStacks(monster, id);
      if (stacks <= 0) return undefined;
      const label = STATUS_CONDITIONS[id].label;
      return stacks > 1 ? `${label}(${stacks})` : label;
    })
    .filter((label): label is string => Boolean(label));
}

export function effectiveMaxHp(monster: RuntimeMonster): number {
  const necrosisStacks = statusConditionStacks(monster, 'necrosis');
  return Math.max(1, Math.floor(monster.maxHp * Math.max(0.01, 1 - necrosisStacks * 0.05)));
}

export function clampHpToEffectiveMax(monster: RuntimeMonster): void {
  monster.hp = Math.max(0, Math.min(effectiveMaxHp(monster), monster.hp));
  monster.fainted = monster.hp <= 0;
}

export function directDamageMultiplier(monster: RuntimeMonster): number {
  return 1 + statusConditionStacks(monster, 'dehydration') * 0.1 + statusConditionStacks(monster, 'jaundice') * 0.05;
}

export function statusDamageMultiplier(monster: RuntimeMonster): number {
  return 1 + statusConditionStacks(monster, 'blood_pressure') * 0.1;
}

export function attackStatMultiplier(monster: RuntimeMonster): number {
  return Math.max(0.1, 1 - statusConditionStacks(monster, 'fatigue') * 0.1);
}

export function healingMultiplier(monster: RuntimeMonster): number {
  return Math.max(0, 1 - statusConditionStacks(monster, 'vomiting') * 0.1);
}

export function statusChanceBonus(monster: RuntimeMonster, status?: 'confusion' | 'stun'): number {
  let bonus = statusConditionStacks(monster, 'edema') * 0.01;
  if (status === 'confusion') bonus += statusConditionStacks(monster, 'neurologic') * 0.1;
  if (status === 'stun') bonus += statusConditionStacks(monster, 'paralysis') * 0.05 + statusConditionStacks(monster, 'itching') * 0.02;
  return bonus;
}

export function adjustedStatusChance(monster: RuntimeMonster, baseChance: number, status?: 'confusion' | 'stun'): number {
  return clampChance(baseChance + statusChanceBonus(monster, status));
}
