import { describe, expect, it } from 'vitest';
import { ABILITIES } from './abilities';
import { BOSSES } from './bosses';
import { EFFECTIVENESS } from './effectiveness';
import { MONSTERS, STARTER_ID, TOTAL_FLOORS } from './monsters';
import { MOVES } from './moves';

describe('Pathimon data', () => {
  it('has a valid starter with a scientific name', () => {
    const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);

    expect(starter?.name).toBe('화농성연쇄상구균');
    expect(starter?.scientificName).toBe('Streptococcus pyogenes');
    expect(starter?.scientificName.length).toBeGreaterThan(3);
  });

  it('matches the milestone monster, boss, and floor set exactly', () => {
    expect(MONSTERS.map((monster) => monster.id)).toEqual(['strep', 'staph', 'cholera', 'tb']);
    expect(BOSSES.map((boss) => boss.id)).toEqual(['immune_hq']);
    expect(TOTAL_FLOORS).toBe(10);
  });

  it('covers every ability and move id from the domain types', () => {
    expect(Object.keys(ABILITIES).sort()).toEqual([
      'acidfast',
      'antigen_var',
      'barrier',
      'biofilm',
      'capsule',
      'catalase',
      'comp_evade',
      'comp_patrol',
      'lysozyme',
      'mask',
      'no_nucleic',
      'none',
      'proteinA',
      'spore',
    ]);

    expect(Object.keys(MOVES).sort()).toEqual([
      'alpha_toxin',
      'cholera_toxin',
      'coagulase',
      'cpe',
      'enterotoxin',
      'flood',
      'hyaluronidase',
      'm_antibody',
      'm_complement',
      'm_ctl',
      'm_interferon',
      'm_opsonin',
      'm_phago',
      'm_th1',
      'pvl',
      'streptokinase',
      'tsst',
    ]);
  });

  it('includes the required effectiveness core rows', () => {
    expect(Object.keys(EFFECTIVENESS).sort()).toEqual([
      'antibody',
      'complement',
      'ctl',
      'endotoxin',
      'interferon',
      'lysis',
      'opsonin',
      'phago',
      'spread',
      'superantigen',
      'th1',
      'toxin',
    ]);
  });

  it('references only defined abilities and moves', () => {
    for (const monster of MONSTERS) {
      expect(ABILITIES[monster.ability]).toBeDefined();
      for (const moveId of monster.learnset) expect(MOVES[moveId]).toBeDefined();
      if (monster.signature) expect(MOVES[monster.signature]).toBeDefined();
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
});
