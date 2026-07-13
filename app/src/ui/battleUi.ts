import { ABILITIES } from '../data/abilities';
import { BOSS_ATTACK_MATCHUPS, type BossDefenseTrait } from '../data/bossAttackMatchups';
import { EFFECTIVENESS } from '../data/effectiveness';
import { ATTACK_TYPE_LABELS, TAG_LABELS } from '../data/labels';
import { MOVES } from '../data/moves';
import { effectiveMaxHp, statusConditionLabels } from '../data/statusConditions';
import { currentMoveData, currentMoveName } from '../battle/moveStages';
import { interpolatePathimonName } from '../game/text';
import type { AbilityId, CapsuleId, EffectPrimitive, EncounterKind, MoveData, MoveId, MoveSlot, RunMode, RuntimeMonster, TagValue, VisualStyle } from '../types/game';

export type BattleActionId = 'fight' | 'pass' | 'capsule' | 'dex' | 'party';
export type PartyMenuPurpose = 'switch' | 'forced' | 'release';

export interface BattleActionOption {
  disabled?: boolean;
  id: BattleActionId;
  label: string;
}

const PATHIMON_TYPE_BORDER_COLORS: Record<string, number> = {
  바이러스: 0xeff3f7,
  세균: 0x409bf4,
  '세균 병원형': 0x409bf4,
  '세균 내성형': 0x409bf4,
  박테리아: 0x409bf4,
  진균: 0x181818,
  곰팡이: 0x181818,
  원충: 0x21167e,
  원생동물: 0x21167e,
  프로토조아: 0x21167e,
  연충: 0xeaab1d,
  선충: 0xeaab1d,
  흡충: 0xeaab1d,
  조충: 0xeaab1d,
  기생충: 0xeaab1d,
  프리온: 0xa441bd,
};

export type PathimonTypeIconKind = 'virus' | 'bacteria' | 'fungus' | 'protozoa' | 'parasite' | 'prion';

export interface PathimonTypeIcon {
  assetPath: string;
  color: number;
  kind: PathimonTypeIconKind;
}

const PATHIMON_TYPE_ICONS: Record<string, PathimonTypeIcon> = {
  바이러스: { assetPath: pathimonTypeIconAssetPath('virus'), color: PATHIMON_TYPE_BORDER_COLORS.바이러스, kind: 'virus' },
  세균: { assetPath: pathimonTypeIconAssetPath('bacteria'), color: PATHIMON_TYPE_BORDER_COLORS.세균, kind: 'bacteria' },
  '세균 병원형': { assetPath: pathimonTypeIconAssetPath('bacteria'), color: PATHIMON_TYPE_BORDER_COLORS['세균 병원형'], kind: 'bacteria' },
  '세균 내성형': { assetPath: pathimonTypeIconAssetPath('bacteria'), color: PATHIMON_TYPE_BORDER_COLORS['세균 내성형'], kind: 'bacteria' },
  박테리아: { assetPath: pathimonTypeIconAssetPath('bacteria'), color: PATHIMON_TYPE_BORDER_COLORS.박테리아, kind: 'bacteria' },
  진균: { assetPath: pathimonTypeIconAssetPath('fungus'), color: PATHIMON_TYPE_BORDER_COLORS.진균, kind: 'fungus' },
  곰팡이: { assetPath: pathimonTypeIconAssetPath('fungus'), color: PATHIMON_TYPE_BORDER_COLORS.곰팡이, kind: 'fungus' },
  원충: { assetPath: pathimonTypeIconAssetPath('protozoa'), color: PATHIMON_TYPE_BORDER_COLORS.원충, kind: 'protozoa' },
  원생동물: { assetPath: pathimonTypeIconAssetPath('protozoa'), color: PATHIMON_TYPE_BORDER_COLORS.원생동물, kind: 'protozoa' },
  프로토조아: { assetPath: pathimonTypeIconAssetPath('protozoa'), color: PATHIMON_TYPE_BORDER_COLORS.프로토조아, kind: 'protozoa' },
  연충: { assetPath: pathimonTypeIconAssetPath('parasite'), color: PATHIMON_TYPE_BORDER_COLORS.연충, kind: 'parasite' },
  선충: { assetPath: pathimonTypeIconAssetPath('parasite'), color: PATHIMON_TYPE_BORDER_COLORS.선충, kind: 'parasite' },
  흡충: { assetPath: pathimonTypeIconAssetPath('parasite'), color: PATHIMON_TYPE_BORDER_COLORS.흡충, kind: 'parasite' },
  조충: { assetPath: pathimonTypeIconAssetPath('parasite'), color: PATHIMON_TYPE_BORDER_COLORS.조충, kind: 'parasite' },
  기생충: { assetPath: pathimonTypeIconAssetPath('parasite'), color: PATHIMON_TYPE_BORDER_COLORS.기생충, kind: 'parasite' },
  프리온: { assetPath: pathimonTypeIconAssetPath('prion'), color: PATHIMON_TYPE_BORDER_COLORS.프리온, kind: 'prion' },
};

