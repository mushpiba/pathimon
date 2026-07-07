import type { AbilityId, AttackType, TagValue } from '../types/game';

type EffectivenessTable = Partial<Record<AttackType, Partial<Record<AbilityId | TagValue, number>>>>;

const G = 2.0;
const N = 0.0;
const W = 0.5;

export const EFFECTIVENESS: EffectivenessTable = {
  phago: { none: 1.4, capsule: N, biofilm: N, acidfast: N, no_nucleic: N, intracellular: N },
  opsonin: { capsule: G, proteinA: N, no_nucleic: N, intracellular: N, none: 1.3 },
  antibody: { proteinA: N, antigen_var: N, no_nucleic: N, intracellular: N, extracellular: 1.3 },
  complement: { comp_evade: N, gram_negative: G, no_nucleic: N },
  ctl: { intracellular: G, extracellular: W, capsule: N, biofilm: N, antigen_var: W, no_nucleic: N },
  th1: { intracellular: G, acidfast: G, no_nucleic: N },
  interferon: { enveloped_virus: 1.6, antigen_var: W, capsule: N, no_nucleic: N },
  spread: { barrier: G, biofilm: G, no_nucleic: N },
  toxin: { barrier: 1.4, no_nucleic: N },
  lysis: { no_nucleic: N },
  superantigen: { no_nucleic: N },
  endotoxin: { comp_patrol: 1.4, no_nucleic: N },
};
