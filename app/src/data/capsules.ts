import type { CapsuleId, CapsuleInventory, RuntimeMonster } from '../types/game';

export const CAPSULE_ORDER: CapsuleId[] = ['universal', 'virus', 'bacteria', 'parasite', 'fungus', 'protozoa', 'prion'];

export const CAPSULE_LABELS: Record<CapsuleId, string> = {
  universal: '만능 캡슐',
  virus: '바이러스 캡슐',
  bacteria: '세균 캡슐',
  parasite: '기생충 캡슐',
  fungus: '진균 캡슐',
  protozoa: '원생동물 캡슐',
  prion: '프리온 캡슐',
};

export const CAPSULE_SHORT_LABELS: Record<CapsuleId, string> = {
  universal: '만능',
  virus: '바이러스',
  bacteria: '세균',
  parasite: '기생충',
  fungus: '진균',
  protozoa: '원생동물',
  prion: '프리온',
};

const CAPSULE_CATEGORIES: Partial<Record<CapsuleId, string[]>> = {
  virus: ['바이러스'],
  bacteria: ['세균'],
  parasite: ['연충', '기생충'],
  fungus: ['진균'],
  protozoa: ['원충', '원생동물'],
  prion: ['프리온'],
};

export function createInitialCapsuleInventory(): CapsuleInventory {
  return {
    universal: 4,
    virus: 0,
    bacteria: 0,
    parasite: 0,
    fungus: 0,
    protozoa: 0,
    prion: 0,
  };
}

export function cloneCapsuleInventory(inventory?: Partial<CapsuleInventory>): CapsuleInventory {
  return {
    ...createInitialCapsuleInventory(),
    ...(inventory ?? {}),
  };
}

export function totalCapsules(inventory: CapsuleInventory): number {
  return CAPSULE_ORDER.reduce((total, capsuleId) => total + Math.max(0, inventory[capsuleId] ?? 0), 0);
}

export function addCapsule(inventory: CapsuleInventory, capsuleId: CapsuleId, amount: number): CapsuleInventory {
  const nextInventory = cloneCapsuleInventory(inventory);
  nextInventory[capsuleId] = Math.max(0, nextInventory[capsuleId] + amount);
  return nextInventory;
}

export function capsuleCanCatch(capsuleId: CapsuleId, enemy: RuntimeMonster): boolean {
  if (capsuleId === 'universal') {
    return true;
  }

  return Boolean(CAPSULE_CATEGORIES[capsuleId]?.includes(enemy.category));
}

export function formatCapsuleInventory(inventory: CapsuleInventory): string {
  return CAPSULE_ORDER.map((capsuleId) => `${CAPSULE_SHORT_LABELS[capsuleId]} ${inventory[capsuleId] ?? 0}`).join(' · ');
}