export type BattleUnitPanelRole = 'player' | 'enemy';
export type BattleUnitPanelRowKind = 'heading' | 'name' | 'scientificName' | 'defense' | 'status' | 'symptoms';

export interface BattleUnitPanelRow {
  kind: BattleUnitPanelRowKind;
  text: string;
}
export interface BattleSceneAssets {
  grassBack: string;
  grassMid: string;
  grassFront: string;
}

export interface BattleMonsterAssets {
  back: string;
  front: string;
}

export interface BattleImageLayerLayout {
  scale: number;
  x: number;
  y: number;
}

export interface BattleFieldLayerLayout {
  background: BattleImageLayerLayout;
  enemyPlatform: BattleImageLayerLayout;
  playerPlatform: BattleImageLayerLayout;
}

export interface BattleBgmAssets {
  boss: string[];
  normal: string[];
}

export interface BattleSfxAssets {
  blockedLaugh: string;
  faint: string;
  flee: string;
  hit: string;
  hitStrong: string;
  statUp: string;
}

export function battleActionOptions(encounterKind: EncounterKind = 'wild'): BattleActionOption[] {
  if (encounterKind === 'wild') {
    return [
      { id: 'pass', label: '지나간다' },
      { id: 'capsule', label: '캡슐' },
      { id: 'dex', label: '도감' },
      { id: 'party', label: '패시몬' },
    ];
  }

  return [
    { id: 'fight', label: '싸운다' },
    { id: 'dex', label: '도감' },
    { id: 'party', label: '패시몬' },
    { id: 'capsule', label: '캡슐 불가', disabled: true },
  ];
}

export function capsuleIconPath(capsuleId: CapsuleId): string {
  return `images/capsules/${capsuleId}.png`;
}

export function lockedMoveOverlayPath(): string {
  return 'images/ui/locked-move-chain.png';
}

export function pathimonTypeIconAssetPath(kind: PathimonTypeIconKind): string {
  return `images/ui/types/${kind}.png`;
}

export function pathimonTypeIconAssetPaths(): string[] {
  return [...new Set(Object.values(PATHIMON_TYPE_ICONS).map((icon) => icon.assetPath))];
}

export function battleFieldLayerLayouts(): BattleFieldLayerLayout {
  return {
    background: { x: 0, y: 0, scale: 3.2 },
    enemyPlatform: { x: 0, y: -18, scale: 3.2 },
    playerPlatform: { x: 0, y: -40, scale: 3.2 },
  };
}


export function battleSceneAssetPaths(): BattleSceneAssets {
  return {
    grassBack: 'images/arenas/grass_bg.png',
    grassMid: 'images/arenas/grass_a.png',
    grassFront: 'images/arenas/grass_b.png',
  };
}

