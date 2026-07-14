export type AttackType =
  | 'lysis'
  | 'toxin'
  | 'superantigen'
  | 'spread'
  | 'endotoxin'
  | 'immune_mediated'
  | 'special'
  | 'misfold'
  | 'phago'
  | 'oxidative'
  | 'net'
  | 'opsonin'
  | 'antibody'
  | 'complement'
  | 'ctl'
  | 'th1'
  | 'th2'
  | 'interferon'
  | 'cell_wall_drug'
  | 'protein_synthesis_drug'
  | 'targeted_antibacterial'
  | 'antifungal_membrane'
  | 'anthelmintic'
  | 'antitoxin_therapy'
  | 'antiviral_replication';
export type BossAttackType = AttackType;
export type TagAxis = 'pathway' | 'wall' | 'location' | 'size' | 'vector' | 'oxygen' | 'reservoir' | 'stage';
export type TagValue =
  | 'respiratory'
  | 'gut'
  | 'blood'
  | 'wound'
  | 'skin'
  | 'mucosal'
  | 'urinary'
  | 'contact'
  | 'sexual'
  | 'transcutaneous'
  | 'gram_positive'
  | 'gram_negative'
  | 'mycobacterial'
  | 'enveloped_virus'
  | 'retrovirus'
  | 'fungal'
  | 'fungal_dimorphic'
  | 'fungal_hypha'
  | 'protozoa'
  | 'nematode'
  | 'trematode'
  | 'cestode'
  | 'none'
  | 'extracellular'
  | 'intracellular'
  | 'intracellular_cytosol'
  | 'intracellular_phagosome'
  | 'erythrocyte'
  | 'tissue_invasive'
  | 'intestinal_lumen'
  | 'vascular'
  | 'microscopic'
  | 'large'
  | 'mosquito'
  | 'freshwater_snail'
  | 'aerobic'
  | 'microbiota'
  | 'environment'
  | 'larva_adult';
export type AbilityId =
  | 'none'
  | 'capsule'
  | 'catalase'
  | 'proteinA'
  | 'comp_evade'
  | 'acidfast'
  | 'biofilm'
  | 'antigen_var'
  | 'spore'
  | 'no_nucleic'
  | 'barrier'
  | 'comp_patrol'
  | 'mask'
  | 'lysozyme'
  | 'latency'
  | 'phagolysosome_block'
  | 'oxidative_neutral'
  | 'immune_cell_kill'
  | 'large_resistance'
  | 'antigen_disguise'
  | 'epithelial_barrier'
  | 'mucociliary'
  | 'gastric_acid'
  | 'microbiota_defense'
  | 'iron_limitation'
  | 'antitoxin'
  | 'receptor_defect'
  | 'immune_regulation';
export type MoveId = string;

export interface CountermeasureProfile {
  direct: string[];
  symptomTags: string[];
}

export type StatusConditionId =
  | 'fever'
  | 'dehydration'
  | 'fatigue'
  | 'vomiting'
  | 'excretory_dysfunction'
  | 'cough'
  | 'blood_pressure'
  | 'dyspnea'
  | 'edema'
  | 'neurologic'
  | 'paralysis'
  | 'bleeding'
  | 'immune_abnormal'
  | 'necrosis'
  | 'blindness'
  | 'hearing_abnormal'
  | 'pain'
  | 'itching'
  | 'jaundice';

export type StatusConditionStacks = Partial<Record<StatusConditionId, number>>;

export interface Tags {
  pathway?: TagValue;
  wall?: TagValue;
  location?: TagValue;
  size?: TagValue;
  vector?: TagValue;
  oxygen?: TagValue;
  reservoir?: TagValue;
  stage?: TagValue;
}

export type EffectPrimitive =
  | { kind: 'buff'; stat: 'attack' | 'defense'; pct: number; turns: number; target: 'self' | 'enemy'; rank?: number; stacks?: number }
  | { kind: 'status'; status: 'confusion' | 'stun'; chance: number; turns?: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'condition'; condition: StatusConditionId; chance: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'invuln'; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'field'; side: 'incoming'; factor: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'dot'; power: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'convert'; power: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'heal'; pct: number; target: 'self' | 'enemy'; stacks?: number };

export type MoveSlot = MoveId | null;

export interface MoveOutcome {
  chance: number;
  description: string;
  effectText?: string;
  effects?: EffectPrimitive[];
  learnText: string;
  power?: number;
  symptom?: string;
}

