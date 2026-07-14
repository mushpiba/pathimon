import { tryCapture } from './capture';
import { calculateDamage, randomDamageVariance, type DamageResult } from './damage';
import { applyAttackTriggeredStatusDamage, applyEffects, tickEffects } from './effects';
import { ABILITIES } from '../data/abilities';
import { capsuleCanCatch, CAPSULE_LABELS, cloneCapsuleInventory, totalCapsules } from '../data/capsules';
import { createMaintenanceInventory } from '../data/shop';
import { clampHpToEffectiveMax, statusConditionStacks } from '../data/statusConditions';
import { TAG_LABELS } from '../data/labels';
import { MOVES } from '../data/moves';
import { MONSTERS } from '../data/monsters';
import { interpolatePathimonName } from '../game/text';
import { createMonsterInstance } from '../state/factory';
import { bossMoveEffectiveness, chooseBossMove, chooseEffectiveBossMove, createBossDefenseProfile } from './bossMatchup';
import { advanceStagedMove, currentMoveData, resolveMoveOutcome } from './moveStages';
import type { AbilityId, CapsuleId, HitEffectiveness, MoveData, MoveId, RunState, RuntimeMonster } from '../types/game';

const WIN_REWARD = 5;
const MAX_PARTY_SIZE = 6;

interface EnemyTurnResult {
  hitEffectiveness?: HitEffectiveness;
  log: string;
}

function cloneMonster(monster: RuntimeMonster): RuntimeMonster {
  return {
    ...monster,
    tags: { ...monster.tags },
    abilities: monster.abilities ? [...monster.abilities] : undefined,
    moveset: [...monster.moveset],
    moveSlots: monster.moveSlots ? [...monster.moveSlots] : undefined,
    moveStages: monster.moveStages ? { ...monster.moveStages } : undefined,
    plannedMoveId: monster.plannedMoveId,
    sealedMoveIds: monster.sealedMoveIds ? [...monster.sealedMoveIds] : undefined,
    bossMaintenanceQueued: monster.bossMaintenanceQueued,
    plannedMoveIds: monster.plannedMoveIds ? [...monster.plannedMoveIds] : undefined,
    bossPhase2Activated: monster.bossPhase2Activated,
    profileMemo: monster.profileMemo ? [...monster.profileMemo] : undefined,
    countermeasures: monster.countermeasures ? {
      direct: [...monster.countermeasures.direct],
      symptomTags: [...monster.countermeasures.symptomTags],
    } : undefined,
    effects: monster.effects.map((effect) => ({ ...effect })),
    statusConditions: monster.statusConditions ? { ...monster.statusConditions } : undefined,
    symptoms: monster.symptoms ? [...monster.symptoms] : undefined,
    usedSignatureMoveIds: monster.usedSignatureMoveIds ? [...monster.usedSignatureMoveIds] : undefined,
  };
}

function cloneState(state: RunState): RunState {
  return {
    ...state,
    capsuleInventory: cloneCapsuleInventory(state.capsuleInventory),
    wildRosterIds: state.wildRosterIds ? [...state.wildRosterIds] : undefined,
    bossRosterIds: state.bossRosterIds ? [...state.bossRosterIds] : undefined,
    party: state.party.map(cloneMonster),
    enemy: state.enemy ? cloneMonster(state.enemy) : null,
    pendingCapture: state.pendingCapture ? cloneMonster(state.pendingCapture) : undefined,
    shopInventory: state.shopInventory?.map((item) => ({ ...item })),
    shopRefreshCount: state.shopRefreshCount,
  };
}

function defenseAbilityIds(monster: RuntimeMonster): AbilityId[] {
  const abilities = monster.abilities?.length ? monster.abilities : [monster.ability];
  return abilities.filter((ability) => ability !== 'none');
}

function describeTags(monster: RuntimeMonster): string {
  const labels = (Object.values(monster.tags) as Array<keyof typeof TAG_LABELS | undefined>)
    .filter((tag): tag is keyof typeof TAG_LABELS => Boolean(tag))
    .map((tag) => TAG_LABELS[tag]);

  return labels.length > 0 ? labels.join(', ') : '태그 정보 없음';
}