export function battleBgmAssetPaths(): BattleBgmAssets {
  return {
    normal: [
      'audio/bgm/battle_wild.mp3',
      'audio/bgm/battle_wild_strong.mp3',
      'audio/bgm/battle_trainer.mp3',
      'audio/bgm/battle_kanto_gym.mp3',
      'audio/bgm/battle_johto_gym.mp3',
      'audio/bgm/battle_unova_gym.mp3',
      'audio/bgm/battle_colress.mp3',
    ],
    boss: [
      'audio/bgm/battle_final.mp3',
      'audio/bgm/battle_champion_iris.mp3',
      'audio/bgm/battle_galar_champion.mp3',
      'audio/bgm/battle_galactic_boss.mp3',
      'audio/bgm/battle_plasma_boss.mp3',
    ],
  };
}

export function chooseBattleBgm(input: { floor: number; isBoss: boolean; roll: number }): string {
  const assets = battleBgmAssetPaths();
  const pool = input.isBoss || input.floor % 10 === 0 ? assets.boss : assets.normal;

  const index = Math.min(
    pool.length - 1,
    Math.max(0, Math.floor(input.roll * pool.length)),
  );
  return pool[index];
}

export function battleSfxAssetPaths(): BattleSfxAssets {
  return {
    blockedLaugh: 'audio/se/evil_haha.wav',
    faint: 'audio/se/faint.wav',
    flee: 'audio/se/flee.wav',
    hit: 'audio/se/hit.wav',
    hitStrong: 'audio/se/hit_strong.wav',
    statUp: 'audio/se/stat_up.wav',
  };
}

export function pokerogueAtlasJsonPath(pngPath: string): string {
  return pngPath.replace(/\.png$/, '.json');
}

export function pathimonSpriteAssets(monster: RuntimeMonster, visualStyle: VisualStyle = 'character'): BattleMonsterAssets {
  if (monster.assetPath) {
    return {
      front: monster.assetPath,
      back: monster.assetPath,
    };
  }

  const assetId = monster.assetBaseId ?? monster.templateId;
  if (visualStyle === 'micro') {
    const front = `images/pathimon/${assetId}-micro-front.png`;
    return {
      front,
      back: front,
    };
  }

  return {
    front: `images/pathimon/${assetId}-front.png`,
    back: `images/pathimon/${assetId}-back.png`,
  };
}

export function combatSpriteScale(monster: RuntimeMonster, baseScale: number): number {
  return monster.isTrainer ? 2.75 : baseScale;
}

export function pathimonTypeBorderColor(monster: RuntimeMonster, mode: RunMode): number | undefined {
  if (mode !== 'challenge' || monster.isTrainer) {
    return undefined;
  }

  return PATHIMON_TYPE_BORDER_COLORS[monster.category];
}

export function pathimonTypeIcon(monster: RuntimeMonster, mode: RunMode): PathimonTypeIcon | undefined {
  if (mode !== 'challenge' || monster.isTrainer) {
    return undefined;
  }

  return PATHIMON_TYPE_ICONS[monster.category];
}

export function normalizedSpriteScale(baseScale: number, textureWidth: number, referenceWidth = 96): number {
  return textureWidth > referenceWidth ? baseScale * referenceWidth / textureWidth : baseScale;
}