export interface MoveStageData {
  description: string;
  effectText?: string;
  effects?: EffectPrimitive[];
  learnText: string;
  name: string;
  power: number;
  symptom?: string;
}

export interface AbilityData {
  id: AbilityId;
  name: string;
  resistTag?: Partial<Record<TagAxis, Partial<Record<TagValue, number>>>>;
}

export interface MoveData {
  id: MoveId;
  kind?: 'attack' | 'prep' | 'signature';
  name: string;
  type: AttackType;
  typeLabel?: string;
  power: number;
  accuracy: number;
  signature?: boolean;
  description: string;
  effectText?: string;
  learnText: string;
  effects?: EffectPrimitive[];
  outcomes?: MoveOutcome[];
  stageCycle?: MoveStageData[];
  symptom?: string;
  targetTags?: string[];
}

export interface MonsterData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  tags: Tags;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  captureRate: number;
  assetBaseId?: string;
  ability: AbilityId;
  abilities?: AbilityId[];
  learnset: MoveId[];
  profileMemo?: string[];
  countermeasures?: CountermeasureProfile;
  prep?: MoveId;
  signature?: MoveId;
  evolvesTo?: string;
  legendary?: boolean;
}

export interface BossData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  assetPath: string;
  maxHp: number;
  attack: number;
  defense: number;
  abilityPool: AbilityId[];
  movePool: MoveId[];
  symptoms: string[];
}

export interface TrainerData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  assetPath: string;
  maxHp: number;
  attack: number;
  defense: number;
  movePool: MoveId[];
}

export interface ActiveEffect {
  kind: EffectPrimitive['kind'] | 'confusion';
  stat?: 'attack' | 'defense';
  pct?: number;
  rank?: number;
  side?: 'incoming';
  factor?: number;
  power?: number;
  turns?: number;
}

export interface RuntimeMonster {
  templateId: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  tags: Tags;
  maxHp: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  captureRate: number;
  assetBaseId?: string;
  ability: AbilityId;
  abilities?: AbilityId[];
  moveset: MoveId[];
  moveSlots?: MoveSlot[];
  moveStages?: Partial<Record<MoveId, number>>;
  plannedMoveId?: MoveId;
  sealedMoveIds?: MoveId[];
  bossMaintenanceQueued?: boolean;
  plannedMoveIds?: MoveId[];
  bossPhase2Activated?: boolean;
  profileMemo?: string[];
  countermeasures?: CountermeasureProfile;
  effects: ActiveEffect[];
  statusConditions?: StatusConditionStacks;
  stunned: boolean;
  fainted: boolean;
  isBoss: boolean;
  isTrainer?: boolean;
  assetPath?: string;
  symptoms?: string[];
  signatureUnlocked?: boolean;
  usedSignatureMoveIds?: MoveId[];
}

export type RunMode = 'learning' | 'challenge';
export type VisualStyle = 'character' | 'micro';
export type EncounterKind = 'wild' | 'trainer' | 'boss';
export type CapsuleId = 'universal' | 'virus' | 'bacteria' | 'parasite' | 'fungus' | 'protozoa' | 'prion';
export type CapsuleInventory = Record<CapsuleId, number>;

export type BattlePhase =
  | 'story'
  | 'battle'
  | 'shop'
  | 'floorClear'
  | 'forcedSwitch'
  | 'releaseCapture'
  | 'bossIntro'
  | 'victory'
  | 'defeat';

export type HitEffectiveness = 'none' | 'normal' | 'super';

export type ShopItemKind = 'capsule' | 'potion' | 'advancedPotion' | 'rareCandy' | 'evolutionStone' | 'geneSplicer';

export interface ShopItem {
  id: string;
  kind: ShopItemKind;
  capsuleId?: CapsuleId;
  name: string;
  price: number;
  imagePath: string;
  purchased: boolean;
  description: string;
}

export interface RunState {
  floor: number;
  bgmSeed: number;
  mode: RunMode;
  visualStyle: VisualStyle;
  money: number;
  capsules: number;
  capsuleInventory: CapsuleInventory;
  wildRosterIds?: string[];
  bossRosterIds?: string[];
  party: RuntimeMonster[];
  activeIndex: number;
  enemy: RuntimeMonster | null;
  pendingCapture?: RuntimeMonster;
  encounterKind: EncounterKind;
  phase: BattlePhase;
  lastLog: string;
  battleResultLog?: string;
  lastEnemyHitEffectiveness?: HitEffectiveness;
  lastPlayerHitEffectiveness?: HitEffectiveness;
  shopInventory?: ShopItem[];
  shopRefreshCount?: number;
}