function describeAbilities(monster: RuntimeMonster): string {
  const abilities = defenseAbilityIds(monster);
  return abilities.length > 0 ? abilities.map((abilityId) => ABILITIES[abilityId].name).join(', ') : '없음';
}

function defaultLearningDetail(state: RunState): string {
  const enemy = state.enemy;
  if (!enemy) {
    return '전투에서는 병원체의 외피, 위치, 방어기전을 함께 읽어야 합니다.';
  }

  return `${enemy.name}(${enemy.scientificName})은 ${enemy.category}이며 ${describeTags(enemy)} 특징을 가집니다. 방어특성은 ${describeAbilities(enemy)}입니다.`;
}

function playerMoveLearningDetail(state: RunState, move: MoveData, result: DamageResult): string {
  const noteText = result.multiplier.notes.length > 0 ? ` ${result.multiplier.notes.join(', ')}.` : '';
  return `${defaultLearningDetail(state)} ${move.name}은 ${move.learnText} 현재 상성 배율은 ${result.multiplier.total}배입니다.${noteText}`;
}

function withLearningFeedback(state: RunState, message: string, detail = defaultLearningDetail(state)): string {
  if (state.mode !== 'learning') {
    return message;
  }

  return `${message} 학습 피드백: ${detail}`;
}

function clearBattleOnlyState(monster: RuntimeMonster): RuntimeMonster {
  return {
    ...monster,
    effects: [],
    statusConditions: {},
    symptoms: [],
    stunned: false,
    fainted: monster.hp <= 0,
    usedSignatureMoveIds: [],
  };
}

function maintenanceVictoryLog(state: RunState): string {
  if (state.encounterKind === 'boss') {
    return '보스 전투에서 승리했습니다. 정비 구역에 도착했습니다.';
  }

  return '사람 전투에서 승리했습니다. 정비 구역에 도착했습니다.';
}

function pathimonMemoDetail(monster: RuntimeMonster): string {
  const memo = monster.profileMemo?.filter((line) => line.trim().length > 0) ?? [];
  if (memo.length > 0) return memo.slice(0, 2).join(' ');
  return `${monster.scientificName}은 ${monster.category} 타입입니다.`;
}

function floorClearLog(state: RunState, message: string, detail?: string): string {
  return [`${state.floor}층 클리어`, message, detail].filter((line): line is string => Boolean(line?.trim())).join('\n');
}

function setWinState(state: RunState, message: string, _learningDetail?: string, resultDetail?: string): RunState {
  const shouldOpenShop = state.mode === 'challenge' && (state.encounterKind === 'trainer' || state.encounterKind === 'boss');
  const reward = shouldOpenShop ? WIN_REWARD : 0;
  const battleResultLog = floorClearLog(state, message, resultDetail);

  return {
    ...state,
    money: state.money + reward,
    party: state.party.map(clearBattleOnlyState),
    phase: shouldOpenShop ? 'shop' : 'floorClear',
    lastLog: shouldOpenShop ? maintenanceVictoryLog(state) : battleResultLog,
    battleResultLog,
    shopInventory: shouldOpenShop ? createMaintenanceInventory(state.floor) : undefined,
    shopRefreshCount: shouldOpenShop ? 0 : undefined,
  };
}

function hasAvailableReplacement(state: RunState): boolean {
  return state.party.some((monster, index) => index !== state.activeIndex && monster.hp > 0 && !monster.fainted);
}

function setCollapsedState(state: RunState, actor: RuntimeMonster): RunState {
  if (hasAvailableReplacement(state)) {
    state.phase = 'forcedSwitch';
    state.lastLog = `${actor.name} 쓰러졌습니다. 다음 패시몬을 내보내세요.`;
    return state;
  }

  state.phase = 'defeat';
  state.lastLog = `${actor.name}이 쓰러졌습니다. 더 이상 전투 가능한 패시몬이 없습니다.`;
  return state;
}

function defeatedOpponentMessage(enemy: RuntimeMonster, byOngoingEffects = false): string {
  const cause = byOngoingEffects ? '지속 효과를 버티지 못하고 ' : '';

  if (enemy.isBoss) {
    return `${enemy.name}이 ${cause}"대응 체계를 다시 짜야겠군." 하고 물러났다.`;
  }

  if (enemy.isTrainer) {
    return `${enemy.name}이 ${cause}"여기까지입니다. 다음 대응안을 준비하겠습니다." 하고 물러났다.`;
  }

  return `${enemy.name}이 ${cause}쓰러졌다.`;
}

