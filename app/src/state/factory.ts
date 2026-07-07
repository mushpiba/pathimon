import type { BossData, MonsterData, RuntimeMonster } from '../types/game';
import { buildLoadout } from '../battle/loadout';
import { BOSSES } from '../data/bosses';

export function createMonsterInstance(data: MonsterData): RuntimeMonster {
  return {
    templateId: data.id,
    name: data.name,
    scientificName: data.scientificName,
    category: data.category,
    glyph: data.glyph,
    tags: { ...data.tags },
    maxHp: data.maxHp,
    hp: data.maxHp,
    attack: data.attack,
    defense: data.defense,
    speed: data.speed,
    captureRate: data.captureRate,
    ability: data.ability,
    moveset: buildLoadout(data),
    effects: [],
    stunned: false,
    fainted: false,
    isBoss: false,
  };
}

function getBoss(index = 0): BossData {
  return BOSSES[index % BOSSES.length];
}

export function createBossInstance(index = 0): RuntimeMonster {
  const boss = getBoss(index);

  return {
    templateId: boss.id,
    name: boss.name,
    scientificName: boss.scientificName,
    category: boss.category,
    glyph: boss.glyph,
    tags: {},
    maxHp: boss.maxHp,
    hp: boss.maxHp,
    attack: boss.attack,
    defense: boss.defense,
    speed: boss.attack,
    captureRate: 0,
    ability: boss.abilityPool[index % boss.abilityPool.length],
    moveset: boss.movePool.slice(0, 4),
    effects: [],
    stunned: false,
    fainted: false,
    isBoss: true,
  };
}