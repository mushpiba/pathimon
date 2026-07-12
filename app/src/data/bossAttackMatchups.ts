import type { AttackType, MoveId } from '../types/game';

export type BossEffectivenessKind = 'none' | 'normal' | 'super';
export type BossDefenseTrait = string;

export interface BossAttackMatchup {
  none: BossDefenseTrait[];
  super: BossDefenseTrait[];
}

export const BOSS_ATTACK_MOVE_IDS: MoveId[] = [
  'm_phago',
  'm_opsonin',
  'm_antibody',
  'm_complement',
  'm_ctl',
  'm_th1',
  'm_th2',
  'm_interferon',
  'm_oxidative_burst',
  'm_cell_wall_inhibitor',
  'm_protein_synthesis_inhibitor',
  'm_antifungal_membrane',
  'm_anthelmintic',
  'm_antitoxin_therapy',
  'm_antiviral_replication',
];

export const BOSS_ATTACK_MATCHUPS: Partial<Record<AttackType, BossAttackMatchup>> = {
  phago: {
    super: ['none', 'extracellular', 'microscopic'],
    none: ['capsule', 'biofilm', 'acidfast', 'phagolysosome_block', 'large_resistance', 'large_body', 'no_nucleic'],
  },
  opsonin: {
    super: ['capsule', 'extracellular', 'category_bacteria'],
    none: ['proteinA', 'antigen_var', 'antigen_disguise', 'biofilm', 'no_nucleic'],
  },
  antibody: {
    super: ['toxin_axis', 'extracellular', 'vascular'],
    none: ['proteinA', 'antigen_var', 'antigen_disguise', 'latency', 'intracellular', 'intracellular_cytosol', 'intracellular_phagosome', 'no_nucleic'],
  },
  complement: {
    super: ['gram_negative', 'extracellular', 'category_bacteria'],
    none: ['comp_evade', 'capsule', 'large_resistance', 'large_body', 'no_nucleic'],
  },
  ctl: {
    super: ['category_virus', 'viral', 'intracellular', 'intracellular_cytosol', 'retrovirus'],
    none: ['extracellular', 'biofilm', 'capsule', 'latency', 'large_resistance', 'large_body', 'no_nucleic'],
  },
  th1: {
    super: ['acidfast', 'mycobacterial', 'intracellular_phagosome', 'phagolysosome_block'],
    none: ['spore', 'biofilm', 'large_resistance', 'large_body', 'no_nucleic'],
  },
  th2: {
    super: ['category_parasite', 'large_body', 'large', 'nematode', 'trematode', 'cestode'],
    none: ['category_bacteria', 'category_virus', 'viral', 'fungal_membrane', 'spore', 'no_nucleic'],
  },
  interferon: {
    super: ['category_virus', 'viral', 'enveloped_virus', 'retrovirus', 'intracellular_cytosol'],
    none: ['category_bacteria', 'fungal_membrane', 'category_parasite', 'capsule', 'no_nucleic'],
  },
  oxidative: {
    super: ['category_bacteria', 'fungal_membrane', 'extracellular'],
    none: ['catalase', 'oxidative_neutral', 'spore', 'biofilm', 'no_nucleic'],
  },
  cell_wall_drug: {
    super: ['bacterial_cell_wall', 'gram_positive', 'gram_negative'],
    none: ['barrier', 'no_cell_wall', 'acidfast', 'mycobacterial', 'spore', 'category_virus', 'viral', 'fungal_membrane', 'category_parasite', 'no_nucleic'],
  },
  protein_synthesis_drug: {
    super: ['category_bacteria', 'category_protozoa'],
    none: ['category_virus', 'viral', 'large_body', 'large_resistance', 'no_nucleic', 'spore'],
  },
  antifungal_membrane: {
    super: ['fungal_membrane', 'fungal', 'fungal_dimorphic', 'fungal_hypha'],
    none: ['category_bacteria', 'category_virus', 'viral', 'category_parasite', 'category_protozoa', 'no_nucleic'],
  },
  anthelmintic: {
    super: ['category_parasite', 'large_body', 'large', 'nematode', 'trematode', 'cestode'],
    none: ['category_bacteria', 'category_virus', 'viral', 'fungal_membrane', 'category_protozoa', 'no_nucleic'],
  },
  antitoxin_therapy: {
    super: ['toxin_axis', 'superantigen_axis'],
    none: ['intracellular', 'intracellular_cytosol', 'intracellular_phagosome', 'latency', 'large_body', 'large_resistance', 'no_nucleic'],
  },
  antiviral_replication: {
    super: ['category_virus', 'viral', 'enveloped_virus', 'retrovirus', 'intracellular_cytosol'],
    none: ['category_bacteria', 'fungal_membrane', 'category_parasite', 'no_nucleic', 'latency'],
  },
};
