import type { AbilityId, AttackType, TagValue } from '../types/game';

type EffectivenessTable = Partial<Record<AttackType, Partial<Record<AbilityId | TagValue, number>>>>;

const G = 2.0;
const N = 0.0;
const W = 0.5;

export const EFFECTIVENESS: EffectivenessTable = {
  phago: {
    none: 1.4,
    capsule: N,
    biofilm: W,
    acidfast: N,
    phagolysosome_block: N,
    large_resistance: N,
    no_nucleic: N,
    intracellular: W,
    intracellular_cytosol: W,
    intracellular_phagosome: W,
  },
  opsonin: { capsule: G, proteinA: N, biofilm: W, no_nucleic: N, intracellular: W, intracellular_cytosol: W, intracellular_phagosome: W, none: 1.3 },
  antibody: {
    proteinA: N,
    antigen_var: W,
    antigen_disguise: N,
    latency: W,
    no_nucleic: N,
    intracellular: N,
    intracellular_cytosol: N,
    intracellular_phagosome: N,
    extracellular: 1.3,
    vascular: 1.2,
  },
  complement: { comp_evade: N, gram_negative: G, no_nucleic: N },
  ctl: { intracellular: G, intracellular_cytosol: G, retrovirus: 1.5, extracellular: W, capsule: N, biofilm: N, antigen_var: W, latency: N, no_nucleic: N },
  th1: { intracellular: G, intracellular_phagosome: G, acidfast: G, mycobacterial: G, no_nucleic: N },
  th2: { large: G, nematode: G, trematode: G, large_resistance: W, no_nucleic: N },
  interferon: { enveloped_virus: 1.6, retrovirus: 1.3, antigen_var: W, capsule: N, no_nucleic: N },
  spread: { epithelial_barrier: W, mucociliary: W, gastric_acid: W, microbiota_defense: W, barrier: W, biofilm: W, no_nucleic: N },
  lysis: { epithelial_barrier: W, mucociliary: W, gastric_acid: W, microbiota_defense: W, iron_limitation: W, receptor_defect: W, no_nucleic: N },
  toxin: { antitoxin: N, gastric_acid: W, receptor_defect: W, barrier: W, no_nucleic: N },
  immune_mediated: { immune_regulation: W, no_nucleic: N },
  special: { receptor_defect: W, no_nucleic: N },
  superantigen: { no_nucleic: N },
  endotoxin: { comp_patrol: 1.4, no_nucleic: N },
};
