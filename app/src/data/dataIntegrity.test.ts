import { describe, expect, it } from 'vitest';
import { ABILITIES } from './abilities';
import { BOSSES } from './bosses';
import { MONSTERS, STARTER_ID } from './monsters';
import { MOVES } from './moves';

describe('Pathimon data', () => {
  it('has a valid starter with a scientific name', () => {
    const starter = MONSTERS.find((monster) => monster.id === STARTER_ID);

    expect(starter?.name).toBe('화농성연쇄상구균');
    expect(starter?.scientificName).toBe('Streptococcus pyogenes');
    expect(starter?.scientificName.length).toBeGreaterThan(3);
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