function markDamage(monster: RuntimeMonster, damage: number): void {
  monster.hp = Math.max(0, monster.hp - damage);
  clampHpToEffectiveMax(monster);
}

function hitEffectivenessFromMultiplier(total: number, blockedByInvulnerability = false): HitEffectiveness {
  if (blockedByInvulnerability || total <= 0) return 'none';
  return total > 1 ? 'super' : 'normal';
}

function statusDamageLog(actor: RuntimeMonster, actorDamage: number, enemy: RuntimeMonster, enemyDamage: number): string {
  const damagedNames: string[] = [];
  if (enemyDamage > 0) damagedNames.push(enemy.name);
  if (actorDamage > 0) damagedNames.push(actor.name);

  if (damagedNames.length === 0) {
    return '';
  }

  return ` ${damagedNames.map((name) => `${name}은 상태이상에 의해 피해를 받고 있다.`).join(' ')}`;
}

function appendSymptom(monster: RuntimeMonster, symptom?: string): void {
  if (!symptom) {
    return;
  }

  monster.symptoms = [...(monster.symptoms ?? []), symptom];
}

function isSignatureMoveId(moveId: MoveId): boolean {
  const move = MOVES[moveId];
  return Boolean(move?.signature || move?.kind === 'signature');
}

function signatureMoveUnavailableMessage(monster: RuntimeMonster, moveId: MoveId): string {
  if (!isSignatureMoveId(moveId)) return '';
  if (monster.signatureUnlocked !== true) return '전용기가 아직 해금되지 않았습니다.';
  if (monster.usedSignatureMoveIds?.includes(moveId)) return '전용기는 전투당 한 번만 사용할 수 있습니다.';
  return '';
}

function markSignatureMoveUsed(monster: RuntimeMonster, moveId: MoveId): void {
  if (!isSignatureMoveId(moveId)) return;
  const used = monster.usedSignatureMoveIds ?? [];
  monster.usedSignatureMoveIds = used.includes(moveId) ? used : [...used, moveId];
}

function formatMoveDescription(move: MoveData, actor: RuntimeMonster): string {
  return interpolatePathimonName(move.description, actor.name);
}

function sensoryMissLabel(actor: RuntimeMonster): string {
  const blindnessStacks = statusConditionStacks(actor, 'blindness');
  const hearingStacks = statusConditionStacks(actor, 'hearing_abnormal');
  if (blindnessStacks > 0 && hearingStacks > 0) return '감각 이상';
  if (hearingStacks > 0) return '청력 이상';
  return '시력 이상';
}

function missesFromSensoryAbnormality(actor: RuntimeMonster, roll = Math.random()): boolean {
  const sensoryStacks = statusConditionStacks(actor, 'blindness') + statusConditionStacks(actor, 'hearing_abnormal');
  if (sensoryStacks <= 0) {
    return false;
  }

  const hitChance = Math.max(0, 1 - sensoryStacks * 0.25);
  return roll >= hitChance;
}

function isHumanEnemy(enemy: RuntimeMonster): boolean {
  return Boolean(enemy.isBoss || enemy.isTrainer);
}

function bossUsesPhaseTwo(enemy: RuntimeMonster): boolean {
  return Boolean(enemy.isBoss && (enemy.bossPhase2Activated || enemy.hp <= enemy.maxHp / 2));
}

function availablePartyTargets(party: RuntimeMonster[], activeIndex: number): RuntimeMonster[] {
  return party.filter((monster, index) => index !== activeIndex && monster.hp > 0 && !monster.fainted);
}

function randomPartyTarget(party: RuntimeMonster[], activeIndex: number, random = Math.random): RuntimeMonster | undefined {
  const candidates = availablePartyTargets(party, activeIndex);
  if (candidates.length === 0) return undefined;
  const index = Math.min(candidates.length - 1, Math.max(0, Math.floor(random() * candidates.length)));
  return candidates[index];
}

