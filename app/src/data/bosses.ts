import type { BossData } from '../types/game';

export const BOSSES: BossData[] = [
  {
    id: 'immune_hq',
    name: '면역 사령부',
    scientificName: 'Immune Command',
    category: '적응면역',
    glyph: '🛡️',
    maxHp: 230,
    attack: 15,
    defense: 6,
    abilityPool: ['barrier', 'comp_patrol', 'mask', 'lysozyme'],
    movePool: ['m_phago', 'm_opsonin', 'm_antibody', 'm_complement', 'm_ctl', 'm_th1', 'm_interferon'],
  },
];
