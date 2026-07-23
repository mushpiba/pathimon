import type { AbilityId, BossData, MonsterData, RuntimeMonster, TrainerData } from '../types/game';
import { buildMoveSlots } from '../battle/loadout';
import { selectBossMoveSet } from '../battle/bossMatchup';
import { BOSSES } from '../data/bosses';
import { TRAINERS } from '../data/trainers';

// 플레이어 쪽 턴당 화력은 앵커 12종 실측 기준 약 650이다(공격 평균 66.4 × 공격기 위력 평균 58.7 / 보스 방어 6).
// 보스 방어가 8이 되면서 플레이어 턴당 화력은 약 487로 내려갔다. 배수 26이면 보스 HP 5,980으로 약 12턴이다.
// 트레이너는 그 1/4인 1,495로 약 3턴이 된다.
const BOSS_HP_MULTIPLIER = 26;
const TRAINER_BOSS_HP_RATIO = 1 / 4;

interface CreateMonsterOptions {
  defenseTraits?: boolean;
}

export function createMonsterInstance(data: MonsterData, options: CreateMonsterOptions = {}): RuntimeMonster {
  const hasDefenseTraits = options.defenseTraits ?? true;
  // VOCAB.md §2-3 `없음` 노트는 템플릿에 `abilities: []`로 들어온다.
  // 여기서 `[data.ability]`로 되돌리면 런타임만 `['none']`이 되어 템플릿과 어긋난다.
  const abilities = (data.abilities?.length ? data.abilities : [data.ability]).filter((ability) => ability !== 'none');

  const moveSlots = buildMoveSlots(data);

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
    assetBaseId: data.assetBaseId,
    ability: hasDefenseTraits ? abilities[0] ?? 'none' : 'none',
    abilities: hasDefenseTraits ? [...abilities] : [],
    moveset: moveSlots.filter((moveId): moveId is NonNullable<typeof moveId> => Boolean(moveId)),
    moveSlots,
    moveStages: {},
    sealedMoveIds: [],
    bossMaintenanceQueued: false,
    plannedMoveIds: [],
    bossPhase2Activated: false,
    profileMemo: data.profileMemo ? [...data.profileMemo] : undefined,
    countermeasures: data.countermeasures ? {
      direct: [...data.countermeasures.direct],
      symptomTags: [...data.countermeasures.symptomTags],
    } : undefined,
    effects: [],
    statusConditions: {},
    stunned: false,
    fainted: false,
    isBoss: false,
    symptoms: [],
    signatureUnlocked: false,
    usedSignatureMoveIds: [],
  };
}

function getBoss(index = 0): BossData {
  return BOSSES[index % BOSSES.length];
}

function selectBossAbilities(pool: AbilityId[], floor: number, index: number): AbilityId[] {
  const bracket = Math.max(1, Math.floor(floor / 10));
  const count = Math.min(pool.length, bracket);
  const start = index % pool.length;

  return Array.from({ length: count }, (_, offset) => pool[(start + offset) % pool.length]);
}

export function createBossInstance(index = 0, floor = 10): RuntimeMonster {
  const boss = getBoss(index);
  const abilities = selectBossAbilities(boss.abilityPool, floor, index);
  const maxHp = boss.maxHp * BOSS_HP_MULTIPLIER;
  const moveset = selectBossMoveSet(boss.movePool);

  return {
    templateId: boss.id,
    name: boss.name,
    scientificName: boss.scientificName,
    category: boss.category,
    glyph: boss.glyph,
    assetPath: boss.assetPath,
    tags: {},
    maxHp,
    hp: maxHp,
    attack: boss.attack,
    defense: boss.defense,
    speed: 5,
    captureRate: 0,
    ability: abilities[0],
    abilities,
    moveset,
    moveSlots: moveset,
    moveStages: {},
    sealedMoveIds: [],
    bossMaintenanceQueued: false,
    plannedMoveIds: [],
    bossPhase2Activated: false,
    effects: [],
    statusConditions: {},
    stunned: false,
    fainted: false,
    isBoss: true,
    isTrainer: true,
    symptoms: [],
    signatureUnlocked: true,
    usedSignatureMoveIds: [],
  };
}

function getTrainer(index = 0): TrainerData {
  return TRAINERS[index % TRAINERS.length];
}

export function createTrainerInstance(index = 0): RuntimeMonster {
  const trainer = getTrainer(index);
  const maxHp = Math.round(getBoss(index).maxHp * BOSS_HP_MULTIPLIER * TRAINER_BOSS_HP_RATIO);

  return {
    templateId: trainer.id,
    name: trainer.name,
    scientificName: trainer.scientificName,
    category: trainer.category,
    glyph: trainer.glyph,
    assetPath: trainer.assetPath,
    tags: {},
    maxHp,
    hp: maxHp,
    attack: trainer.attack,
    defense: trainer.defense,
    speed: 6,
    captureRate: 0,
    ability: 'none',
    abilities: [],
    moveset: trainer.movePool.slice(0, 4),
    moveSlots: trainer.movePool.slice(0, 4),
    moveStages: {},
    plannedMoveIds: [],
    bossPhase2Activated: false,
    effects: [],
    statusConditions: {},
    stunned: false,
    fainted: false,
    isBoss: false,
    isTrainer: true,
    signatureUnlocked: true,
    usedSignatureMoveIds: [],
  };
}