function chooseMoveForTarget(
  enemy: RuntimeMonster,
  target: RuntimeMonster,
  movePool: MoveId[] = enemy.moveset,
  preferEffective = false,
): MoveId | undefined {
  const profile = createBossDefenseProfile(target);
  if (preferEffective) {
    return chooseEffectiveBossMove(movePool, profile) ?? chooseBossMove(movePool, profile);
  }
  return chooseBossMove(movePool, profile);
}

function planHumanMoves(
  enemy: RuntimeMonster,
  defender: RuntimeMonster,
  party: RuntimeMonster[] = [defender],
  activeIndex = 0,
): MoveId[] {
  if (!isHumanEnemy(enemy)) {
    return enemy.moveset[0] ? [enemy.moveset[0]] : [];
  }

  if (enemy.plannedMoveIds?.length) {
    return enemy.plannedMoveIds;
  }

  if (enemy.plannedMoveId) {
    enemy.plannedMoveIds = [enemy.plannedMoveId];
    return enemy.plannedMoveIds;
  }

  if (!bossUsesPhaseTwo(enemy)) {
    const planned = chooseMoveForTarget(enemy, defender);
    enemy.plannedMoveIds = planned ? [planned] : [];
    enemy.plannedMoveId = planned;
    return enemy.plannedMoveIds;
  }

  enemy.bossPhase2Activated = true;
  const first = chooseMoveForTarget(enemy, defender, enemy.moveset, true);
  const secondTarget = randomPartyTarget(party, activeIndex) ?? defender;
  const secondPool = first ? enemy.moveset.filter((moveId) => moveId !== first) : enemy.moveset;
  const second = chooseMoveForTarget(enemy, secondTarget, secondPool.length > 0 ? secondPool : enemy.moveset, true);
  const planned = [first, second].filter((moveId): moveId is MoveId => Boolean(moveId));

  enemy.plannedMoveIds = planned;
  enemy.plannedMoveId = planned[0];
  return planned;
}

function clearPlannedHumanMoves(enemy: RuntimeMonster): void {
  enemy.plannedMoveId = undefined;
  enemy.plannedMoveIds = [];
}

function resolveHumanMove(actor: RuntimeMonster, enemy: RuntimeMonster, moveId: MoveId, variance: number): EnemyTurnResult {
  const enemyMove = MOVES[moveId];
  if (!enemyMove) {
    return { log: `${enemy.name} could not act.` };
  }

  const stagedMove = currentMoveData(enemyMove, enemy);
  if (missesFromSensoryAbnormality(enemy)) {
    advanceStagedMove(enemy, enemyMove);
    applyAttackTriggeredStatusDamage(enemy);
    return { log: `${enemy.name}의 공격이 ${sensoryMissLabel(enemy)}으로 빗나갔다.` };
  }

  const resolvedMove = resolveMoveOutcome(stagedMove, Math.random());
  const effectiveness = bossMoveEffectiveness(resolvedMove, createBossDefenseProfile(actor));
  const enemyResult = calculateDamage(
    enemy,
    actor,
    resolvedMove,
    variance,
    { total: effectiveness.multiplier, notes: effectiveness.matchedTags },
  );

  markDamage(actor, enemyResult.damage);
  applyEffects(enemy, actor, resolvedMove.effects);
  appendSymptom(actor, resolvedMove.symptom);
  advanceStagedMove(enemy, enemyMove);
  applyAttackTriggeredStatusDamage(enemy);

  const label = effectiveness.kind === 'super'
    ? ' 효과가 굉장했다.'
    : effectiveness.kind === 'effective'
      ? ' 효과가 있다.'
      : '';

  return {
    hitEffectiveness: resolvedMove.power > 0 ? hitEffectivenessFromMultiplier(effectiveness.multiplier) : undefined,
    log: `${enemy.name}의 ${resolvedMove.name}! ${formatMoveDescription(resolvedMove, enemy)}${label}`,
  };
}

