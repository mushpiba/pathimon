import type { AbilityId, AttackType, TagValue } from '../types/game';

type EffectivenessTable = Partial<Record<AttackType, Partial<Record<AbilityId | TagValue, number>>>>;

const G = 2.0;
const N = 0.0;
const W = 0.5;

// **패시몬이 적(보스·트레이너)을 때릴 때만 쓴다.** 행은 패시몬 기술 타입, 값은 적의 방어 특성·태그다.
//
// 반대 방향(적 → 패시몬)은 이 표를 타지 않는다. 노트 `대처법:`·`증상/태그:` 적중으로 ×4·×2·×1만 정한다
// (`battle/bossMatchup.ts`, MATCHUP.md §1). 패시몬의 `evasion`은 배율에 걸리지 않고 학습 텍스트로만 쓴다.
//
// **주의 — 위 8행(`phago`·`opsonin`·`antibody`·`complement`·`ctl`·`th1`·`th2`·`interferon`)은 죽은 행이다.**
// 전부 적(치료 행위) 기술 타입이라 이 표를 탈 일이 없다. 협막·항산성·잠복 같은 패시몬 방어 특성이 값으로 들어 있는 것도
// 그 흔적이다. 실제로 도는 것은 노트 기술 타입이 접히는 5행뿐이다 — `special`·`lysis`·`toxin`·`spread`·`immune_mediated`.
// 구 상성 시스템의 잔재이며, 정리 여부는 사용자 판단을 기다린다.
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
