export type AttackType =
  | 'lysis'
  | 'toxin'
  | 'superantigen'
  | 'spread'
  | 'endotoxin'
  | 'misfold'
  | 'phago'
  | 'oxidative'
  | 'net'
  | 'opsonin'
  | 'antibody'
  | 'complement'
  | 'ctl'
  | 'th1'
  | 'interferon';
export type TagAxis = 'pathway' | 'wall' | 'location';
export type TagValue =
  | 'respiratory'
  | 'gut'
  | 'blood'
  | 'wound'
  | 'skin'
  | 'mucosal'
  | 'contact'
  | 'gram_positive'
  | 'gram_negative'
  | 'mycobacterial'
  | 'enveloped_virus'
  | 'fungal'
  | 'protozoa'
  | 'none'
  | 'extracellular'
  | 'intracellular';
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
  | 'lysozyme';
export type MoveId =
  | 'alpha_toxin'
  | 'pvl'
  | 'hyaluronidase'
  | 'coagulase'
  | 'enterotoxin'
  | 'cholera_toxin'
  | 'cpe'
  | 'streptokinase'
  | 'tsst'
  | 'flood'
  | 'm_phago'
  | 'm_opsonin'
  | 'm_antibody'
  | 'm_complement'
  | 'm_ctl'
  | 'm_th1'
  | 'm_interferon';

export interface Tags {
  pathway?: TagValue;
  wall?: TagValue;
  location?: TagValue;
}

export type EffectPrimitive =
  | { kind: 'buff'; stat: 'attack' | 'defense'; pct: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'status'; status: 'confusion' | 'stun'; chance: number; turns?: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'invuln'; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'field'; side: 'incoming'; factor: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'dot'; power: number; turns: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'convert'; power: number; target: 'self' | 'enemy'; stacks?: number }
  | { kind: 'heal'; pct: number; target: 'self' | 'enemy'; stacks?: number };

export interface AbilityData {
  id: AbilityId;
  name: string;
  resistTag?: Partial<Record<TagAxis, Partial<Record<TagValue, number>>>>;
}

export interface MoveData {
  id: MoveId;
  name: string;
  type: AttackType;
  power: number;
  accuracy: number;
  signature?: boolean;
  description: string;
  learnText: string;
  effects?: EffectPrimitive[];
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
  ability: AbilityId;
  learnset: MoveId[];
  signature?: MoveId;
  legendary?: boolean;
}

export interface BossData {
  id: string;
  name: string;
  scientificName: string;
  category: string;
  glyph: string;
  maxHp: number;
  attack: number;
  defense: number;
  abilityPool: AbilityId[];
  movePool: MoveId[];
}

export interface ActiveEffect {
  kind: EffectPrimitive['kind'] | 'confusion';
  stat?: 'attack' | 'defense';
  pct?: number;
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
  ability: AbilityId;
  moveset: MoveId[];
  effects: ActiveEffect[];
  stunned: boolean;
  fainted: boolean;
  isBoss: boolean;
}

export type BattlePhase = 'story' | 'battle' | 'shop' | 'bossIntro' | 'victory' | 'defeat';

export interface RunState {
  floor: number;
  money: number;
  capsules: number;
  party: RuntimeMonster[];
  activeIndex: number;
  enemy: RuntimeMonster | null;
  phase: BattlePhase;
  lastLog: string;
}