function resolveHumanTurn(
  actor: RuntimeMonster,
  enemy: RuntimeMonster,
  variance: number,
  party: RuntimeMonster[] = [actor],
  activeIndex = 0,
): EnemyTurnResult {
  const plannedMoveIds = planHumanMoves(enemy, actor, party, activeIndex);
  clearPlannedHumanMoves(enemy);

  if (plannedMoveIds.length === 0) {
    return { log: `${enemy.name} could not act.` };
  }

  const logs: string[] = [];
  let hitEffectiveness: EnemyTurnResult['hitEffectiveness'];

  for (const moveId of plannedMoveIds) {
    if (actor.hp <= 0) break;
    const result = resolveHumanMove(actor, enemy, moveId, variance);
    logs.push(result.log);
    hitEffectiveness = result.hitEffectiveness ?? hitEffectiveness;
  }

  return { hitEffectiveness, log: logs.join(' ') };
}
function resolveEnemyTurn(
  actor: RuntimeMonster,
  enemy: RuntimeMonster,
  variance: number,
  party: RuntimeMonster[] = [actor],
  activeIndex = 0,
): EnemyTurnResult {
  if (enemy.stunned) {
    enemy.stunned = false;
    return { log: `${enemy.name} is stunned.` };
  }

  if (isHumanEnemy(enemy)) {
    return resolveHumanTurn(actor, enemy, variance, party, activeIndex);
  }

  const enemyMoveId = enemy.moveset[0];
  const enemyMove = enemyMoveId ? MOVES[enemyMoveId] : undefined;
  if (!enemyMove) {
    return { log: `${enemy.name} could not act.` };
  }

  const stagedMove = currentMoveData(enemyMove, enemy);
  if (missesFromSensoryAbnormality(enemy)) {
    advanceStagedMove(enemy, enemyMove);
    applyAttackTriggeredStatusDamage(enemy);
    return { log: `${enemy.name}의 공격이 ${sensoryMissLabel(enemy)}으로 빗나갔다.` };
  }

  const resolvedMove = resolveMoveOutcome(stagedMove, Math.random());
  const enemyResult = calculateDamage(enemy, actor, resolvedMove, variance);
  markDamage(actor, enemyResult.damage);
  applyEffects(enemy, actor, resolvedMove.effects);
  appendSymptom(actor, resolvedMove.symptom);
  advanceStagedMove(enemy, enemyMove);
  applyAttackTriggeredStatusDamage(enemy);
  return {
    hitEffectiveness: resolvedMove.power > 0
      ? hitEffectivenessFromMultiplier(enemyResult.multiplier.total, enemyResult.blockedByInvulnerability)
      : undefined,
    log: formatMoveDescription(resolvedMove, enemy),
  };
}

function finishBattleRound(
  state: RunState,
  actor: RuntimeMonster,
  enemy: RuntimeMonster,
  actorLog: string,
  enemyTurn: EnemyTurnResult,
  learningDetail?: string,
): RunState {
  const actorEffectDamage = tickEffects(actor);
  const enemyEffectDamage = tickEffects(enemy);
  state.lastEnemyHitEffectiveness = enemyTurn.hitEffectiveness;

  if (enemy.hp <= 0) {
    return setWinState(state, defeatedOpponentMessage(enemy, true), learningDetail);
  }

  if (actor.hp <= 0) {
    return setCollapsedState(state, actor);
  }

  const effectLog = statusDamageLog(actor, actorEffectDamage, enemy, enemyEffectDamage);
  if (enemy.isBoss && enemy.hp > 0 && enemy.hp <= enemy.maxHp / 2) {
    enemy.bossPhase2Activated = true;
  }
  if (isHumanEnemy(enemy) && actor.hp > 0 && enemy.hp > 0) {
    planHumanMoves(enemy, actor, state.party, state.activeIndex);
  }
  state.phase = 'battle';
  state.battleResultLog = undefined;
  state.lastLog = withLearningFeedback(state, `${actorLog} ${enemyTurn.log}${effectLog}`, learningDetail);
  return state;
}