export interface ButtonRectLayout {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface ButtonMarkerPoint {
  x: number;
  y: number;
}

export interface LabeledButtonLayout extends ButtonRectLayout {
  label: string;
}

export function cursorMarkerPoint(button: Pick<ButtonRectLayout, 'height' | 'x' | 'y'>): ButtonMarkerPoint {
  return {
    x: button.x - 18,
    y: button.y + button.height / 2,
  };
}

export function mobileHomeButtonLayout(): LabeledButtonLayout {
  return {
    x: 900,
    y: 538,
    width: 108,
    height: 28,
    label: '처음으로',
  };
}

export function mobileControlOverlayInteractive(input: { coarsePointer: boolean; hasTouch: boolean }): boolean {
  return input.hasTouch && input.coarsePointer;
}

export function partyMenuOptions(purpose: PartyMenuPurpose): string[] {
  if (purpose === 'release') return ['놓아준다', '능력치를 본다', '그만둔다'];
  if (purpose === 'forced') return ['능력치를 본다', '교체한다'];
  return ['능력치를 본다', '교체한다', '그만둔다'];
}

export interface BattlePanelLayout {
  height: number;
  width: number;
  x: number;
  y: number;
}

export interface BattleHpBarLayout {
  barWidth: number;
  barX: number;
  barY: number;
  percentX: number;
  percentY: number;
}

export interface BattleSpriteLayout {
  scale: number;
  x: number;
  y: number;
}

export function battleHpBarLayout(panel: BattlePanelLayout): BattleHpBarLayout {
  return {
    barX: panel.x + 82,
    barY: panel.y + 98,
    barWidth: panel.width - 126,
    percentX: panel.x + panel.width - 36,
    percentY: panel.y + 89,
  };
}

export function battleUnitPanelLayouts(): { enemy: BattlePanelLayout; player: BattlePanelLayout } {
  return {
    enemy: { x: 36, y: 20, width: 408, height: 148 },
    player: { x: 584, y: 244, width: 404, height: 124 },
  };
}

export function battleSpriteLayouts(): { enemy: BattleSpriteLayout; player: BattleSpriteLayout } {
  return {
    enemy: { x: 760, y: 218, scale: 2.5 },
    player: { x: 258, y: 382, scale: 2.1 },
  };
}

export interface PokedexMoveRow {
  accuracy: string;
  description: string;
  learnText: string;
  name: string;
  power: string;
  type: string;
}

export interface PokedexEffectivenessRow {
  attackType: string;
  multiplier: string;
  target: string;
}

export interface BattleMatchupSections {
  defense: PokedexEffectivenessRow[];
  offense: PokedexEffectivenessRow[];
}

export interface BossAttackMatchupRow {
  attackName: string;
  attackType: string;
  noneTargets: string;
  superTargets: string;
}

function labelEffectivenessTarget(target: AbilityId | TagValue): string {
  return ABILITIES[target as AbilityId]?.name ?? TAG_LABELS[target as TagValue] ?? target;
}

const BOSS_DEFENSE_TRAIT_LABELS: Partial<Record<BossDefenseTrait, string>> = {
  bacterial_cell_wall: '세균 세포벽',
  category_bacteria: '세균',
  category_fungus: '진균',
  category_parasite: '기생충',
  category_protozoa: '원생동물',
  category_virus: '바이러스',
  fungal_membrane: '진균막',
  large_body: '대형 병원체',
  no_cell_wall: '무세포벽',
  superantigen_axis: '초항원축',
  toxin_axis: '독소축',
  viral: '바이러스성',
};

function labelBossDefenseTrait(trait: BossDefenseTrait): string {
  return ABILITIES[trait as AbilityId]?.name
    ?? TAG_LABELS[trait as TagValue]
    ?? BOSS_DEFENSE_TRAIT_LABELS[trait]
    ?? trait;
}

function labelBossDefenseTraits(traits?: BossDefenseTrait[]): string {
  if (!traits?.length) return '없음';
  return traits.map(labelBossDefenseTrait).join(', ');
}

function labelMultiplier(multiplier: number): string {
  if (multiplier === 0) return '무효';
  if (multiplier > 1) return `강함 x${multiplier}`;
  if (multiplier < 1) return `약함 x${multiplier}`;
  return '보통 x1';
}

function formatMoveRow(moveId: MoveId, monster?: RuntimeMonster): PokedexMoveRow {
  const move = currentMoveData(MOVES[moveId], monster);
  return {
    name: move.name,
    type: moveTypeLabel(move),
    power: `${move.power}`,
    accuracy: `${Math.round(move.accuracy * 100)}%`,
    description: interpolateMoveText(move.description, monster),
    learnText: interpolateMoveText(move.learnText, monster),
  };
}

export function formatPokedexMoveRows(moveIds?: MoveId[], monster?: RuntimeMonster): PokedexMoveRow[] {
  const ids = moveIds ?? Object.keys(MOVES) as MoveId[];
  return ids.map((moveId) => formatMoveRow(moveId, monster));
}

export function formatPokedexEffectivenessRows(): PokedexEffectivenessRow[] {
  return Object.entries(EFFECTIVENESS).flatMap(([attackType, targets]) =>
    Object.entries(targets ?? {}).map(([target, multiplier]) => ({
      attackType: ATTACK_TYPE_LABELS[attackType as keyof typeof ATTACK_TYPE_LABELS],
      target: labelEffectivenessTarget(target as AbilityId | TagValue),
      multiplier: labelMultiplier(multiplier ?? 1),
    })),
  );
}

function battleMatchupTargets(monster: RuntimeMonster): Set<AbilityId | TagValue> {
  const abilities = (monster.abilities?.length ? monster.abilities : [monster.ability]).filter((ability) => ability !== 'none');
  const targets = new Set<AbilityId | TagValue>(abilities);
  Object.values(monster.tags).forEach((tag) => {
    if (tag) targets.add(tag);
  });
  return targets;
}

function formatStrongRowsForMonster(monster: RuntimeMonster): PokedexEffectivenessRow[] {
  const targetsToShow = battleMatchupTargets(monster);

  return Object.entries(EFFECTIVENESS)
    .flatMap(([attackType, targets]) =>
      Object.entries(targets ?? {})
        .filter(([target, multiplier]) => targetsToShow.has(target as AbilityId | TagValue) && (multiplier ?? 1) > 1)
        .map(([target, multiplier]) => ({
          attackType: ATTACK_TYPE_LABELS[attackType as keyof typeof ATTACK_TYPE_LABELS],
          target: labelEffectivenessTarget(target as AbilityId | TagValue),
          multiplier: labelMultiplier(multiplier ?? 1),
        })),
    )
    .sort((a, b) => `${a.target}${a.attackType}`.localeCompare(`${b.target}${b.attackType}`, 'ko'));
}

export function formatBattleMatchupSections(player: RuntimeMonster, enemy: RuntimeMonster): BattleMatchupSections {
  return {
    offense: formatStrongRowsForMonster(enemy),
    defense: formatStrongRowsForMonster(player),
  };
}

export function formatBossAttackMatchupRows(enemy: RuntimeMonster): BossAttackMatchupRow[] {
  const moveIds = battleMoveSlots(enemy).filter((moveId): moveId is MoveId => Boolean(moveId));
  return moveIds
    .map((moveId) => MOVES[moveId])
    .filter((move): move is MoveData => Boolean(move))
    .map((move) => {
      const matchup = BOSS_ATTACK_MATCHUPS[move.type];
      return {
        attackName: currentMoveName(move, enemy),
        attackType: ATTACK_TYPE_LABELS[move.type],
        superTargets: labelBossDefenseTraits(matchup?.super),
        noneTargets: labelBossDefenseTraits(matchup?.none),
      };
    });
}

export function enemyIntentText(enemy: RuntimeMonster): string {
  const move = MOVES[enemy.plannedMoveId ?? enemy.moveset[0]];
  if (!move) return `${enemy.name}은 공격을 준비하고 있다.`;
  return `${enemy.name}은 ${ATTACK_TYPE_LABELS[move.type]}(${move.name})을 하려고 한다.`;
}

export function commandViewLines(
  player: RuntimeMonster,
  enemy: RuntimeMonster,
  encounterKind: EncounterKind,
  notice: string,
  helperText: string,
): string[] {
  const lines = [`${player.name}은 무엇을 할까?`, notice || helperText];
  if (encounterKind !== 'wild') {
    lines.push(enemyIntentText(enemy));
  }
  return lines.filter((line) => line.length > 0);
}
interface MoveSelectionPressInput {
  armedMoveId: MoveId;
  moveId: MoveId;
  selectedMoveId: MoveId;
}

interface MoveSelectionPressResult {
  armedMoveId: MoveId;
  intent: 'execute' | 'preview';
  selectedMoveId: MoveId;
}

export function resolveMoveSelectionPress(input: MoveSelectionPressInput): MoveSelectionPressResult {
  const canExecute = input.armedMoveId === input.moveId && input.selectedMoveId === input.moveId;

  return {
    armedMoveId: input.moveId,
    intent: canExecute ? 'execute' : 'preview',
    selectedMoveId: input.moveId,
  };
}

export function hpPct(monster: RuntimeMonster): number {
  return monster.hp / effectiveMaxHp(monster);
}

export function hpPercentLabel(monster: RuntimeMonster): string {
  const pct = Math.max(0, Math.min(1, hpPct(monster)));
  return `${Math.round(pct * 100)}%`;
}

export function formatMoveName(moveId: MoveId, monster?: RuntimeMonster): string {
  return currentMoveName(MOVES[moveId], monster);
}

function interpolateMoveText(text: string, monster?: RuntimeMonster): string {
  return monster ? interpolatePathimonName(text, monster.name) : text;
}

function moveTypeLabel(move: MoveData): string {
  if (move.typeLabel) return move.typeLabel;
  if (move.kind === 'prep') return '준비';
  return ATTACK_TYPE_LABELS[move.type];
}

function primitiveEffectLabel(effect: EffectPrimitive): string {
  if (effect.kind === 'buff') return `${effect.stat === 'attack' ? '공격' : '방어'} ${effect.pct > 0 ? '+' : ''}${effect.pct}%`;
  if (effect.kind === 'condition') return `상태이상`;
  if (effect.kind === 'invuln') return `무적 ${effect.turns}턴`;
  if (effect.kind === 'dot') return `지속피해 ${effect.power}`;
  if (effect.kind === 'field') return '받는 피해 감소';
  if (effect.kind === 'heal') return `회복 ${effect.pct}%`;
  if (effect.kind === 'status') return effect.status === 'confusion' ? '혼란' : '마비';
  if (effect.kind === 'convert') return '전환';
  return '';
}

function moveEffectText(move: MoveData): string {
  if (move.effectText?.trim()) return move.effectText;
  const labels = move.effects?.map(primitiveEffectLabel).filter(Boolean) ?? [];
  return labels.length > 0 ? labels.join(', ') : '없음';
}

export function formatMoveDetails(moveId: MoveId, monster?: RuntimeMonster): string[] {
  const move = currentMoveData(MOVES[moveId], monster);
  const effect = `효과: ${moveEffectText(move)}`;
  return [
    move.name,
    effect,
    `위력: ${move.power}`,
    `명중률: ${Math.round(move.accuracy * 100)}%`,
    interpolateMoveText(move.description, monster),
    interpolateMoveText(move.learnText, monster),
  ];
}

export interface MoveDetailSections {
  description: string;
  effect: string;
  learnText: string;
  metadata: string;
  title: string;
}

export function formatMoveDetailSections(moveId: MoveId, monster?: RuntimeMonster): MoveDetailSections {
  const move = currentMoveData(MOVES[moveId], monster);
  const effect = `효과: ${moveEffectText(move)}`;
  return {
    title: move.name,
    metadata: `위력: ${move.power} · 명중률: ${Math.round(move.accuracy * 100)}%`,
    effect,
    description: interpolateMoveText(move.description, monster),
    learnText: interpolateMoveText(move.learnText, monster),
  };
}

export function statusProfileMemoLines(monster: RuntimeMonster): string[] {
  return monster.profileMemo?.filter((line) => line.trim().length > 0) ?? ['메모가 아직 정리되지 않았습니다.'];
}

export function battleMoveSlots(monster: RuntimeMonster): MoveSlot[] {
  return monster.moveSlots ?? monster.moveset.slice(0, 4);
}

export function isSignatureMove(moveId: MoveId): boolean {
  const move = MOVES[moveId];
  return Boolean(move.signature || move.kind === 'signature');
}

export function hasUsedSignatureMove(monster: RuntimeMonster, moveId: MoveId): boolean {
  return isSignatureMove(moveId) && Boolean(monster.usedSignatureMoveIds?.includes(moveId));
}

export function canUseBattleMove(monster: RuntimeMonster, moveId: MoveId): boolean {
  return !isSignatureMove(moveId) || (monster.signatureUnlocked === true && !hasUsedSignatureMove(monster, moveId));
}

export function battleMoveUnavailableReason(monster: RuntimeMonster, moveId: MoveId): string {
  if (!isSignatureMove(moveId)) return '';
  if (monster.signatureUnlocked !== true) return '전용기가 아직 해금되지 않았습니다.';
  if (hasUsedSignatureMove(monster, moveId)) return '전용기는 전투당 한 번만 사용할 수 있습니다.';
  return '';
}

export function firstUsableMove(monster: RuntimeMonster): MoveId {
  const move = battleMoveSlots(monster).find((moveId): moveId is MoveId => {
    if (!moveId) return false;
    return canUseBattleMove(monster, moveId);
  });
  return move ?? monster.moveset[0];
}

export function effectLabels(monster: RuntimeMonster): string[] {
  const timedLabels = monster.effects.map((effect) => {
    if (effect.kind === 'buff') {
      const stat = effect.stat === 'attack' ? '공격' : '방어';
      if (effect.rank) return `${stat} ${effect.rank > 0 ? '+' : ''}${effect.rank}`;
      return `${stat} ${effect.pct ?? 0}%`;
    }
    if (effect.kind === 'field') return '피해감소';
    if (effect.kind === 'invuln') return effect.turns ? `무적 ${effect.turns}턴` : '무적';
    if (effect.kind === 'dot') return '지속피해';
    if (effect.kind === 'convert') return '개종';
    return effect.kind;
  });

  return [...timedLabels, ...statusConditionLabels(monster)];
}

export function defenseTraitSummary(monster: RuntimeMonster): string {
  const abilities = (monster.abilities?.length ? monster.abilities : [monster.ability]).filter((ability) => ability !== 'none');
  return abilities.length > 0 ? abilities.map((ability) => ABILITIES[ability].name).join(' / ') : '없음';
}

function countedLabels(values: string[]): string[] {
  const counts = new Map<string, number>();
  const orderedLabels: string[] = [];

  values.forEach((value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    const match = trimmed.match(/^(.*?)\((\d+)\)$/);
    const label = match ? match[1].trim() : trimmed;
    const count = match ? Number(match[2]) : 1;
    if (!counts.has(label)) orderedLabels.push(label);
    counts.set(label, (counts.get(label) ?? 0) + (Number.isFinite(count) ? count : 1));
  });

  return orderedLabels.map((label) => {
    const count = counts.get(label) ?? 1;
    return count > 1 ? `${label}(${count})` : label;
  });
}

export function symptomSummary(monster: RuntimeMonster): string {
  const labels = countedLabels(monster.symptoms ?? []);
  return labels.length > 0 ? labels.join(', ') : '관찰 중';
}

export function statusSummary(monster: RuntimeMonster): string {
  const labels = effectLabels(monster);
  return labels.length > 0 ? `상태: ${labels.join(', ')}` : '상태: 정상';
}

export function battleUnitPanelRows(monster: RuntimeMonster, role: BattleUnitPanelRole): BattleUnitPanelRow[] {
  const rows: BattleUnitPanelRow[] = [];
  if (monster.isBoss) rows.push({ kind: 'heading', text: 'BOSS' });

  rows.push({ kind: 'name', text: monster.name });
  if (!monster.isTrainer) rows.push({ kind: 'scientificName', text: monster.scientificName });
  if (!monster.isTrainer || role !== 'player') rows.push({ kind: 'defense', text: `방어특성: ${defenseTraitSummary(monster)}` });
  rows.push({ kind: 'status', text: statusSummary(monster) });
  if (monster.isTrainer) rows.push({ kind: 'symptoms', text: `증상: ${symptomSummary(monster)}` });

  return rows;
}
