import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { ABILITIES } from './abilities';
import { BOSSES } from './bosses';
import { EFFECTIVENESS } from './effectiveness';
import { MONSTERS, STARTER_ID, TOTAL_FLOORS } from './monsters';
import { TRAINERS } from './trainers';
import { BOSS_CHARACTER_ASSETS, TRAINER_CHARACTER_ASSETS } from './characterAssets';
import { buildLoadout, buildMoveSlots } from '../battle/loadout';
import { MOVES } from './moves';
import { NOTE_MONSTERS } from './pathimonNoteData';
import { createBossInstance, createTrainerInstance } from '../state/factory';

const pathimonAssets = import.meta.glob('/public/images/pathimon/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

const bossCharacterAssets = import.meta.glob('/public/images/character/boss/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

const trainerCharacterAssets = import.meta.glob('/public/images/character/trainer/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
});

function readPngSize(path: string): { width: number; height: number } {
  const bytes = readFileSync(path);
  return {
    width: (bytes[16] << 24) + (bytes[17] << 16) + (bytes[18] << 8) + bytes[19],
    height: (bytes[20] << 24) + (bytes[21] << 16) + (bytes[22] << 8) + bytes[23],
  };
}

function hasInvulnerabilityPrimitive(move: (typeof MOVES)[string]): boolean {
  const effectGroups = [
    move.effects ?? [],
    ...(move.outcomes ?? []).map((outcome) => outcome.effects ?? []),
    ...(move.stageCycle ?? []).map((stage) => stage.effects ?? []),
  ];

  return effectGroups.some((effects) => effects.some((effect) => effect.kind === 'invuln'));
}

describe('Pathimon data', () => {
  it('has a valid starter with a scientific name', () => {
    const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);

    expect(starter?.name).toBe('탄저록스');
    expect(starter?.scientificName).toBe('탄저균 (Bacillus anthracis)');
    expect(starter?.scientificName.length).toBeGreaterThan(3);
  });

  it('uses playful pathimon names and bilingual scientific labels', () => {
    const names = MONSTERS.map((monster) => monster.name);
    expect(names).toEqual(expect.arrayContaining(['탄저록스', '세레우톡스', '리스냉장', '노카가지']));
    expect(new Set(names).size).toBe(names.length);

    for (const monster of MONSTERS) {
      expect(monster.scientificName).toMatch(/^.+\(.+\)$/);
    }
  });

  it('loads every selected first-wave pathimon note into the note roster', () => {
    expect(NOTE_MONSTERS).toHaveLength(59);
    expect(NOTE_MONSTERS.map((monster) => monster.name).slice(0, 5)).toEqual([
      '탄저록스',
      '세레우톡스',
      '리스냉장',
      '디프막스',
      '디피실룩',
    ]);
    expect(NOTE_MONSTERS[NOTE_MONSTERS.length - 1]?.name).toBe('노카가지');
  });

  it('uses note stats as battle-ready hp, attack, and defense values', () => {
    const byId = new Map(NOTE_MONSTERS.map((monster) => [monster.id, monster]));

    expect(byId.get('anthrax')).toMatchObject({ maxHp: 100, attack: 100, defense: 100 });
    expect(byId.get('cereus')).toMatchObject({ maxHp: 95, attack: 20, defense: 30 });

    for (const monster of NOTE_MONSTERS) {
      expect(monster.maxHp).toBeGreaterThan(0);
      expect(monster.attack).toBeGreaterThan(0);
      expect(monster.defense).toBeGreaterThan(0);
    }
  });

  it('loads display memo lines from every selected pathimon note', () => {
    for (const monster of NOTE_MONSTERS) {
      expect(monster.profileMemo).toHaveLength(4);
      for (const line of monster.profileMemo ?? []) {
        expect(line.trim().length).toBeGreaterThan(8);
      }
    }

    expect(NOTE_MONSTERS.find((monster) => monster.id === 'anthrax')?.profileMemo).toEqual([
      '세균 타입이며 방어특성은 아포이다.',
      '그람양성 구조와 세포외 위치가 핵심이다.',
      '상처, 호흡기, 소화기 경로로 감염될 수 있다.',
      '아포 발아와 탄저 독소, 협막 형성이 대표 병인이다.',
    ]);
  });

  it('parses every first-wave note into battle defense tags and explicit defense traits', () => {
    for (const monster of NOTE_MONSTERS) {
      expect(monster.tags.wall, `${monster.id} wall tag`).toBeTruthy();
      expect(monster.tags.location, `${monster.id} location tag`).toBeTruthy();
      expect(monster.tags.pathway, `${monster.id} pathway tag`).toBeTruthy();
      expect(monster.abilities, `${monster.id} defense traits`).toBeDefined();
      expect(monster.ability, `${monster.id} primary defense trait`).toBeTruthy();
    }
  });

  it('does not leave selected first-wave notes with an accidental empty defense trait', () => {
    const emptyDefenseIds = NOTE_MONSTERS
      .filter((monster) => monster.ability === 'none' || !monster.abilities?.length)
      .map((monster) => monster.id);

    expect(emptyDefenseIds).toEqual([]);
  });

  it('gives the starter four battle slots with note-defined moves', () => {
    const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);
    if (!starter) throw new Error('starter missing');

    const moveSlots = buildMoveSlots(starter);

    expect(moveSlots).toHaveLength(4);
    expect(moveSlots[0]).toBe(starter.prep);
    expect(moveSlots[3]).toBe(starter.signature);
    expect(buildLoadout(starter)).toEqual(moveSlots.filter(Boolean));
    expect(buildLoadout(starter).length).toBeGreaterThanOrEqual(3);
  });

  it('keeps only note-managed pathimon active while legacy representatives are disabled', () => {
    const monsterIds = MONSTERS.map((monster) => monster.id);
    const noteMonsterIds = NOTE_MONSTERS.map((monster) => monster.id);

    expect(monsterIds).toEqual(expect.arrayContaining(noteMonsterIds));
    expect(monsterIds).not.toEqual(expect.arrayContaining([
      'influenza',
      'cholera',
      'candida',
      'aspergillus',
      'malaria',
      'entamoeba',
    ]));
    expect(monsterIds).toEqual(expect.arrayContaining([
      'anthrax',
      'cereus',
      'listeria_monocytogenes',
      'staph',
      'strep',
      'tb',
      'hiv',
      'ascaris',
      'schistosoma',
      'nocardia_spp',
    ]));
    expect(NOTE_MONSTERS).toHaveLength(59);
    expect(MONSTERS.length).toBeGreaterThan(NOTE_MONSTERS.length);
    expect(BOSSES.map((boss) => boss.id)).toContain('immune_hq');
    expect(BOSSES.length).toBeGreaterThanOrEqual(12);
    expect(TOTAL_FLOORS).toBe(100);
  });

  it('creates note-derived parasite stage evolutions with stronger later forms', () => {
    const byId = new Map(MONSTERS.map((monster) => [monster.id, monster]));
    const ascarisEgg = byId.get('ascaris');
    const ascarisLarva = byId.get('ascaris_larva');
    const ascarisAdult = byId.get('ascaris_adult');
    const trichinellaLarva = byId.get('trichinella_spiralis');
    const trichinellaAdult = byId.get('trichinella_spiralis_adult');

    expect(ascarisEgg?.name).toContain('충란');
    expect(ascarisEgg?.evolvesTo).toBe('ascaris_larva');
    expect(ascarisLarva?.name).toContain('유충');
    expect(ascarisLarva?.evolvesTo).toBe('ascaris_adult');
    expect(ascarisAdult?.name).toContain('성충');
    expect(ascarisAdult?.attack).toBeGreaterThan(ascarisEgg?.attack ?? 0);
    expect(ascarisAdult?.defense).toBeGreaterThan(ascarisEgg?.defense ?? 0);

    expect(trichinellaLarva?.name).toContain('유충');
    expect(trichinellaLarva?.evolvesTo).toBe('trichinella_spiralis_adult');
    expect(trichinellaAdult?.name).toContain('성충');
    expect(trichinellaAdult?.maxHp).toBeGreaterThan(trichinellaLarva?.maxHp ?? 0);
  });

  it('uses every image from the separated character boss and trainer folders', () => {
    expect(TRAINER_CHARACTER_ASSETS).toHaveLength(Object.keys(trainerCharacterAssets).length);
    expect(BOSS_CHARACTER_ASSETS).toHaveLength(Object.keys(bossCharacterAssets).length);
    expect(TRAINER_CHARACTER_ASSETS.length).toBeGreaterThanOrEqual(20);
    expect(BOSS_CHARACTER_ASSETS.length).toBeGreaterThanOrEqual(50);
    expect(TRAINERS.map((trainer) => trainer.assetPath)).toEqual(expect.arrayContaining(TRAINER_CHARACTER_ASSETS));
    expect(BOSSES.map((boss) => boss.assetPath)).toEqual(expect.arrayContaining(BOSS_CHARACTER_ASSETS));

    for (const trainer of TRAINERS) {
      expect(trainer.assetPath.startsWith('images/character/trainer/')).toBe(true);
      expect(trainerCharacterAssets[`/public/${trainer.assetPath}`]).toBeDefined();
    }

    for (const boss of BOSSES) {
      expect(boss.assetPath.startsWith('images/character/boss/')).toBe(true);
      expect(bossCharacterAssets[`/public/${boss.assetPath}`]).toBeDefined();
    }
  });

  it('scales boss runtime hp to the anthrax-calibrated boss value', () => {
    const boss = createBossInstance(0, 10);

    expect(boss.maxHp).toBe(BOSSES[0].maxHp * 60);
    expect(boss.hp).toBe(BOSSES[0].maxHp * 60);
  });

  it('starts boss encounters without pre-existing symptoms', () => {
    const boss = createBossInstance(0, 10);

    expect(boss.symptoms).toEqual([]);
  });

  it('sets trainer runtime hp to one fifth of the paired boss hp', () => {
    const boss = createBossInstance(0, 10);
    const trainer = createTrainerInstance(0);

    expect(trainer.maxHp).toBe(Math.round(boss.maxHp / 5));
    expect(trainer.hp).toBe(Math.round(boss.maxHp / 5));
  });

  it('adds the v3 pathogen sheet fields to every representative pathogen', () => {
    for (const monster of MONSTERS) {
      expect(monster.prep).toBeDefined();
      expect(MOVES[monster.prep!]?.kind).toBe('prep');
      expect(monster.signature).toBeDefined();
      expect(monster.tags.location).toBeDefined();
      expect(monster.tags.size).toBeDefined();
    }
  });

  it('covers every ability and move id from the domain types', () => {
    expect(Object.keys(ABILITIES).sort()).toEqual([
      'acidfast',
      'antigen_disguise',
      'antigen_var',
      'antitoxin',
      'barrier',
      'biofilm',
      'capsule',
      'catalase',
      'comp_evade',
      'comp_patrol',
      'epithelial_barrier',
      'gastric_acid',
      'immune_cell_kill',
      'immune_regulation',
      'iron_limitation',
      'large_resistance',
      'latency',
      'lysozyme',
      'mask',
      'microbiota_defense',
      'mucociliary',
      'no_nucleic',
      'none',
      'oxidative_neutral',
      'phagolysosome_block',
      'proteinA',
      'receptor_defect',
      'spore',
    ]);

    const requiredMoveIds = [
      'alpha_toxin',
      'amoeba_attach',
      'amoeba_lysis',
      'anthrax_toxin',
      'ascaris_migration',
      'ascaris_obstruction',
      'aspergillus_angio',
      'aspergillus_germination',
      'candida_hypha',
      'candida_switch',
      'capsule_formation',
      'cereus_diarrheal_toxin',
      'cereus_emetic_toxin',
      'cereus_endophthalmitis',
      'cereus_gut_infection',
      'cholera_attach',
      'cholera_toxin',
      'coagulase',
      'cpe',
      'enterotoxin',
      'flood',
      'hiv_cd4',
      'hiv_gp120',
      'hyaluronidase',
      'influenza_attach',
      'influenza_spread',
      'm_antibody',
      'm_complement',
      'm_ctl',
      'm_interferon',
      'm_opsonin',
      'm_phago',
      'm_th1',
      'm_th2',
      'malaria_burst',
      'malaria_invasion',
      'pvl',
      'schisto_disguise',
      'schisto_granuloma',
      'spore_germination',
      'streptokinase',
      'tb_chronic',
      'tb_macrophage_entry',
      'tsst',
    ];

    expect(Object.keys(MOVES).sort()).toEqual(expect.arrayContaining(requiredMoveIds));
    expect(Object.keys(MOVES).length).toBeGreaterThan(requiredMoveIds.length);
    expect(MOVES.listeria_monocytogenes_move_1.kind).toBe('prep');
  });

  it('includes the required effectiveness core rows', () => {
    expect(Object.keys(EFFECTIVENESS).sort()).toEqual([
      'antibody',
      'complement',
      'ctl',
      'endotoxin',
      'immune_mediated',
      'interferon',
      'lysis',
      'opsonin',
      'phago',
      'special',
      'spread',
      'superantigen',
      'th1',
      'th2',
      'toxin',
    ]);
  });

  it('references only defined abilities and moves', () => {
    for (const monster of MONSTERS) {
      expect(ABILITIES[monster.ability]).toBeDefined();
      for (const abilityId of monster.abilities ?? []) expect(ABILITIES[abilityId]).toBeDefined();
      for (const moveId of monster.learnset) expect(MOVES[moveId]).toBeDefined();
      if (monster.signature) expect(MOVES[monster.signature]).toBeDefined();
      if (monster.prep) expect(MOVES[monster.prep]).toBeDefined();
    }

    for (const boss of BOSSES) {
      for (const abilityId of boss.abilityPool) expect(ABILITIES[abilityId]).toBeDefined();
      for (const moveId of boss.movePool) expect(MOVES[moveId]).toBeDefined();
    }
  });

  it('has move explanation text for the battle description panel', () => {
    for (const move of Object.values(MOVES)) {
      expect(move.description.length).toBeGreaterThan(0);
      expect(move.learnText.length).toBeGreaterThan(0);
    }
  });

  it('limits invulnerability primitives to once-per-battle signature moves', () => {
    const unrestrictedInvulnerabilityMoves = Object.values(MOVES)
      .filter((move) => move.kind !== 'signature' && hasInvulnerabilityPrimitive(move))
      .map((move) => move.name);

    expect(unrestrictedInvulnerabilityMoves).toEqual([]);
  });

  it('maps eosinophil pressure to one immune abnormality stack', () => {
    expect(MOVES.m_th2.effects).toEqual([{ kind: 'condition', condition: 'immune_abnormal', chance: 1, target: 'enemy' }]);
  });

  it('uses pathimon notes as the source for note-managed moves', () => {
    expect(MOVES.spore_germination.kind).toBe('prep');
    expect(MOVES.spore_germination.typeLabel).toBe('준비');
    expect(MOVES.spore_germination.description).toBe('{name}이 아포를 발아시켜 감염을 준비한다.');
    expect(MOVES.spore_germination.outcomes?.[0]?.effects).toEqual([{ kind: 'buff', stat: 'attack', rank: 1, pct: 100, turns: 99, target: 'self' }]);
    expect(MOVES.capsule_formation.effects).toEqual([{ kind: 'invuln', turns: 3, target: 'self' }]);
    expect(MOVES.capsule_formation.symptom).toBeUndefined();
    expect(MOVES.cereus_emetic_toxin.effects).toEqual([{ kind: 'condition', condition: 'vomiting', chance: 1, target: 'enemy' }]);
    expect(MOVES.cereus_diarrheal_toxin.effects).toEqual([{ kind: 'condition', condition: 'excretory_dysfunction', chance: 1, target: 'enemy' }]);
    expect(MOVES.cereus_endophthalmitis.effects).toEqual([
      { kind: 'condition', condition: 'blindness', chance: 1, target: 'enemy', stacks: 2 },
    ]);
  });

  it('has character and microscope image assets for the representative pathogens', () => {
    for (const monster of MONSTERS) {
      const assetId = monster.assetBaseId ?? monster.id;
      expect(pathimonAssets[`/public/images/pathimon/${assetId}-front.png`]).toBeDefined();
      expect(pathimonAssets[`/public/images/pathimon/${assetId}-back.png`]).toBeDefined();
      expect(pathimonAssets[`/public/images/pathimon/${assetId}-micro-front.png`]).toBeDefined();
    }
  });

  it('uses display-ready high resolution capsule icons', () => {
    for (const capsuleId of ['universal', 'virus', 'bacteria', 'parasite', 'fungus', 'protozoa', 'prion']) {
      const size = readPngSize(`public/images/capsules/${capsuleId}.png`);
      expect(size.width).toBeGreaterThanOrEqual(96);
      expect(size.height).toBeGreaterThanOrEqual(96);
    }
  });
});