export function resolvePlayerMove(
  state: RunState,
  moveId: MoveId,
  variance = randomDamageVariance(),
  outcomeRoll = Math.random(),
  hitRoll = Math.random(),
): RunState {
  const nextState = cloneState(state);
  nextState.battleResultLog = undefined;
  nextState.lastEnemyHitEffectiveness = undefined;
  nextState.lastPlayerHitEffectiveness = undefined;
  const actor = nextState.party[nextState.activeIndex];
  const enemy = nextState.enemy;
  const move = MOVES[moveId];

  if (!actor || !enemy || !move) {
    return nextState;
  }

  const unavailableMessage = signatureMoveUnavailableMessage(actor, moveId);
  if (unavailableMessage) {
    nextState.phase = 'battle';
    nextState.lastLog = unavailableMessage;
    return nextState;
  }

  if (isHumanEnemy(enemy)) {
    planHumanMoves(enemy, actor, nextState.party, nextState.activeIndex);
  }

  const stagedMove = currentMoveData(move, actor);
  const resolvedMove = resolveMoveOutcome(stagedMove, outcomeRoll);
  markSignatureMoveUsed(actor, moveId);
  if (missesFromSensoryAbnormality(actor, hitRoll)) {
    advanceStagedMove(actor, move);
    applyAttackTriggeredStatusDamage(actor);
    const enemyLog = resolveEnemyTurn(actor, enemy, variance, nextState.party, nextState.activeIndex);
    return finishBattleRound(
      nextState,
      actor,
      enemy,
      `${actor.name}의 공격이 ${sensoryMissLabel(actor)}으로 빗나갔다.`,
      enemyLog,
      defaultLearningDetail(nextState),
    );
  }

  const result = calculateDamage(actor, enemy, resolvedMove, variance);
  nextState.lastPlayerHitEffectiveness = resolvedMove.power > 0
    ? hitEffectivenessFromMultiplier(result.multiplier.total, result.blockedByInvulnerability)
    : undefined;
  markDamage(enemy, result.damage);
  applyEffects(actor, enemy, resolvedMove.effects);
  appendSymptom(enemy, resolvedMove.symptom);
  advanceStagedMove(actor, move);
  applyAttackTriggeredStatusDamage(actor);
  const learningDetail = playerMoveLearningDetail(nextState, resolvedMove, result);

  if (enemy.hp <= 0) {
    return setWinState(nextState, defeatedOpponentMessage(enemy), learningDetail);
  }

  const enemyLog = resolveEnemyTurn(actor, enemy, variance, nextState.party, nextState.activeIndex);
  const actorLog = formatMoveDescription(resolvedMove, actor);
  return finishBattleRound(nextState, actor, enemy, actorLog, enemyLog, learningDetail);
}

export function resolvePassEncounter(state: RunState): RunState {
  const nextState = cloneState(state);
  const enemy = nextState.enemy;

  if (!enemy || nextState.encounterKind !== 'wild') {
    nextState.lastLog = '지금은 지나갈 수 없습니다.';
    return nextState;
  }

  nextState.phase = 'floorClear';
  nextState.party = nextState.party.map(clearBattleOnlyState);
  nextState.lastLog = floorClearLog(
    nextState,
    `${enemy.name}와 거리를 두고 지나갔다.`,
    pathimonMemoDetail(enemy),
  );
  return nextState;
}

export function resolveForcedSwitchMonster(state: RunState, targetIndex: number): RunState {
  const nextState = cloneState(state);
  const target = nextState.party[targetIndex];

  if (nextState.phase !== 'forcedSwitch' || !target || targetIndex === nextState.activeIndex || target.fainted || target.hp <= 0) {
    nextState.lastLog = '다음 패시몬을 선택해야 합니다.';
    return nextState;
  }

  nextState.activeIndex = targetIndex;
  nextState.phase = 'battle';
  if (nextState.enemy && isHumanEnemy(nextState.enemy)) {
    clearPlannedHumanMoves(nextState.enemy);
    planHumanMoves(nextState.enemy, target, nextState.party, targetIndex);
  }
  nextState.lastLog = `${target.name}이 나왔다.`;
  return nextState;
}

export function resolveSwitchMonster(state: RunState, targetIndex: number, variance = randomDamageVariance()): RunState {
  const nextState = cloneState(state);
  const target = nextState.party[targetIndex];
  const enemy = nextState.enemy;

  if (!enemy || !target || targetIndex === nextState.activeIndex || target.fainted || target.hp <= 0) {
    nextState.lastLog = '교체할 패시몬이 없습니다.';
    return nextState;
  }

  nextState.activeIndex = targetIndex;
  if (nextState.encounterKind === 'wild') {
    nextState.phase = 'battle';
    nextState.lastLog = `${target.name} switched in.`;
    return nextState;
  }

  if (isHumanEnemy(enemy)) {
    const currentActor = state.party[state.activeIndex];
    if (currentActor) planHumanMoves(enemy, currentActor, state.party, state.activeIndex);
  }

  const enemyLog = resolveEnemyTurn(target, enemy, variance, nextState.party, targetIndex);
  return finishBattleRound(nextState, target, enemy, `${target.name} switched in.`, enemyLog, defaultLearningDetail(nextState));
}

