import { describe, expect, it } from 'vitest';
import { MOVES } from '../data/moves';
import { MONSTERS } from '../data/monsters';
import { adjustedStatusChance, effectiveMaxHp } from '../data/statusConditions';
import { createBossInstance, createMonsterInstance } from '../state/factory';
import type { EffectPrimitive, MonsterData, RunState, RuntimeMonster } from '../types/game';
import { tryCapture } from './capture';
import { calculateDamage, randomDamageVariance } from './damage';
import { applyEffects, tickEffects } from './effects';
import { calculateMultiplier } from './effectiveness';
import { buildLoadout, buildMoveSlots } from './loadout';
import { currentMoveData, currentMoveName } from './moveStages';
import { resolveForcedSwitchMonster, resolvePlayerMove, resolveSwitchMonster } from './turn';

const attacker: RuntimeMonster = {
  templateId: 'strep',
  name: '화농성연쇄상구균',
  scientificName: 'Streptococcus pyogenes',
  category: '세균',
  glyph: '🔗',
  tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
  maxHp: 44,
  hp: 44,
  attack: 10,
  defense: 3,
  speed: 9,
  captureRate: 0.5,
  ability: 'comp_evade',
  moveset: ['streptokinase', 'hyaluronidase', 'enterotoxin', 'alpha_toxin'],
  effects: [],
  stunned: false,
  fainted: false,
  isBoss: false,
};

const capsuleTarget: RuntimeMonster = {
  ...attacker,
  templateId: 'staph',
  name: '황색포도알균',
  scientificName: 'Staphylococcus aureus',
  ability: 'capsule',
  captureRate: 0.42,
  hp: 10,
  maxHp: 46,
  moveset: ['tsst', 'alpha_toxin', 'pvl', 'hyaluronidase'],
};

function createMonster(overrides: Partial<RuntimeMonster> = {}): RuntimeMonster {
  const { effects, moveset, tags, ...rest } = overrides;

  return {
    ...attacker,
    ...rest,
    tags: {
      ...attacker.tags,
      ...tags,
    },
    moveset: moveset ?? [...attacker.moveset],
    effects: effects ? [...effects] : [],
  };
}

function createBattleState(overrides: Partial<RunState> = {}): RunState {
  return {
    floor: 10,
    bgmSeed: 1,
    mode: 'challenge',
    visualStyle: 'character',
    money: 0,
    capsules: 0,
    capsuleInventory: {
      universal: 0,
      virus: 0,
      bacteria: 0,
      parasite: 0,
      fungus: 0,
      protozoa: 0,
      prion: 0,
    },
    party: [createMonster()],
    activeIndex: 0,
    enemy: createMonster({
      name: '면역챔피언',
      category: '보스 사람',
      moveset: ['m_phago', 'm_opsonin', 'm_antibody', 'm_complement'],
      moveSlots: ['m_phago', 'm_opsonin', 'm_antibody', 'm_complement'],
      isBoss: true,
      isTrainer: true,
      attack: 12,
      hp: 999,
      maxHp: 999,
    }),
    encounterKind: 'boss',
    phase: 'battle',
    lastLog: '',
    ...overrides,
  };
}

