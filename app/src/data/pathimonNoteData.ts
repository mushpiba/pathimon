import firstWaveSelections from './pathimon-notes/drafts/NAME_SELECTIONS.json';
import { buildPathimonFromNote } from './pathimonNoteParser';
import type { MonsterData, MoveData, MoveId } from '../types/game';
import type { PathimonNoteBuildOptions } from './pathimonNoteParser';

interface FirstWaveSelection {
  file: string;
  number: number;
  selectedName: string;
}

interface FirstWaveSelectionData {
  selections: FirstWaveSelection[];
}

interface NoteBuildSpec {
  captureRate?: number;
  defaultStats?: PathimonNoteBuildOptions['defaultStats'];
  fallbackName?: string;
  glyph?: string;
  id?: string;
  moveIds?: Partial<Record<string, MoveId>>;
}

interface BuiltNoteEntry {
  built: ReturnType<typeof buildPathimonFromNote>;
  noteText: string;
  selection: FirstWaveSelection;
}

const NOTE_MODULES = import.meta.glob('./pathimon-notes/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const DEFAULT_NOTE_STATS: PathimonNoteBuildOptions['defaultStats'] = {
  maxHp: 80,
  attack: 50,
  defense: 50,
};

const NOTE_OPTION_OVERRIDES: Record<number, NoteBuildSpec> = {
  1: {
    id: 'anthrax',
    glyph: 'ANT',
    captureRate: 0.36,
    defaultStats: { maxHp: 52, attack: 12, defense: 5 },
    moveIds: {
      '아포 발아': 'spore_germination',
      '탄저 독소': 'anthrax_toxin',
      '협막 형성': 'capsule_formation',
    },
  },
  2: {
    id: 'cereus',
    glyph: 'CER',
    captureRate: 0.44,
    defaultStats: { maxHp: 44, attack: 11, defense: 4 },
    moveIds: {
      '장 감염': 'cereus_gut_infection',
      '장 독소 Emetic form': 'cereus_emetic_toxin',
      '장 독소 Diarrheal form': 'cereus_diarrheal_toxin',
      '안구감염(endophthalmitis)': 'cereus_endophthalmitis',
    },
  },
  8: { id: 'staph', glyph: 'STA' },
  9: { id: 'strep', glyph: 'STR' },
  30: { id: 'tb', glyph: 'TB' },
  31: { id: 'hiv', glyph: 'HIV' },
  32: { id: 'ascaris', glyph: 'ASC' },
  52: { id: 'schistosoma', glyph: 'SCH' },
};

function noteKeyForSelection(file: string): string {
  const normalized = file.startsWith('../') ? file.slice(3) : `drafts/${file}`;
  return `./pathimon-notes/${normalized.replace(/\\/g, '/')}`;
}

function idFromSelection(selection: FirstWaveSelection): string {
  const fileName = selection.file.split(/[\\/]/).pop()?.replace(/\.md$/i, '') ?? '';
  const slug = fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return slug || `pathimon_${selection.number}`;
}

function glyphFromId(id: string): string {
  const glyph = id.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();
  return glyph.padEnd(3, 'X');
}

function buildOptions(selection: FirstWaveSelection): PathimonNoteBuildOptions {
  const override = NOTE_OPTION_OVERRIDES[selection.number] ?? {};
  const id = override.id ?? idFromSelection(selection);

  return {
    id,
    glyph: override.glyph ?? glyphFromId(id),
    fallbackName: override.fallbackName ?? selection.selectedName,
    captureRate: override.captureRate ?? 0.38,
    defaultStats: override.defaultStats ?? DEFAULT_NOTE_STATS,
    moveIds: override.moveIds,
  };
}

function noteTextForSelection(selection: FirstWaveSelection): string {
  const key = noteKeyForSelection(selection.file);
  const noteText = NOTE_MODULES[key];

  if (!noteText) {
    throw new Error(`First-wave pathimon note missing: ${selection.number} ${selection.file}`);
  }

  return noteText;
}

const FIRST_WAVE_SELECTIONS = (firstWaveSelections as FirstWaveSelectionData).selections;

const BUILT_NOTE_ENTRIES: BuiltNoteEntry[] = FIRST_WAVE_SELECTIONS.map((selection) => {
  const noteText = noteTextForSelection(selection);
  return {
    selection,
    noteText,
    built: buildPathimonFromNote(noteText, buildOptions(selection)),
  };
});

const BUILT_NOTE_DATA = BUILT_NOTE_ENTRIES.map((entry) => entry.built);

function requireBuiltNote(id: string): (typeof BUILT_NOTE_DATA)[number] {
  const built = BUILT_NOTE_DATA.find((note) => note.monster.id === id);
  if (!built) throw new Error(`Parsed pathimon note missing: ${id}`);
  return built;
}

export const PARSED_CEREUS_NOTE = requireBuiltNote('cereus');

export const NOTE_MONSTERS: MonsterData[] = BUILT_NOTE_DATA.map((note) => note.monster);

type ParasiteStage = 'egg' | 'larva' | 'adult';

function isParasiteCategory(category: string): boolean {
  return ['연충', '선충', '흡충', '조충', '기생충'].includes(category);
}

function startsFromEgg(noteText: string): boolean {
  return /pathway:\s*.*충란|이름:\s*(?:접촉\s*)?충란|이름:\s*.*충란 섭취/.test(noteText);
}

function stageLabel(stage: ParasiteStage): string {
  if (stage === 'egg') return '충란';
  if (stage === 'larva') return '유충';
  return '성충';
}

function stageName(baseName: string, stage: ParasiteStage): string {
  const label = stageLabel(stage);
  return baseName.endsWith(`-${label}`) ? baseName : `${baseName}-${label}`;
}

function boostStat(value: number, multiplier: number): number {
  return Math.max(value + 1, Math.round(value * multiplier));
}

function createStageMonster(
  base: MonsterData,
  stage: ParasiteStage,
  id: string,
  multiplier: number,
  evolvesTo?: string,
): MonsterData {
  return {
    ...base,
    id,
    name: stageName(base.name.replace(/-(충란|유충|성충)$/, ''), stage),
    glyph: base.glyph,
    maxHp: boostStat(base.maxHp, multiplier),
    attack: boostStat(base.attack, multiplier),
    defense: boostStat(base.defense, multiplier),
    assetBaseId: base.assetBaseId ?? base.id,
    evolvesTo,
  };
}

function createParasiteEvolutionMonsters(entry: BuiltNoteEntry): MonsterData[] {
  const base = entry.built.monster;
  if (!isParasiteCategory(base.category)) return [];

  if (startsFromEgg(entry.noteText)) {
    const larvaId = `${base.id}_larva`;
    const adultId = `${base.id}_adult`;
    base.name = stageName(base.name, 'egg');
    base.evolvesTo = larvaId;
    return [
      createStageMonster(base, 'larva', larvaId, 1.15, adultId),
      createStageMonster(base, 'adult', adultId, 1.35),
    ];
  }

  const adultId = `${base.id}_adult`;
  base.name = stageName(base.name, 'larva');
  base.evolvesTo = adultId;
  return [createStageMonster(base, 'adult', adultId, 1.28)];
}

export const NOTE_EVOLUTION_MONSTERS: MonsterData[] = BUILT_NOTE_ENTRIES.flatMap(createParasiteEvolutionMonsters);

export const NOTE_MOVES: Partial<Record<MoveId, MoveData>> = Object.assign(
  {},
  ...BUILT_NOTE_DATA.map((note) => note.moves),
);