export function resolveCapsuleAction(state: RunState, rollOrCapsule: number | CapsuleId, maybeRoll?: number): RunState {
  const nextState = cloneState(state);
  const enemy = nextState.enemy;
  const capsuleId: CapsuleId = typeof rollOrCapsule === 'string' ? rollOrCapsule : 'universal';
  const roll = typeof rollOrCapsule === 'number' ? rollOrCapsule : maybeRoll ?? Math.random();

  if (!enemy) {
    return nextState;
  }

  if (enemy.isTrainer) {
    nextState.phase = 'battle';
    nextState.lastLog = '사람 전투에서는 캡슐을 던질 수 없습니다.';
    return nextState;
  }

  const learningMode = nextState.mode === 'learning';
  const selectedCount = nextState.capsuleInventory[capsuleId] ?? 0;

  if (!capsuleCanCatch(capsuleId, enemy)) {
    nextState.phase = 'battle';
    nextState.lastLog = '패시몬 타입이 맞지 않습니다.';
    return nextState;
  }

  if (!learningMode && selectedCount <= 0) {
    nextState.phase = 'battle';
    nextState.lastLog = `${CAPSULE_LABELS[capsuleId]}이 없습니다.`;
    return nextState;
  }

  const attemptCapsules = learningMode ? Math.max(1, selectedCount) : selectedCount;
  const result = tryCapture(enemy, attemptCapsules, roll);
  if (!learningMode) {
    nextState.capsuleInventory[capsuleId] = result.capsules;
    nextState.capsules = totalCapsules(nextState.capsuleInventory);
  }

  if (result.kind === 'captured') {
    const capturedData = MONSTERS.find((monster) => monster.id === enemy.templateId);
    if (!capturedData) {
      throw new Error(`Unknown captured monster: ${enemy.templateId}`);
    }

    const captured = createMonsterInstance(capturedData);
    captured.signatureUnlocked = nextState.mode === 'learning';
    if (nextState.party.length >= MAX_PARTY_SIZE) {
      nextState.pendingCapture = captured;
      nextState.phase = 'releaseCapture';
      nextState.lastLog = `${enemy.name}을 포획했습니다. 놓아줄 패시몬을 선택하세요.`;
      return nextState;
    }

    nextState.party.push(captured);
    return setWinState(nextState, `${enemy.name}을 포획했습니다.`, undefined, pathimonMemoDetail(enemy));
  }

  nextState.phase = 'battle';

  if (result.kind === 'blocked') {
    nextState.lastLog = `${enemy.name} cannot be captured.`;
    return nextState;
  }

  if (result.kind === 'noCapsules') {
    nextState.lastLog = 'No capsules remain.';
    return nextState;
  }

  nextState.lastLog = `${enemy.name} broke free.`;
  return nextState;
}

export function resolveCaptureRelease(state: RunState, releaseIndex: number): RunState {
  const nextState = cloneState(state);
  const pendingCapture = nextState.pendingCapture;

  if (nextState.phase !== 'releaseCapture' || !pendingCapture || !nextState.party[releaseIndex]) {
    nextState.lastLog = '놓아줄 패시몬을 선택해야 합니다.';
    return nextState;
  }

  const releasedName = nextState.party[releaseIndex].name;
  nextState.party[releaseIndex] = pendingCapture;
  nextState.pendingCapture = undefined;
  nextState.party = nextState.party.map(clearBattleOnlyState);
  nextState.phase = 'floorClear';
  nextState.lastLog = `${releasedName}을 놓아주고 ${pendingCapture.name}을 데려갑니다.`;
  return nextState;
}

export function cancelPendingCapture(state: RunState): RunState {
  const nextState = cloneState(state);
  const pendingName = nextState.pendingCapture?.name ?? '포획한 패시몬';

  nextState.pendingCapture = undefined;
  nextState.party = nextState.party.map(clearBattleOnlyState);
  nextState.phase = 'floorClear';
  nextState.lastLog = `${pendingName}을 보내주고 다음 층으로 향합니다.`;
  return nextState;
}