describe('battle engine', () => {
  it('builds move slots as prep, up to two attacks, then signature', () => {
    const monster: MonsterData = {
      id: 'staph',
      name: '황색포도알균',
      scientificName: 'Staphylococcus aureus',
      category: '세균',
      glyph: '🟡',
      tags: { pathway: 'skin', wall: 'gram_positive', location: 'extracellular' },
      maxHp: 46,
      attack: 11,
      defense: 4,
      speed: 8,
      captureRate: 0.42,
      ability: 'proteinA',
      signature: 'tsst',
      learnset: ['alpha_toxin', 'pvl', 'hyaluronidase', 'coagulase', 'enterotoxin'],
      prep: 'coagulase',
    };

    expect(buildMoveSlots(monster, [0, 0])).toEqual(['coagulase', 'alpha_toxin', 'pvl', 'tsst']);
    expect(buildLoadout(monster, [0, 0])).toEqual(['coagulase', 'alpha_toxin', 'pvl', 'tsst']);
  });

  it('keeps the signature in the fourth slot when there is only one attack', () => {
    const monster: MonsterData = {
      id: 'anthrax',
      name: '탄저록스',
      scientificName: '탄저균 (Bacillus anthracis)',
      category: '세균',
      glyph: 'ANT',
      tags: { pathway: 'wound', wall: 'gram_positive', location: 'extracellular', size: 'microscopic' },
      maxHp: 50,
      attack: 12,
      defense: 5,
      speed: 5,
      captureRate: 0.4,
      ability: 'spore',
      prep: 'spore_germination',
      learnset: ['spore_germination', 'anthrax_toxin'],
      signature: 'capsule_formation',
    };

    expect(buildMoveSlots(monster, [0])).toEqual(['spore_germination', 'anthrax_toxin', null, 'capsule_formation']);
    expect(buildLoadout(monster, [0])).toEqual(['spore_germination', 'anthrax_toxin', 'capsule_formation']);
  });

  it('formats the current stage in a staged move name and data', () => {
    const monster = createMonster({
      moveset: ['anthrax_toxin'],
      moveStages: { anthrax_toxin: 1 },
    });

    expect(currentMoveName(MOVES.anthrax_toxin, monster)).toBe('탄저 독소 2단계');
    expect(currentMoveData(MOVES.anthrax_toxin, monster)).toMatchObject({
      name: '탄저 독소 2단계',
      power: 40,
      description: '{name}이 EF(edema factor)로 cAMP를 증가시켜 부종을 만들었다.',
      learnText: 'EF는 adenylate cyclase로 작동해 세포 내 cAMP를 올린다.',
    });
  });

  it('combines type matchup and tag defense', () => {
    const defender: RuntimeMonster = {
      ...capsuleTarget,
      ability: 'mask',
      tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    };

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
    expect(result.notes).toContain('점액섬모가 호흡기 태그를 반감했다');
  });

  it('applies every listed defense trait when calculating type matchup', () => {
    const defender = createMonster({
      ability: 'capsule',
      abilities: ['capsule', 'barrier'],
    });

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
  });

  it('calculates deterministic damage with the exact formula and fixed variance', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(33);
    expect(result.multiplier.total).toBe(1);
    expect(result.blockedByInvulnerability).toBe(false);
  });

  it('uses move power times attack over defense times random variance and matchup', () => {
    const defender = createMonster({
      ability: 'mask',
      tags: { pathway: 'respiratory', wall: 'gram_positive', location: 'extracellular' },
    });

    const result = calculateDamage(attacker, defender, MOVES.hyaluronidase, 0.85);

    expect(result.damage).toBe(14);
    expect(result.multiplier.total).toBe(0.5);
  });

  it('generates damage variance from 0.85 to 1.00', () => {
    expect(randomDamageVariance(() => 0)).toBe(0.85);
    expect(randomDamageVariance(() => 1)).toBe(1);
    expect(randomDamageVariance(() => 0.5)).toBeCloseTo(0.925);
  });

  it('returns zero damage for zero-power moves', () => {
    const result = calculateDamage(attacker, capsuleTarget, MOVES.coagulase, 1);

    expect(result.damage).toBe(0);
    expect(result.blockedByInvulnerability).toBe(false);
  });

  it('returns zero damage and marks invulnerability blocks', () => {
    const defender = createMonster({
      effects: [{ kind: 'invuln', turns: 1 }],
    });

    const result = calculateDamage(attacker, defender, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(0);
    expect(result.blockedByInvulnerability).toBe(true);
  });

  it('applies incoming field factors to damage', () => {
    const defender = createMonster({
      effects: [{ kind: 'field', side: 'incoming', factor: 0.5, turns: 2 }],
    });

    const result = calculateDamage(attacker, defender, MOVES.hyaluronidase, 1);

    expect(result.damage).toBe(17);
  });

  it('calibrates boss hp so anthrax toxin stage 2 removes about five to eight percent after prep', () => {
    const anthraxData = MONSTERS.find((monster) => monster.id === 'anthrax');
    if (!anthraxData) throw new Error('anthrax missing');

    const anthrax = createMonsterInstance(anthraxData);
    const boss = createBossInstance(0, 10);
    anthrax.effects.push({ kind: 'buff', stat: 'attack', pct: 25, turns: 99 });
    anthrax.moveStages = { anthrax_toxin: 1 };
    const toxinStage2 = currentMoveData(MOVES.anthrax_toxin, anthrax);

    const lowestRollPct = calculateDamage(anthrax, boss, toxinStage2, 0.85).damage / boss.maxHp;
    const highestRollPct = calculateDamage(anthrax, boss, toxinStage2, 1).damage / boss.maxHp;

    expect(lowestRollPct).toBeGreaterThanOrEqual(0.05);
    expect(highestRollPct).toBeLessThanOrEqual(0.08);
  });

  it('applies active attack and defense buffs to damage', () => {
    const normal = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1).damage;
    const buffedAttacker = createMonster({
      effects: [{ kind: 'buff', stat: 'attack', pct: 50, turns: 2 }],
    });
    const hardenedDefender = createMonster({
      ...capsuleTarget,
      effects: [{ kind: 'buff', stat: 'defense', pct: 50, turns: 2 }],
    });

    expect(calculateDamage(buffedAttacker, capsuleTarget, MOVES.hyaluronidase, 1).damage).toBeGreaterThan(normal);
    expect(calculateDamage(attacker, hardenedDefender, MOVES.hyaluronidase, 1).damage).toBeLessThan(normal);
  });

  it('blocks capsule capture against bosses', () => {
    const result = tryCapture({ ...capsuleTarget, isBoss: true }, 4, 0.1);

    expect(result.kind).toBe('blocked');
    expect(result.capsules).toBe(4);
  });

  it('preserves zero capsules on no-capsule capture attempts', () => {
    const result = tryCapture(capsuleTarget, 0, 0.1);

    expect(result.kind).toBe('noCapsules');
    expect(result.capsules).toBe(0);
  });

  it('uses hp loss to improve capsule capture chance', () => {
    const result = tryCapture(capsuleTarget, 2, 0.6);

    expect(result.kind).toBe('captured');
    expect(result.capsules).toBe(1);
  });

  it('spends exactly one capsule and reports missed captures', () => {
    const result = tryCapture(capsuleTarget, 2, 0.95);

    expect(result.kind).toBe('missed');
    expect(result.capsules).toBe(1);
  });

  it('adds the lysozyme note for gram-positive attackers', () => {
    const defender = createMonster({
      ability: 'lysozyme',
    });

    const result = calculateMultiplier(MOVES.hyaluronidase, attacker, defender);

    expect(result.total).toBe(0.5);
    expect(result.notes).toContain('라이소자임이 그람양성 태그를 반감했다');
  });

  it('clamps the type-table portion of multipliers to three', () => {
    const defender = createMonster({
      ability: 'acidfast',
      tags: { pathway: 'skin', wall: 'gram_positive', location: 'intracellular' },
    });

    const result = calculateMultiplier(MOVES.m_th1, attacker, defender);

    expect(result.total).toBe(3);
  });

  it('applies buff, field, heal, invuln, dot, and convert primitives', () => {
    const user = createMonster({ hp: 20 });
    const enemy = createMonster({ hp: 12 });
    const effects: EffectPrimitive[] = [
      { kind: 'buff', stat: 'attack', pct: 25, turns: 2, target: 'self' },
      { kind: 'field', side: 'incoming', factor: 0.5, turns: 3, target: 'enemy' },
      { kind: 'heal', pct: 50, target: 'self' },
      { kind: 'invuln', turns: 1, target: 'enemy' },
      { kind: 'dot', power: 4, turns: 2, target: 'enemy' },
      { kind: 'convert', power: 6, target: 'enemy' },
    ];

    applyEffects(user, enemy, effects);

    expect(user.hp).toBe(42);
    expect(user.effects).toEqual([{ kind: 'buff', stat: 'attack', pct: 25, turns: 2 }]);
    expect(enemy.effects).toEqual([
      { kind: 'field', side: 'incoming', factor: 0.5, turns: 3 },
      { kind: 'invuln', turns: 1 },
      { kind: 'dot', power: 4, turns: 2 },
      { kind: 'convert', power: 6, turns: 99 },
    ]);
  });

  it('applies confusion effects and stun status primitives', () => {
    const user = createMonster();
    const enemy = createMonster();
    const effects: EffectPrimitive[] = [
      { kind: 'status', status: 'confusion', chance: 1, turns: 2, target: 'enemy' },
      { kind: 'status', status: 'stun', chance: 1, target: 'enemy' },
    ];

    applyEffects(user, enemy, effects);

    expect(enemy.effects).toContainEqual({ kind: 'confusion', turns: 2 });
    expect(enemy.stunned).toBe(true);
  });

  it('stacks canonical status condition primitives separately from timed effects', () => {
    const user = createMonster();
    const enemy = createMonster();
    const effects: EffectPrimitive[] = [
      { kind: 'condition', condition: 'fever', chance: 1, stacks: 2, target: 'enemy' },
      { kind: 'condition', condition: 'fever', chance: 1, target: 'enemy' },
      { kind: 'condition', condition: 'necrosis', chance: 1, target: 'enemy' },
    ];

    applyEffects(user, enemy, effects);

    expect(enemy.statusConditions).toMatchObject({ fever: 3, necrosis: 1 });
    expect(effectiveMaxHp(enemy)).toBe(Math.floor(enemy.maxHp * 0.95));
  });

  it('applies dehydration, jaundice, fatigue, and immune abnormality in combat math', () => {
    const normalDamage = calculateDamage(attacker, capsuleTarget, MOVES.hyaluronidase, 1).damage;
    const dehydratedTarget = createMonster({ ...capsuleTarget, statusConditions: { dehydration: 2, jaundice: 1 } });
    const fatiguedAttacker = createMonster({ statusConditions: { fatigue: 2 } });
    const protectedTarget = createMonster({ ability: 'capsule', abilities: ['capsule'] });
    const eosinophilTarget = createMonster({ ability: 'capsule', abilities: ['capsule'], statusConditions: { immune_abnormal: 1 } });
    const abnormalTarget = createMonster({ ability: 'capsule', abilities: ['capsule'], statusConditions: { immune_abnormal: 2 } });

    expect(calculateDamage(attacker, dehydratedTarget, MOVES.hyaluronidase, 1).damage).toBeGreaterThan(normalDamage);
    expect(calculateDamage(fatiguedAttacker, capsuleTarget, MOVES.hyaluronidase, 1).damage).toBeLessThan(normalDamage);
    expect(calculateMultiplier(MOVES.m_phago, attacker, protectedTarget).total).toBe(0);
    expect(calculateMultiplier(MOVES.m_phago, attacker, eosinophilTarget).total).toBe(0);
    expect(calculateMultiplier(MOVES.m_phago, attacker, abnormalTarget).total).toBe(1.4);
  });

  it('uses edema, neurologic, paralysis, and itching stacks as status chance bonuses', () => {
    const target = createMonster({
      statusConditions: {
        edema: 2,
        neurologic: 1,
        paralysis: 2,
        itching: 3,
      },
    });

    expect(adjustedStatusChance(target, 0.2)).toBeCloseTo(0.22);
    expect(adjustedStatusChance(target, 0.2, 'confusion')).toBeCloseTo(0.32);
    expect(adjustedStatusChance(target, 0.2, 'stun')).toBeCloseTo(0.38);
  });

  it('advances staged moves after use and wraps after the final stage', () => {
    const battle: RunState = {
      floor: 5,
      bgmSeed: 1,
      mode: 'challenge',
      visualStyle: 'character',
      money: 0,
      capsules: 0,
      capsuleInventory: {
        universal: 0,
        virus: 0,
        bacteria: 0,
        parasite: 0,
        fungus: 0,
        protozoa: 0,
        prion: 0,
      },
      party: [
        createMonster({
          name: '탄저록스',
          moveset: ['anthrax_toxin'],
          moveStages: { anthrax_toxin: 2 },
        }),
      ],
      activeIndex: 0,
      enemy: createMonster({ hp: 999, maxHp: 999, moveset: ['coagulase'] }),
      encounterKind: 'trainer',
      phase: 'battle',
      lastLog: '',
    };

    const result = resolvePlayerMove(battle, 'anthrax_toxin', 1);

    expect(result.party[0].moveStages?.anthrax_toxin).toBe(0);
    expect(result.lastLog).toContain('LF(lethal factor)');
  });

  it('marks a signature move as used and blocks a second use in the same battle', () => {
    const battle = createBattleState({
      party: [
        createMonster({
          name: '탄저록스',
          moveset: ['capsule_formation'],
          signatureUnlocked: true,
        }),
      ],
      enemy: createMonster({ hp: 999, maxHp: 999, moveset: ['coagulase'] }),
      encounterKind: 'trainer',
    });

    const first = resolvePlayerMove(battle, 'capsule_formation', 1);
    const second = resolvePlayerMove(first, 'capsule_formation', 1);

    expect(first.party[0].usedSignatureMoveIds).toEqual(['capsule_formation']);
    expect(second.party[0].usedSignatureMoveIds).toEqual(['capsule_formation']);
    expect(second.lastLog).toContain('전투당 한 번');
  });

  it('does not add a symptom when a self-target signature has no symptom in the note', () => {
    const battle = createBattleState({
      party: [
        createMonster({
          name: '탄저록스',
          moveset: ['capsule_formation'],
          signatureUnlocked: true,
        }),
      ],
      enemy: createMonster({ hp: 999, maxHp: 999, moveset: ['coagulase'], symptoms: [] }),
      encounterKind: 'trainer',
    });

    const result = resolvePlayerMove(battle, 'capsule_formation', 1);

    expect(result.enemy?.symptoms).toEqual([]);
    expect(result.party[0].effects).toContainEqual({ kind: 'invuln', turns: 2 });
  });

  it('clears battle-only pathimon state after winning a battle', () => {
    const battle = createBattleState({
      party: [
        createMonster({
          effects: [{ kind: 'buff', stat: 'attack', pct: 25, turns: 3 }],
          statusConditions: { fever: 2 },
          symptoms: ['기침'],
          usedSignatureMoveIds: ['capsule_formation'],
        }),
      ],
      enemy: createMonster({ hp: 1, maxHp: 1, moveset: ['coagulase'] }),
      encounterKind: 'trainer',
    });

    const result = resolvePlayerMove(battle, 'hyaluronidase', 1);

    expect(result.phase).toBe('shop');
    expect(result.party[0].effects).toEqual([]);
    expect(result.party[0].statusConditions).toEqual({});
    expect(result.party[0].symptoms).toEqual([]);
    expect(result.party[0].usedSignatureMoveIds).toEqual([]);
  });

  it('keeps boss defeat dialogue out of the maintenance shop log', () => {
    const battle = createBattleState({
      enemy: createMonster({
        name: '면역챔피언',
        category: '보스 사람',
        moveset: ['m_phago'],
        moveSlots: ['m_phago', null, null, null],
        isBoss: true,
        isTrainer: true,
        hp: 1,
        maxHp: 999,
      }),
    });

    const result = resolvePlayerMove(battle, 'hyaluronidase', 1);

    expect(result.phase).toBe('shop');
    expect(result.battleResultLog).toContain('대응 체계');
    expect(result.lastLog).not.toContain('대응 체계');
    expect(result.lastLog).toContain('정비 구역');
  });

  it('ticks damage-over-time effects, expires timed effects, and grows convert each tick', () => {
    const monster = createMonster({
      hp: 30,
      effects: [
        { kind: 'dot', power: 4, turns: 2 },
        { kind: 'field', side: 'incoming', factor: 0.5, turns: 1 },
        { kind: 'invuln', turns: 1 },
        { kind: 'buff', stat: 'defense', pct: 50, turns: 3 },
        { kind: 'convert', power: 6, turns: 99 },
      ],
    });

    const damage = tickEffects(monster);

    expect(damage).toBe(10);
    expect(monster.hp).toBe(20);
    expect(monster.effects).toEqual([
      { kind: 'dot', power: 4, turns: 1 },
      { kind: 'buff', stat: 'defense', pct: 50, turns: 2 },
      { kind: 'convert', power: 9, turns: 98 },
    ]);
  });

  it('ticks canonical status condition damage and conditional status growth', () => {
    const monster = createMonster({
      maxHp: 100,
      hp: 100,
      statusConditions: {
        fever: 2,
        pain: 1,
        bleeding: 1,
        blood_pressure: 1,
        excretory_dysfunction: 1,
      },
    });

    const damage = tickEffects(monster, () => 0);

    expect(damage).toBe(9);
    expect(monster.hp).toBe(91);
    expect(monster.statusConditions?.dehydration).toBe(1);
  });

  it('reports turn-end status damage in the battle log', () => {
    const battle = createBattleState({
      party: [createMonster({ moveset: ['coagulase'], hp: 100, maxHp: 100 })],
      enemy: createMonster({
        name: '면역챔피언',
        category: '보스 사람',
        moveset: ['m_phago'],
        moveSlots: ['m_phago', null, null, null],
        isBoss: true,
        isTrainer: true,
        hp: 999,
        maxHp: 999,
        statusConditions: { fever: 1 },
      }),
    });

    const result = resolvePlayerMove(battle, 'coagulase', 1);

    expect(result.lastLog).toContain('면역챔피언은 상태이상에 의해 피해를 받고 있다');
    expect(result.enemy?.hp).toBeLessThan(999);
  });

  it('uses visual and hearing abnormality as 25% accuracy penalties', () => {
    const baseState: RunState = {
      floor: 5,
      bgmSeed: 1,
      mode: 'challenge',
      visualStyle: 'character',
      money: 0,
      capsules: 0,
      capsuleInventory: {
        universal: 0,
        virus: 0,
        bacteria: 0,
        parasite: 0,
        fungus: 0,
        protozoa: 0,
        prion: 0,
      },
      party: [createMonster({ moveset: ['hyaluronidase'] })],
      activeIndex: 0,
      enemy: createMonster({ hp: 999, maxHp: 999, moveset: ['coagulase'] }),
      encounterKind: 'trainer',
      phase: 'battle',
      lastLog: '',
    };

    const visualHit = resolvePlayerMove(
      { ...baseState, party: [createMonster({ moveset: ['hyaluronidase'], statusConditions: { blindness: 1 } })] },
      'hyaluronidase',
      1,
      0,
      0.74,
    );
    const hearingMiss = resolvePlayerMove(
      { ...baseState, party: [createMonster({ moveset: ['hyaluronidase'], statusConditions: { hearing_abnormal: 1 } })] },
      'hyaluronidase',
      1,
      0,
      0.75,
    );
    const sensoryMiss = resolvePlayerMove(
      { ...baseState, party: [createMonster({ moveset: ['hyaluronidase'], statusConditions: { blindness: 1, hearing_abnormal: 1 } })] },
      'hyaluronidase',
      1,
      0,
      0.5,
    );

    expect(visualHit.lastLog).not.toContain('시력 이상으로 빗나갔다');
    expect(hearingMiss.lastLog).toContain('청력 이상으로 빗나갔다');
    expect(sensoryMiss.lastLog).toContain('감각 이상으로 빗나갔다');
  });

  it('lets bosses choose a direct countermeasure move instead of always using the first move', () => {
    const battle = createBattleState({
      party: [createMonster({
        hp: 500,
        maxHp: 500,
        countermeasures: { direct: ['알벤다졸'], symptomTags: [] },
      })],
      enemy: createMonster({
        name: '면역챔피언',
        category: '보스 사람',
        moveset: ['m_interferon', 'm_anthelmintic'],
        moveSlots: ['m_interferon', 'm_anthelmintic', null, null],
        isBoss: true,
        isTrainer: true,
        attack: 12,
        hp: 999,
        maxHp: 999,
      }),
    });

    const result = resolvePlayerMove(battle, 'coagulase', 1);

    expect(result.lastLog).toContain('구충 신경마비');
    expect(result.lastLog).toContain('효과가 굉장했다');
    expect(result.party[0].hp).toBeLessThan(500);
  });

  it('does not seal boss moves after switching; damage is recalculated against the final active pathimon', () => {
    const battle = createBattleState({
      party: [
        createMonster({
          hp: 100,
          maxHp: 100,
          countermeasures: { direct: ['알벤다졸'], symptomTags: [] },
        }),
        createMonster({
          name: '비표적몬',
          hp: 100,
          maxHp: 100,
          countermeasures: { direct: [], symptomTags: [] },
        }),
      ],
      enemy: createMonster({
        name: '면역챔피언',
        category: '보스 사람',
        moveset: ['m_anthelmintic'],
        moveSlots: ['m_anthelmintic', null, null, null],
        plannedMoveId: 'm_anthelmintic',
        isBoss: true,
        isTrainer: true,
        attack: 12,
        hp: 999,
        maxHp: 999,
      }),
    });

    const result = resolveSwitchMonster(battle, 1, 1);

    expect(result.party[1].hp).toBeLessThan(100);
    expect(result.enemy?.sealedMoveIds ?? []).toEqual([]);
    expect(result.enemy?.bossMaintenanceQueued ?? false).toBe(false);
    expect(result.lastLog).not.toContain('봉인');
    expect(result.lastLog).not.toContain('효과가 굉장했다');
  });

  it('uses two telegraphed boss moves in phase two and both hit the final active pathimon', () => {
    const battle = createBattleState({
      party: [
        createMonster({
          hp: 500,
          maxHp: 500,
          countermeasures: { direct: ['알벤다졸'], symptomTags: [] },
        }),
        createMonster({
          name: '바이러스몬',
          hp: 100,
          maxHp: 100,
          countermeasures: { direct: ['인터페론'], symptomTags: [] },
        }),
      ],
      enemy: createMonster({
        name: '면역챔피언',
        category: '보스 사람',
        moveset: ['m_anthelmintic', 'm_interferon'],
        moveSlots: ['m_anthelmintic', 'm_interferon', null, null],
        plannedMoveIds: ['m_anthelmintic', 'm_interferon'],
        bossPhase2Activated: true,
        isBoss: true,
        isTrainer: true,
        attack: 12,
        hp: 400,
        maxHp: 999,
      }),
    });

    const result = resolvePlayerMove(battle, 'coagulase', 1);

    expect(result.lastLog).toContain('구충 신경마비');
    expect(result.lastLog).toContain('인터페론');
    expect(result.party[0].hp).toBeLessThan(500);
    expect(result.enemy?.plannedMoveIds).toHaveLength(2);
  });
  it('can resolve dyspnea as a turn-end instant collapse chance', () => {
    const monster = createMonster({
      hp: 30,
      statusConditions: { dyspnea: 1 },
    });

    const damage = tickEffects(monster, () => 0);

    expect(damage).toBe(30);
    expect(monster.fainted).toBe(true);
  });
});
