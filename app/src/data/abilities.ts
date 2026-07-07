import type { AbilityData, AbilityId } from '../types/game';

export const ABILITIES: Record<AbilityId, AbilityData> = {
  none: { id: 'none', name: '무방비' },
  capsule: { id: 'capsule', name: '피막장벽' },
  catalase: { id: 'catalase', name: '활성산소중화' },
  proteinA: { id: 'proteinA', name: '항체무력화' },
  comp_evade: { id: 'comp_evade', name: '보체회피' },
  acidfast: { id: 'acidfast', name: '항산성막' },
  biofilm: { id: 'biofilm', name: '바이오필름' },
  antigen_var: { id: 'antigen_var', name: '항원변이' },
  spore: { id: 'spore', name: '포자내성' },
  no_nucleic: { id: 'no_nucleic', name: '무핵산' },
  barrier: { id: 'barrier', name: '물리장벽' },
  comp_patrol: { id: 'comp_patrol', name: '보체순환' },
  mask: {
    id: 'mask',
    name: '점액섬모',
    resistTag: {
      pathway: {
        respiratory: 0.5,
      },
    },
  },
  lysozyme: {
    id: 'lysozyme',
    name: '라이소자임',
    resistTag: {
      wall: {
        gram_positive: 0.5,
      },
    },
  },
};
