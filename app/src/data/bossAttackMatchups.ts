import type { MoveId } from '../types/game';

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
  'm_targeted_antibacterial',
  'm_antifungal_membrane',
  'm_anthelmintic',
  'm_antitoxin_therapy',
  'm_antiviral_replication',
  'm_antiprotozoal',
  'm_rehydration',
  'm_surgery_drainage',
  // ×2 대증(증상 완화) 기술 — 증상/상태이상 태그를 겨눈다.
  'm_antipyretic',
  'm_analgesic',
  'm_antidiarrheal',
  'm_antitussive',
  'm_antiemetic',
  // ×4 백신·항체.
  'm_vaccination',
];