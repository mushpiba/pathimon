import Phaser from 'phaser';
import {
  cancelPendingCapture,
  resolveCapsuleAction,
  resolveCaptureRelease,
  resolveForcedSwitchMonster,
  resolvePassEncounter,
  resolvePlayerMove,
  resolveSwitchMonster,
} from '../battle/turn';
import { createBossRosterIds } from '../data/bosses';
import { CAPSULE_LABELS, CAPSULE_ORDER } from '../data/capsules';
import { advanceFromShop, createInitialRunState, enterBattle } from '../state/runState';
import type { CapsuleId, HitEffectiveness, MoveId, RunState, RuntimeMonster } from '../types/game';
import { COLORS, APP_WIDTH, APP_HEIGHT } from '../game/constants';
import {
  battleActionOptions,
  battleBgmAudioPaths,
  battleSfxAssetPaths,
  battleMoveUnavailableReason,
  battleFieldLayerLayouts,
  battleSceneAssetPaths,
  battleSpriteLayouts,
  battleUnitPanelLayouts,
  battleUnitPanelRows,
  battleMoveSlots,
  canUseBattleMove,
  capsuleIconPath,
  chooseBattleBgm,
  commandViewLines,
  combatSpriteScale,
  cursorMarkerPoint,
  defenseTraitSummary,
  firstUsableMove,
  formatBattleMatchupSections,
  formatBossAttackMatchupRows,
  formatMoveDetailSections,
  formatMoveDetails,
  formatMoveName,
  formatPokedexMoveRows,
  hpPct,
  hpPercentLabel,
  lockedMoveOverlayPath,
  mobileControlOverlayInteractive,
  mobileHomeButtonLayout,
  normalizedSpriteScale,
  partyMenuOptions,
  pathimonTypeBorderColor,
  pathimonTypeIconAssetPaths,
  pathimonTypeIcon,
  pathimonSpriteAssets,
  resolveMoveSelectionPress,
  shouldPreserveBattleBgm,
  statusProfileMemoLines,
} from '../ui/battleUi';
import type { BattleActionId, BattleUnitPanelRole, PartyMenuPurpose, PathimonTypeIcon } from '../ui/battleUi';
import { destroySceneChildren } from '../ui/sceneCleanup';
import { addBoxLabel, addLabel, drawHpBar, drawPanel } from '../ui/draw';

interface BattleSceneData {
  state?: RunState;
}

type BattleViewMode = 'command' | 'moves' | 'dex' | 'party' | 'status' | 'capsules';
type DexTab = 'moves' | 'effectiveness';
type StatusTab = 'profile' | 'moves';
type Direction = 'up' | 'down' | 'left' | 'right';

const BATTLE_AREA_BOTTOM = 386;
const BUTTON_FILL = 0x2f2840;
const BUTTON_ACTIVE_FILL = 0x4a405d;
const OVERLAY_FILL = 0x8d8198;
const OVERLAY_STROKE = 0xd8cde6;
const OVERLAY_TEXT = 0xce6b5e;
const BATTLE_EFFECT_DEPTH = 760;

export class BattleScene extends Phaser.Scene {
  private state!: RunState;
  private selectedMoveId!: MoveId;
  private armedMoveId!: MoveId;
  private viewMode: BattleViewMode = 'command';
  private dexTab: DexTab = 'moves';
  private statusTab: StatusTab = 'profile';
  private notice = '';
  private commandCursor = 0;
  private capsuleCursor = 0;
  private partyCursor = 0;
  private partyMenuOpen = false;
  private partyMenuCursor = 0;
  private statusMoveCursor = 0;
  private statusLearningOpen = false;
  private currentBgmKey = '';
  private selectedBgmKey = '';
  private preserveBattleBgmOnShutdown = false;
  private isAnimating = false;
  private enemyCombatSprite?: Phaser.GameObjects.Image | Phaser.GameObjects.Text;
  private playerCombatSprite?: Phaser.GameObjects.Image | Phaser.GameObjects.Text;

  constructor() {
    super('BattleScene');
  }

  init(data: BattleSceneData = {}): void {
    this.state = this.normalizeState(data.state);
    this.selectedMoveId = firstUsableMove(this.state.party[this.state.activeIndex]);
    this.armedMoveId = this.selectedMoveId;
    this.viewMode = 'command';
    this.dexTab = 'moves';
    this.statusTab = 'profile';
    this.notice = this.state.lastLog;
    this.commandCursor = 0;
    this.capsuleCursor = 0;
    this.partyCursor = this.state.activeIndex;
    this.partyMenuOpen = false;
    this.partyMenuCursor = 0;
    this.statusMoveCursor = 0;
    this.statusLearningOpen = false;
    this.currentBgmKey = '';
    this.selectedBgmKey = this.chooseBgmKey();
    this.preserveBattleBgmOnShutdown = false;
    this.isAnimating = false;
    this.enemyCombatSprite = undefined;
    this.playerCombatSprite = undefined;
  }

  preload(): void {
    this.queueBattleAssets();
  }

  create(): void {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => destroySceneChildren(this));
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.input.keyboard?.off('keydown', this.handleKeyboardDown);
      if (!this.preserveBattleBgmOnShutdown) {
        this.stopBattleBgm();
      }
    });
    this.setupKeyboardControls();
    this.playBattleBgm();
    this.render();
  }

  private normalizeState(state?: RunState): RunState {
    if (!state) {
      return enterBattle(createInitialRunState(), 1);
    }

    const normalizedState = {
      ...state,
      visualStyle: state.visualStyle ?? 'character',
    };

    if (normalizedState.phase === 'bossIntro') {
      return {
        ...normalizedState,
        phase: 'battle',
      };
    }

    if (normalizedState.phase === 'story') {
      return enterBattle(normalizedState);
    }

    return normalizedState;
  }

  private queueBattleAssets(): void {
    const sceneAssets = battleSceneAssetPaths();
    Object.values(sceneAssets).forEach((path) => this.queueImage(path));
    CAPSULE_ORDER.map(capsuleIconPath).forEach((path) => this.queueImage(path));
    pathimonTypeIconAssetPaths().forEach((path) => this.queueImage(path));
    this.queueImage(lockedMoveOverlayPath());

    this.queueAudio(this.selectedBgmKey);
    Object.values(battleSfxAssetPaths()).forEach((path) => this.queueAudio(path));

    const monsters = [...this.state.party];
    if (this.state.enemy) {
      monsters.push(this.state.enemy);
    }
    if (this.state.pendingCapture) {
      monsters.push(this.state.pendingCapture);
    }

    monsters.forEach((monster) => {
      const assets = pathimonSpriteAssets(monster, this.state.visualStyle);
      this.queueImage(assets.front);
      this.queueImage(assets.back);
    });
  }

  private queueImage(path: string): void {
    if (!this.textures.exists(path)) {
      this.load.image(path, path);
    }
  }

  private queueAudio(path: string): void {
    if (!this.cache.audio.exists(path)) {
      this.load.audio(path, path);
    }
  }


  private setupKeyboardControls(): void {
    this.input.keyboard?.on('keydown', this.handleKeyboardDown);
  }

  private chooseBgmKey(): string {
    return chooseBattleBgm({
      floor: this.state.floor,
      encounterKind: this.state.encounterKind,
      roll: Math.random(),
      seed: this.state.bgmSeed,
    });
  }

  private handleKeyboardDown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    if (key === 'arrowup' || key === 'w') {
      event.preventDefault();
      this.handleDirectionalInput('up');
    } else if (key === 'arrowdown' || key === 's') {
      event.preventDefault();
      this.handleDirectionalInput('down');
    } else if (key === 'arrowleft' || key === 'a') {
      event.preventDefault();
      this.handleDirectionalInput('left');
    } else if (key === 'arrowright' || key === 'd') {
      event.preventDefault();
      this.handleDirectionalInput('right');
    } else if (key === 'enter') {
      event.preventDefault();
      this.handleConfirmInput();
    } else if (key === 'backspace' || key === 'escape') {
      event.preventDefault();
      this.handleCancelInput();
    }
  };

  private playBattleBgm(): void {
    const bgmKey = this.selectedBgmKey || this.chooseBgmKey();

    this.stopBattleBgm(bgmKey);
    this.currentBgmKey = bgmKey;
    const existing = this.sound.get(bgmKey);
    if (existing?.isPlaying) {
      return;
    }

    const sound = existing ?? this.sound.add(bgmKey, { loop: true, volume: 0.35 });
    sound.play();
  }

  private stopBattleBgm(exceptKey = ''): void {
    battleBgmAudioPaths().forEach((key) => {
      if (key === exceptKey) return;
      const sound = this.sound.get(key);
      if (sound) sound.stop();
    });
    if (!exceptKey) this.currentBgmKey = '';
  }

  private render(): void {
    destroySceneChildren(this);

    const player = this.state.party[this.state.activeIndex];
    const enemy = this.state.enemy;

    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);

    if (!player || !enemy) {
      addLabel(this, 120, 140, '전투 대상을 불러오지 못했습니다.', 28);
      return;
    }

    this.syncSelectedMove(player);

    if (this.viewMode === 'status') {
      this.drawStatusView();
      this.drawMobileOverlay();
      return;
    }

    if (this.viewMode === 'party' || this.state.phase === 'forcedSwitch' || this.state.phase === 'releaseCapture') {
      this.drawPartyView();
      this.drawMobileOverlay();
      return;
    }

    this.drawBattlefield();
    this.drawCombatants(player, enemy);

    const unitLayout = battleUnitPanelLayouts();
    this.drawUnitPanel(unitLayout.enemy, enemy, 'enemy');
    this.drawUnitPanel(unitLayout.player, player, 'player');
    this.drawBottomWindow(player, enemy);
    this.drawFloorBadge();
    this.drawMobileOverlay();
  }

  private syncSelectedMove(player: RuntimeMonster): void {
    if (player.moveset.includes(this.selectedMoveId) && canUseBattleMove(player, this.selectedMoveId)) {
      return;
    }

    this.selectedMoveId = firstUsableMove(player);
    this.armedMoveId = this.selectedMoveId;
  }

  private drawBattlefield(): void {
    const assets = battleSceneAssetPaths();
    const layerLayout = battleFieldLayerLayouts();
    this.add.image(layerLayout.background.x, layerLayout.background.y, assets.grassBack)
      .setOrigin(0)
      .setScale(layerLayout.background.scale);
    this.add.rectangle(0, BATTLE_AREA_BOTTOM - 5, APP_WIDTH, 5, COLORS.line).setOrigin(0);
  }

  private drawCombatants(player: RuntimeMonster, enemy: RuntimeMonster): void {
    const assets = battleSceneAssetPaths();
    const layerLayout = battleFieldLayerLayouts();
    const spriteLayout = battleSpriteLayouts();
    const playerAssets = pathimonSpriteAssets(player, this.state.visualStyle);
    const enemyAssets = pathimonSpriteAssets(enemy, this.state.visualStyle);

    this.add.image(layerLayout.enemyPlatform.x, layerLayout.enemyPlatform.y, assets.grassFront)
      .setOrigin(0)
      .setScale(layerLayout.enemyPlatform.scale);
    this.enemyCombatSprite = this.drawMonsterSprite(
      enemy,
      enemyAssets.front,
      spriteLayout.enemy.x,
      spriteLayout.enemy.y,
      this.spriteScaleFor(enemy, spriteLayout.enemy.scale),
    );

    this.add.image(layerLayout.playerPlatform.x, layerLayout.playerPlatform.y, assets.grassMid)
      .setOrigin(0)
      .setScale(layerLayout.playerPlatform.scale);
    this.playerCombatSprite = this.drawMonsterSprite(player, playerAssets.back, spriteLayout.player.x, spriteLayout.player.y, spriteLayout.player.scale);
  }

  private drawMonsterSprite(
    monster: RuntimeMonster,
    textureKey: string,
    x: number,
    y: number,
    scale: number,
  ): Phaser.GameObjects.Image | Phaser.GameObjects.Text {
    if (this.textures.exists(textureKey)) {
      const frame = this.textures.getFrame(textureKey);
      const fittedScale = normalizedSpriteScale(scale, frame?.width ?? 96);
      return this.add.image(x, y, textureKey).setOrigin(0.5, 1).setScale(fittedScale);
    }

    return addLabel(this, x, y - 74, monster.glyph, 54).setOrigin(0.5);
  }

  private spriteScaleFor(monster: RuntimeMonster, baseScale: number): number {
    return combatSpriteScale(monster, baseScale);
  }

  private pathimonFrameBorderColor(monster: RuntimeMonster, fallback: number = COLORS.line): number {
    return pathimonTypeBorderColor(monster, this.state.mode) ?? fallback;
  }

  private drawPathimonPanel(
    x: number,
    y: number,
    width: number,
    height: number,
    monster: RuntimeMonster,
    strokeWidth = 4,
  ): Phaser.GameObjects.Rectangle {
    return drawPanel(this, x, y, width, height).setStrokeStyle(strokeWidth, this.pathimonFrameBorderColor(monster));
  }


  private drawUnitPanel(
    layout: { x: number; y: number; width: number; height: number },
    monster: RuntimeMonster,
    role: BattleUnitPanelRole,
  ): void {
    const { x, y, width, height } = layout;
    const borderColor = this.pathimonFrameBorderColor(monster);
    const typeIcon = pathimonTypeIcon(monster, this.state.mode);
    const textWidth = width - (typeIcon ? 128 : 36);
    const rows = battleUnitPanelRows(monster, role);

    this.drawPathimonPanel(x, y, width, height, monster).setAlpha(0.96);
    this.add.rectangle(x, y, width, 5, monster.isBoss ? 0xf0a43a : borderColor, 0.84).setOrigin(0);
    if (typeIcon) {
      this.drawPathimonTypeIcon(x + width - 82, y, 82, 54, typeIcon);
    }

    let textY = y + 10;
    rows.forEach((row) => {
      if (row.kind === 'heading') {
        addBoxLabel(this, x + 18, textY, row.text, { width: textWidth, height: 16, size: 13, minSize: 10, maxLines: 1 })
          .setAlpha(0.78);
        textY += 18;
      } else if (row.kind === 'name') {
        addBoxLabel(this, x + 18, textY, row.text, { width: textWidth, height: 24, size: 19, minSize: 13, maxLines: 1 });
        textY += 24;
      } else if (row.kind === 'scientificName') {
        addBoxLabel(this, x + 18, textY, row.text, { width: textWidth, height: 20, size: 13, minSize: 10, maxLines: 1 })
          .setAlpha(0.88);
        textY += 22;
      } else if (row.kind === 'defense') {
        addBoxLabel(this, x + 18, textY, row.text, { width: textWidth, height: 20, size: 13, minSize: 10, maxLines: 1 });
        textY += 22;
      }
    });

    const hpY = Math.min(y + height - 42, textY + 10);
    const hpWidth = width - (typeIcon ? 174 : 126);
    drawHpBar(this, x + 82, hpY, hpWidth, hpPct(monster));
    addLabel(this, x + width - 36, hpY - 9, hpPercentLabel(monster), 12).setAlpha(0.9);

    const statusRow = rows.find((row) => row.kind === 'status');
    if (statusRow) addBoxLabel(this, x + 18, hpY + 20, statusRow.text, { width: width - 36, height: 18, size: 12, minSize: 9, maxLines: 1 });
    const symptomsRow = rows.find((row) => row.kind === 'symptoms');
    if (symptomsRow) addBoxLabel(this, x + 18, hpY + 38, symptomsRow.text, { width: width - 36, height: 18, size: 12, minSize: 9, maxLines: 1 });
  }

  private drawPathimonTypeIcon(x: number, y: number, width: number, height: number, icon: PathimonTypeIcon): void {
    if (this.textures.exists(icon.assetPath)) {
      this.add.image(x, y, icon.assetPath).setOrigin(0).setDisplaySize(width, height);
      return;
    }

    const graphics = this.add.graphics();
    graphics.fillStyle(icon.color, 1);
    graphics.fillRect(x, y, width, height);
    graphics.lineStyle(3, 0x101014, 0.72);
    graphics.strokeRect(x + 1, y + 1, width - 2, height - 2);
  }

  private drawFloorBadge(light = false): void {
    const x = APP_WIDTH - 138;
    const y = 14;
    const fill = light ? 0xf7faf8 : 0x20202c;
    const stroke = light ? 0x20202c : 0x72d6ff;
    const color = light ? '#20202c' : '#ffffff';
    this.add.rectangle(x, y, 114, 32, fill, light ? 0.92 : 0.88)
      .setOrigin(0)
      .setStrokeStyle(2, stroke, 0.86)
      .setDepth(780);
    addBoxLabel(this, x + 57, y + 16, `${this.state.floor}층`, {
      width: 96,
      height: 22,
      size: 17,
      minSize: 12,
      maxLines: 1,
      align: 'center',
      origin: [0.5, 0.5],
      color,
    }).setDepth(781);
  }

  private drawBottomWindow(player: RuntimeMonster, enemy: RuntimeMonster): void {
    drawPanel(this, 0, BATTLE_AREA_BOTTOM, APP_WIDTH, APP_HEIGHT - BATTLE_AREA_BOTTOM);

    if (this.state.phase === 'forcedSwitch') {
      this.drawPartyView();
    } else if (this.state.phase === 'releaseCapture') {
      this.drawPartyView();
    } else if (this.state.phase === 'floorClear') {
      this.drawFloorClearView();
    } else if (this.state.phase === 'defeat') {
      this.drawDefeatView();
    } else if (this.viewMode === 'command') {
      this.drawCommandView(player, enemy);
    } else if (this.viewMode === 'moves') {
      this.drawMoveView(player);
    } else if (this.viewMode === 'capsules') {
      this.drawCapsuleView(player, enemy);
    } else if (this.viewMode === 'dex') {
      this.drawDexView(player, enemy);
    } else {
      this.drawPartyView();
    }
  }

  private drawCommandView(player: RuntimeMonster, enemy: RuntimeMonster): void {
    const helperText = this.state.encounterKind === 'wild'
      ? '야생 패시몬은 포획하거나 지나갈 수 있습니다.'
      : '사람 전투에서는 싸운다, 도감, 패시몬을 선택할 수 있습니다.';
    commandViewLines(player, enemy, this.state.encounterKind, this.notice, helperText).forEach((line, index) => {
      const fontSize = index === 0 ? 24 : index === 1 ? 17 : 15;
      addBoxLabel(this, index === 0 ? 34 : 36, 410 + index * 40, line, {
        width: 560,
        height: index === 0 ? 28 : 38,
        size: fontSize,
        minSize: index === 0 ? 17 : 11,
        maxLines: index === 0 ? 1 : 2,
      }).setAlpha(index === 0 ? 1 : 0.88);
    });

    battleActionOptions(this.state.encounterKind).forEach((option, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 646 + column * 164;
      const y = 420 + row * 56;
      const label = option.id === 'capsule' && !option.disabled ? this.capsuleButtonLabel() : option.label;
      this.drawMenuButton(x, y, 144, 42, label, () => {
        this.commandCursor = index;
        this.handleCommandAction(option.id);
      }, this.commandCursor === index, Boolean(option.disabled));
    });
  }

  private handleCommandAction(actionId: BattleActionId): void {
    if (actionId === 'fight') {
      this.viewMode = 'moves';
    } else if (actionId === 'pass') {
      this.state = resolvePassEncounter(this.state);
      this.notice = this.state.lastLog;
      this.afterBattleAction();
      return;
    } else if (actionId === 'capsule') {
      this.capsuleCursor = 0;
      this.viewMode = 'capsules';
      this.render();
      return;
    } else if (actionId === 'dex') {
      this.viewMode = 'dex';
    } else {
      this.openPartyView();
      this.viewMode = 'party';
    }
    this.render();
  }

  private drawMoveView(player: RuntimeMonster): void {
    addLabel(this, 34, 408, '기술', 22);
    battleMoveSlots(player).forEach((moveId, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 36 + column * 246;
      const y = 444 + row * 48;
      const selected = moveId === this.selectedMoveId;
      if (!moveId) {
        this.drawMenuButton(x, y, 220, 38, '---', () => undefined, false, true);
        return;
      }

      const locked = !canUseBattleMove(player, moveId);
      this.drawMenuButton(x, y, 220, 38, formatMoveName(moveId, player), () => this.handleMovePress(moveId), selected, locked);
      if (locked) {
        this.drawLockedMoveOverlay(x, y, 220, 38);
      }
    });

    this.drawMoveDetailPanel(player);

    this.drawMenuButton(858, 428, 112, 38, '도감', () => {
      this.viewMode = 'dex';
      this.render();
    });
    this.drawMenuButton(858, 480, 112, 38, '뒤로', () => {
      this.viewMode = 'command';
      this.render();
    });
  }

  private drawMoveDetailPanel(player: RuntimeMonster): void {
    const detail = formatMoveDetailSections(this.selectedMoveId, player);
    const panelX = 528;
    const panelY = 396;
    const panelWidth = 318;
    const textX = panelX + 18;
    const textWidth = panelWidth - 34;

    drawPanel(this, panelX, panelY, panelWidth, 166).setAlpha(0.98);
    addBoxLabel(this, textX, panelY + 14, detail.title, { width: textWidth, height: 24, size: 17, maxLines: 1 });
    addBoxLabel(this, textX, panelY + 42, detail.metadata, { width: textWidth, height: 18, size: 11, minSize: 10, maxLines: 1 })
      .setAlpha(0.9);
    addBoxLabel(this, textX, panelY + 64, detail.effect, { width: textWidth, height: 54, size: 11, minSize: 9, maxLines: 3 })
      .setAlpha(0.92);
    addBoxLabel(this, textX, panelY + 120, detail.description, { width: textWidth, height: 34, size: 11, minSize: 9, maxLines: 2 })
      .setAlpha(0.96);
  }

  private drawCapsuleView(player: RuntimeMonster, enemy: RuntimeMonster): void {
    addBoxLabel(this, 34, 412, `${enemy.name}에게 어떤 캡슐을 던질까?`, { width: 560, height: 30, size: 24, minSize: 16, maxLines: 1 });
    addBoxLabel(this, 36, 450, `대상 계열: ${enemy.category}`, { width: 560, height: 24, size: 17, minSize: 12, maxLines: 1 })
      .setAlpha(0.92);
    addBoxLabel(this, 36, 482, this.notice || `${player.name}은 캡슐을 준비했다.`, { width: 560, height: 48, size: 15, minSize: 11, maxLines: 2 })
      .setAlpha(0.84);

    const panelX = 642;
    const panelY = 92;
    const rowX = panelX + 58;
    const rowY = panelY + 58;
    drawPanel(this, panelX, panelY, 342, 422).setAlpha(0.98);
    addLabel(this, panelX + 28, panelY + 20, '캡슐', 24);

    CAPSULE_ORDER.forEach((capsuleId, index) => {
      const count = this.capsuleCountLabel(capsuleId);
      this.drawCapsuleRowButton(rowX, rowY + index * 42, 250, 34, capsuleId, `x${count}`, CAPSULE_LABELS[capsuleId], () => {
        this.capsuleCursor = index;
        this.handleCapsuleThrow(capsuleId);
      }, this.capsuleCursor === index);
    });

    this.drawMenuButton(rowX, panelY + 364, 250, 34, '취소', () => {
      this.viewMode = 'command';
      this.render();
    });
  }

  private drawDexView(player: RuntimeMonster, enemy: RuntimeMonster): void {
    addLabel(this, 34, 404, '도감', 21);
    addLabel(this, 34, 432, '현재 전투 기준', 14).setAlpha(0.86);
    this.drawMenuButton(34, 462, 84, 34, '기술 목록', () => {
      this.dexTab = 'moves';
      this.render();
    }, this.dexTab === 'moves');
    this.drawMenuButton(128, 462, 84, 34, '상성표', () => {
      this.dexTab = 'effectiveness';
      this.render();
    }, this.dexTab === 'effectiveness');

    drawPanel(this, 220, 400, 628, 150).setAlpha(0.98);
    if (this.dexTab === 'moves') {
      const moveIds = battleMoveSlots(player).filter((moveId): moveId is MoveId => Boolean(moveId));
      formatPokedexMoveRows(moveIds, player).forEach((row, index) => {
        const y = 411 + index * 34;
        addBoxLabel(this, 238, y, `${row.name} · ${row.type} · 위력 ${row.power} · 명중 ${row.accuracy}`, {
          width: 586,
          height: 18,
          size: 15,
          minSize: 12,
          maxLines: 1,
        });
        addBoxLabel(this, 238, y + 18, `${row.description} ${row.learnText}`, {
          width: 586,
          height: 16,
          size: 12,
          minSize: 10,
          maxLines: 1,
        }).setAlpha(0.88);
      });
    } else {
      if (enemy.isBoss) {
        addLabel(this, 238, 414, '보스 공격', 14).setAlpha(0.86);
        addLabel(this, 424, 414, '효과 굉장한 방어특성', 14).setAlpha(0.86);
        addLabel(this, 632, 414, '무효 방어특성', 14).setAlpha(0.86);
        this.drawBossMatchupRows(formatBossAttackMatchupRows(enemy), 238, 438, 586);
      } else {
        const sections = formatBattleMatchupSections(player, enemy);
        addLabel(this, 238, 414, '공격: 야생 패시몬 약점', 15);
        this.drawMatchupRows(sections.offense, 238, 440, 270);

        addLabel(this, 548, 414, '방어: 내 패시몬 약점', 15);
        this.drawMatchupRows(sections.defense, 548, 440, 270);
      }
    }

    this.drawMenuButton(852, 488, 120, 34, '뒤로', () => {
      this.viewMode = 'command';
      this.render();
    });
  }
  private drawMatchupRows(rows: ReturnType<typeof formatBattleMatchupSections>['offense'], x: number, y: number, width: number): void {
    if (rows.length === 0) {
      addBoxLabel(this, x, y, '효과 굉장한 항목 없음', { width, height: 18, size: 13, minSize: 10, maxLines: 1 })
        .setAlpha(0.76);
      return;
    }

    rows.slice(0, 3).forEach((row, index) => {
      const rowY = y + index * 32;
      addBoxLabel(this, x, rowY, `${row.attackType} → ${row.target}`, { width, height: 16, size: 13, minSize: 10, maxLines: 1 });
      addBoxLabel(this, x, rowY + 15, row.multiplier, { width, height: 16, size: 12, minSize: 10, maxLines: 1 })
        .setAlpha(0.78);
    });
  }

  private drawBossMatchupRows(rows: ReturnType<typeof formatBossAttackMatchupRows>, x: number, y: number, width: number): void {
    if (rows.length === 0) {
      addBoxLabel(this, x, y, '보스 공격 정보 없음', { width, height: 18, size: 13, minSize: 10, maxLines: 1 })
        .setAlpha(0.76);
      return;
    }

    rows.slice(0, 4).forEach((row, index) => {
      const rowY = y + index * 27;
      addBoxLabel(this, x, rowY, `${row.attackName} · ${row.attackType}`, {
        width: 170,
        height: 18,
        size: 12,
        minSize: 9,
        maxLines: 1,
      });
      addBoxLabel(this, x + 186, rowY, row.superTargets, {
        width: 194,
        height: 18,
        size: 11,
        minSize: 8,
        maxLines: 1,
      }).setAlpha(0.9);
      addBoxLabel(this, x + 394, rowY, row.noneTargets, {
        width: width - 394,
        height: 18,
        size: 11,
        minSize: 8,
        maxLines: 1,
      }).setAlpha(0.9);
    });
  }
  private handleMovePress(moveId: MoveId): void {
    if (this.isAnimating) {
      return;
    }

    const player = this.state.party[this.state.activeIndex];
    if (!canUseBattleMove(player, moveId)) {
      this.notice = battleMoveUnavailableReason(player, moveId);
      this.render();
      return;
    }

    const press = resolveMoveSelectionPress({
      armedMoveId: this.armedMoveId,
      moveId,
      selectedMoveId: this.selectedMoveId,
    });
    this.selectedMoveId = press.selectedMoveId;
    this.armedMoveId = press.armedMoveId;

    if (press.intent === 'preview') {
      this.render();
      return;
    }

    const previousState = this.state;
    this.state = resolvePlayerMove(this.state, moveId);
    this.notice = this.state.battleResultLog ?? this.state.lastLog;
    this.viewMode = 'command';
    this.playBattleResolutionCue(previousState, this.state, () => this.afterBattleAction());
  }

  private playBattleResolutionCue(previousState: RunState, nextState: RunState, onComplete: () => void): void {
    const previousEnemy = previousState.enemy;
    const nextEnemy = nextState.enemy;
    const previousPlayer = previousState.party[previousState.activeIndex];
    const nextPlayer = nextState.party[previousState.activeIndex];
    const enemyTookDamage = Boolean(previousEnemy && nextEnemy && nextEnemy.hp < previousEnemy.hp);
    const playerTookDamage = Boolean(previousPlayer && nextPlayer && nextPlayer.hp < previousPlayer.hp);
    const enemyDefeated = Boolean(previousEnemy && nextEnemy && previousEnemy.hp > 0 && nextEnemy.hp <= 0);
    const playerDefeated = Boolean(previousPlayer && nextPlayer && previousPlayer.hp > 0 && nextPlayer.hp <= 0);
    const playerHitKind = nextState.lastPlayerHitEffectiveness;
    const enemyHitKind = nextState.lastEnemyHitEffectiveness;

    if (!enemyTookDamage && !playerTookDamage && !enemyDefeated && !playerDefeated) {
      this.isAnimating = true;
      if (enemyHitKind === 'none') {
        this.playHitEffect('player', 'none', false);
      } else if (playerHitKind === 'none') {
        this.playHitEffect('enemy', 'none', false);
      } else {
        this.playSfx(battleSfxAssetPaths().statUp, 0.25);
      }
      this.time.delayedCall(enemyHitKind === 'none' || playerHitKind === 'none' ? 260 : 90, () => {
        this.isAnimating = false;
        onComplete();
      });
      return;
    }

    this.isAnimating = true;
    let finishDelay = 260;

    if (enemyTookDamage) {
      this.playHitEffect('enemy', playerHitKind ?? 'normal', enemyDefeated);
      finishDelay = enemyDefeated ? 760 : 320;
    }

    if (playerTookDamage && !enemyDefeated) {
      this.time.delayedCall(230, () => this.playHitEffect('player', enemyHitKind ?? 'normal', playerDefeated));
      finishDelay = Math.max(finishDelay, playerDefeated ? 980 : 560);
    }

    this.time.delayedCall(finishDelay, () => {
      this.isAnimating = false;
      onComplete();
    });
  }

  private playHitEffect(target: 'enemy' | 'player', kind: HitEffectiveness, defeated: boolean): void {
    const spriteLayout = battleSpriteLayouts();
    const layout = target === 'enemy' ? spriteLayout.enemy : spriteLayout.player;
    const hitX = layout.x;
    const hitY = layout.y - (target === 'enemy' ? 84 : 116);
    const sfx = battleSfxAssetPaths();

    if (kind === 'none') {
      this.playSfx(sfx.blockedLaugh, 0.48);
      this.drawBlockedFlash(hitX, hitY);
      this.shakeCombatSprite(target, 5);
      return;
    }

    const strong = kind === 'super';
    this.playSfx(strong ? sfx.hitStrong : sfx.hit, strong ? 0.5 : 0.42);
    this.drawImpactFlash(hitX, hitY, strong);
    this.shakeCombatSprite(target, strong ? 14 : 9);

    if (defeated) {
      this.time.delayedCall(140, () => {
        this.playSfx(sfx.faint, 0.48);
        this.playDefeatFade(target, hitX, hitY);
      });
    }
  }

  private drawBlockedFlash(x: number, y: number): void {
    const ring = this.add.circle(x, y, 10, 0x6b4b8d, 0.44).setDepth(BATTLE_EFFECT_DEPTH);
    ring.setStrokeStyle(3, 0xcaa7ff, 0.68);
    this.tweens.add({
      targets: ring,
      alpha: 0,
      scale: 3.8,
      duration: 260,
      ease: 'Quad.easeOut',
      onComplete: () => ring.destroy(),
    });

    for (let index = 0; index < 4; index += 1) {
      const wisp = this.add.text(x - 34 + index * 22, y - 18 + (index % 2) * 18, 'ha', {
        color: '#d6b9ff',
        fontFamily: '"Malgun Gothic", Arial, sans-serif',
        fontSize: '12px',
      }).setDepth(BATTLE_EFFECT_DEPTH + 1).setAlpha(0.72);
      this.tweens.add({
        targets: wisp,
        alpha: 0,
        y: wisp.y - 22,
        duration: 320,
        ease: 'Sine.easeOut',
        onComplete: () => wisp.destroy(),
      });
    }
  }

  private drawImpactFlash(x: number, y: number, strong: boolean): void {
    const color = strong ? 0xfff2a8 : 0xffffff;
    const ring = this.add.circle(x, y, 8, color, 0.72).setDepth(BATTLE_EFFECT_DEPTH);
    ring.setStrokeStyle(2, 0xff6658, 0.7);
    this.tweens.add({
      targets: ring,
      alpha: 0,
      scale: strong ? 5.4 : 3.6,
      duration: strong ? 300 : 220,
      ease: 'Quad.easeOut',
      onComplete: () => ring.destroy(),
    });

    [-1, 1].forEach((direction, index) => {
      const slash = this.add.rectangle(x + direction * 18, y - 8 + index * 16, strong ? 80 : 56, 5, 0xfff2f2, 0.86)
        .setDepth(BATTLE_EFFECT_DEPTH + 1)
        .setAngle(direction * -24);
      this.tweens.add({
        targets: slash,
        alpha: 0,
        x: slash.x + direction * 24,
        duration: 180,
        ease: 'Cubic.easeOut',
        onComplete: () => slash.destroy(),
      });
    });
  }

  private shakeCombatSprite(target: 'enemy' | 'player', distance: number): void {
    const sprite = target === 'enemy' ? this.enemyCombatSprite : this.playerCombatSprite;
    if (!sprite) return;

    this.tweens.add({
      targets: sprite,
      x: sprite.x + (target === 'enemy' ? distance : -distance),
      duration: 48,
      yoyo: true,
      repeat: 2,
      ease: 'Sine.easeInOut',
    });
  }

  private playDefeatFade(target: 'enemy' | 'player', x: number, y: number): void {
    const sprite = target === 'enemy' ? this.enemyCombatSprite : this.playerCombatSprite;
    const shadow = this.add.ellipse(x, y + 40, 92, 18, 0x101014, 0.28).setDepth(BATTLE_EFFECT_DEPTH - 1);
    if (sprite) {
      this.tweens.add({
        targets: sprite,
        alpha: 0,
        y: sprite.y + 28,
        scaleX: sprite.scaleX * 0.82,
        scaleY: sprite.scaleY * 0.58,
        duration: 460,
        ease: 'Sine.easeIn',
      });
    }
    this.tweens.add({
      targets: shadow,
      alpha: 0,
      scaleX: 0.45,
      duration: 460,
      ease: 'Sine.easeIn',
      onComplete: () => shadow.destroy(),
    });

    for (let index = 0; index < 9; index += 1) {
      const angle = (Math.PI * 2 * index) / 9;
      const spark = this.add.circle(x, y + 8, 3, index % 2 === 0 ? 0xfff2a8 : 0x8fd7ff, 0.85).setDepth(BATTLE_EFFECT_DEPTH + 2);
      this.tweens.add({
        targets: spark,
        alpha: 0,
        x: x + Math.cos(angle) * 56,
        y: y + 16 + Math.sin(angle) * 34,
        scale: 0.3,
        duration: 420,
        ease: 'Quad.easeOut',
        onComplete: () => spark.destroy(),
      });
    }
  }

  private playSfx(key: string, volume: number): void {
    if (this.cache.audio.exists(key)) {
      this.sound.play(key, { volume });
    }
  }

  private capsuleButtonLabel(): string {
    return this.state.mode === 'learning' ? '캡슐 ∞' : '캡슐 ' + this.state.capsules;
  }

  private capsuleCountLabel(capsuleId: CapsuleId): string {
    return this.state.mode === 'learning' ? '∞' : String(this.state.capsuleInventory[capsuleId] ?? 0);
  }

  private drawCapsuleRowButton(
    x: number,
    y: number,
    width: number,
    height: number,
    capsuleId: CapsuleId,
    countLabel: string,
    label: string,
    onClick: () => void,
    active = false,
  ): void {
    const rect = this.add.rectangle(x, y, width, height, active ? BUTTON_ACTIVE_FILL : BUTTON_FILL).setOrigin(0);
    rect.setStrokeStyle(2, active ? 0x72d6ff : COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerover', () => rect.setFillStyle(BUTTON_ACTIVE_FILL));
    rect.on('pointerout', () => rect.setFillStyle(active ? BUTTON_ACTIVE_FILL : BUTTON_FILL));
    rect.on('pointerdown', onClick);

    if (active) {
      const marker = cursorMarkerPoint({ x, y, height });
      this.drawCursorMarker(marker.x, marker.y);
    }

    const iconPath = capsuleIconPath(capsuleId);
    if (this.textures.exists(iconPath)) {
      this.add.image(x + 26, y + height / 2, iconPath)
        .setOrigin(0.5)
        .setDisplaySize(28, 28);
    }

    addLabel(this, x + 50, y + height / 2, countLabel, 14)
      .setOrigin(0, 0.5)
      .setAlpha(0.9);
    addBoxLabel(this, x + 98, y + height / 2, label, {
      width: width - 108,
      height: height - 8,
      size: 14,
      minSize: 10,
      maxLines: 1,
      origin: [0, 0.5],
    });
  }

  private formatDefenseTraits(monster: RuntimeMonster): string {
    return defenseTraitSummary(monster);
  }

  private formatSymptoms(monster: RuntimeMonster): string {
    return monster.symptoms?.length ? monster.symptoms.join(', ') : '관찰 중';
  }

  private openPartyView(): void {
    this.partyCursor = Math.min(this.state.activeIndex, Math.max(0, this.state.party.length - 1));
    this.partyMenuOpen = false;
    this.partyMenuCursor = 0;
    this.statusTab = 'profile';
  }

  private partyPurpose(): PartyMenuPurpose {
    if (this.state.phase === 'releaseCapture') return 'release';
    if (this.state.phase === 'forcedSwitch') return 'forced';
    return 'switch';
  }

  private drawPartyView(): void {
    this.clampPartyCursor();
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0x101a22).setOrigin(0);
    this.drawGridBackground();

    const purpose = this.partyPurpose();
    const selected = this.state.party[this.partyCursor];
    const prompt = purpose === 'release'
      ? `${this.state.pendingCapture?.name ?? '새 패시몬'}을 데려가려면 놓아줄 패시몬을 선택하세요.`
      : purpose === 'forced'
        ? '다음에 내보낼 패시몬을 선택하세요.'
        : '패시몬을 어떻게 하겠습니까?';

    addLabel(this, 28, 22, purpose === 'release' ? '포획 교체' : '패시몬', 34);
    this.drawFloorBadge();
    if (this.state.pendingCapture && purpose === 'release') {
      this.drawPendingCapturePreview(this.state.pendingCapture);
    }

    if (selected) {
      this.drawSelectedPartyPanel(selected);
    }

    this.state.party.slice(0, 6).forEach((monster, index) => {
      this.drawPartyListCard(monster, index, index === this.partyCursor);
    });

    drawPanel(this, 8, 496, 814, 70).setAlpha(0.98);
    addBoxLabel(this, 34, 514, prompt, { width: 760, height: 42, size: 25, minSize: 18, maxLines: 2 });
    this.drawMenuButton(846, 510, 142, 40, '그만둔다', () => this.cancelPartyView(), false, purpose === 'forced');

    if (this.partyMenuOpen && selected) {
      this.drawPartySubmenu(purpose);
    }
  }

  private drawGridBackground(): void {
    for (let x = 0; x < APP_WIDTH; x += 52) {
      this.add.rectangle(x, 0, 2, APP_HEIGHT, 0x2d3a45, 0.75).setOrigin(0);
    }
    for (let y = 0; y < APP_HEIGHT; y += 52) {
      this.add.rectangle(0, y, APP_WIDTH, 2, 0x2d3a45, 0.75).setOrigin(0);
    }
    for (let x = 0; x < APP_WIDTH; x += 26) {
      this.add.rectangle(x, 0, 1, APP_HEIGHT, 0x1b2831, 0.8).setOrigin(0);
    }
    for (let y = 0; y < APP_HEIGHT; y += 26) {
      this.add.rectangle(0, y, APP_WIDTH, 1, 0x1b2831, 0.8).setOrigin(0);
    }
  }

  private drawPendingCapturePreview(monster: RuntimeMonster): void {
    this.drawPathimonPanel(36, 66, 352, 92, monster).setAlpha(0.88);
    const assets = pathimonSpriteAssets(monster, this.state.visualStyle);
    this.drawMonsterSprite(monster, assets.front, 82, 146, 0.85);
    addBoxLabel(this, 128, 86, `새 포획: ${monster.name}`, { width: 238, height: 24, size: 18, minSize: 12, maxLines: 1 });
    addBoxLabel(this, 128, 116, monster.scientificName, { width: 238, height: 18, size: 12, minSize: 9, maxLines: 1 })
      .setAlpha(0.82);
  }

  private drawSelectedPartyPanel(monster: RuntimeMonster): void {
    this.drawPathimonPanel(36, 174, 352, 180, monster).setAlpha(0.92);
    const assets = pathimonSpriteAssets(monster, this.state.visualStyle);
    this.drawMonsterSprite(monster, assets.front, 94, 316, 1.45);
    addBoxLabel(this, 148, 204, monster.name, { width: 210, height: 28, size: 23, minSize: 14, maxLines: 1 });
    addBoxLabel(this, 148, 238, monster.scientificName, { width: 210, height: 20, size: 12, minSize: 9, maxLines: 1 })
      .setAlpha(0.84);
    addLabel(this, 148, 278, `HP ${monster.hp}/${monster.maxHp}`, 17);
    drawHpBar(this, 148, 314, 202, hpPct(monster));
  }

  private drawPartyListCard(monster: RuntimeMonster, index: number, selected: boolean): void {
    const x = 476;
    const y = 34 + index * 74;
    const width = 502;
    const height = 62;
    const unusable = monster.fainted || monster.hp <= 0;
    const rect = this.add.rectangle(x, y, width, height, selected ? 0x0b6280 : 0x07344d, unusable ? 0.45 : 0.92).setOrigin(0);
    rect.setStrokeStyle(selected ? 4 : 2, this.pathimonFrameBorderColor(monster, selected ? 0xffffff : 0x2ee9ff));
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerdown', () => {
      this.partyCursor = index;
      this.partyMenuOpen = true;
      this.partyMenuCursor = 0;
      this.render();
    });

    if (selected) {
      this.drawCursorMarker(x - 20, y + height / 2);
    }

    const assets = pathimonSpriteAssets(monster, this.state.visualStyle);
    this.drawMonsterSprite(monster, assets.front, x + 34, y + 57, 0.72);
    addBoxLabel(this, x + 78, y + 9, monster.name, { width: 200, height: 24, size: 19, minSize: 12, maxLines: 1 });
    addBoxLabel(this, x + 78, y + 36, index === this.state.activeIndex ? '현재' : unusable ? '기절' : '', {
      width: 90,
      height: 16,
      size: 12,
      minSize: 9,
      maxLines: 1,
    }).setAlpha(0.78);
    addLabel(this, x + 302, y + 12, 'HP', 15);
    drawHpBar(this, x + 346, y + 22, 124, hpPct(monster));
    addBoxLabel(this, x + 418, y + 34, `${monster.hp}/${monster.maxHp}`, { width: 74, height: 18, size: 13, minSize: 9, maxLines: 1 });
  }

  private drawPartySubmenu(purpose: PartyMenuPurpose): void {
    const options = partyMenuOptions(purpose);
    const x = 706;
    const y = Math.min(368, 92 + this.partyCursor * 54);
    const width = 250;
    const height = 24 + options.length * 42;
    drawPanel(this, x, y, width, height).setAlpha(0.98);

    options.forEach((label, index) => {
      this.drawMenuButton(x + 18, y + 16 + index * 42, width - 36, 34, label, () => {
        this.partyMenuCursor = index;
        this.handlePartyMenuOption(label);
      }, this.partyMenuCursor === index);
    });
  }

  private handlePartyMenuOption(label: string): void {
    if (label === '능력치를 본다') {
      this.statusTab = 'profile';
      this.statusMoveCursor = 0;
      this.statusLearningOpen = false;
      this.viewMode = 'status';
      this.partyMenuOpen = false;
      this.render();
      return;
    }

    if (label === '교체한다') {
      this.handlePartySwitch(this.partyCursor);
      return;
    }

    if (label === '놓아준다') {
      this.state = resolveCaptureRelease(this.state, this.partyCursor);
      this.notice = this.state.lastLog;
      this.partyMenuOpen = false;
      this.viewMode = 'command';
      this.afterBattleAction();
      return;
    }

    this.cancelPartyView();
  }

  private cancelPartyView(): void {
    if (this.partyMenuOpen) {
      this.partyMenuOpen = false;
      this.render();
      return;
    }

    if (this.state.phase === 'releaseCapture') {
      this.state = cancelPendingCapture(this.state);
      this.notice = this.state.lastLog;
      this.viewMode = 'command';
      this.afterBattleAction();
      return;
    }

    if (this.state.phase !== 'forcedSwitch') {
      this.viewMode = 'command';
    }
    this.render();
  }

  private drawStatusView(): void {
    this.clampPartyCursor();
    const monster = this.state.party[this.partyCursor] ?? this.state.party[this.state.activeIndex];
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, 0xf0f4f1).setOrigin(0);
    this.add.rectangle(0, 0, APP_WIDTH, 48, 0x20202c).setOrigin(0);
    this.add.rectangle(0, 50, APP_WIDTH, 4, 0x20c8b2).setOrigin(0);
    addLabel(this, 24, 2, '스테이터스', 36).setTint(0xffffff);
    this.drawFloorBadge();

    const statusBorder = this.pathimonFrameBorderColor(monster, 0x555c66);
    drawPanel(this, 28, 76, 332, 370).setFillStyle(0xdfe5dd).setStrokeStyle(3, statusBorder);
    this.add.rectangle(42, 92, 304, 232, 0xf5f2d8).setOrigin(0).setAlpha(0.75);
    const assets = pathimonSpriteAssets(monster, this.state.visualStyle);
    this.drawMonsterSprite(monster, assets.front, 194, 306, monster.isTrainer ? 2.2 : 2.6);
    addLabel(this, 54, 344, `HP ${monster.hp}/${monster.maxHp}`, 20).setColor('#20202c');
    drawHpBar(this, 54, 386, 250, hpPct(monster));
    addBoxLabel(this, 54, 414, monster.name, { width: 276, height: 30, size: 24, minSize: 14, maxLines: 1, color: '#20202c' });

    drawPanel(this, 388, 76, 600, 370).setFillStyle(0xf7faf8).setStrokeStyle(3, statusBorder);
    addBoxLabel(this, 424, 96, monster.name, { width: 520, height: 38, size: 31, minSize: 17, maxLines: 1, color: '#20202c' });
    addBoxLabel(this, 424, 142, monster.scientificName, { width: 520, height: 28, size: 19, minSize: 12, maxLines: 1, color: '#3f454d' });
    addBoxLabel(this, 424, 190, `방어특성: ${this.formatDefenseTraits(monster)}`, {
      width: 520,
      height: 28,
      size: 20,
      minSize: 13,
      maxLines: 1,
      color: '#20202c',
    });

    if (this.statusTab === 'profile') {
      addLabel(this, 424, 244, '메모', 23).setColor('#20202c');
      statusProfileMemoLines(monster).forEach((line, index) => {
        addBoxLabel(this, 424, 286 + index * 34, line, { width: 520, height: 30, size: 18, minSize: 12, maxLines: 1, color: '#20202c' });
      });
    } else {
      this.drawStatusMoves(monster);
    }

    this.drawMenuButton(48, 492, 150, 44, '뒤로가기', () => {
      this.viewMode = 'party';
      this.statusTab = 'profile';
      this.statusLearningOpen = false;
      this.render();
    });
    if (this.statusTab === 'moves') {
      this.drawMenuButton(648, 492, 150, 44, this.statusLearningOpen ? '목록' : '학습', () => {
        this.statusLearningOpen = !this.statusLearningOpen;
        this.render();
      });
    }
    this.drawMenuButton(816, 492, 150, 44, this.statusTab === 'moves' ? '프로필' : '기술', () => {
      this.statusTab = this.statusTab === 'moves' ? 'profile' : 'moves';
      this.statusLearningOpen = false;
      this.render();
    });
  }

  private drawStatusMoves(monster: RuntimeMonster): void {
    const slots = battleMoveSlots(monster);
    const availableIndexes = slots
      .map((moveId, index) => (moveId ? index : -1))
      .filter((index) => index >= 0);
    const maxCursor = availableIndexes.length > 0 ? Math.max(...availableIndexes) : 0;
    this.statusMoveCursor = Math.min(maxCursor, Math.max(0, this.statusMoveCursor));
    const selectedMoveId = slots[this.statusMoveCursor] ?? slots.find(Boolean);

    addLabel(this, 424, 236, this.statusLearningOpen ? '학습' : '기술', 23).setColor('#20202c');

    if (this.statusLearningOpen && selectedMoveId) {
      const detail = formatMoveDetailSections(selectedMoveId, monster);
      addBoxLabel(this, 424, 278, detail.title, { width: 520, height: 28, size: 22, maxLines: 1, color: '#20202c' });
      addBoxLabel(this, 424, 316, detail.description, { width: 520, height: 60, size: 18, minSize: 14, maxLines: 3, color: '#3f454d' });
      addBoxLabel(this, 424, 386, detail.learnText, { width: 520, height: 54, size: 18, minSize: 14, maxLines: 3, color: '#3f454d' });
      return;
    }

    slots.forEach((moveId, index) => {
      const y = 278 + index * 42;
      const selected = index === this.statusMoveCursor;
      const color = selected ? '#20202c' : '#3f454d';
      addLabel(this, 424, y, selected ? '▶' : ' ', 18).setColor('#20202c');

      if (!moveId) {
        addLabel(this, 450, y, '---', 18).setColor('#7c838a');
        return;
      }

      const details = formatMoveDetails(moveId, monster);
      addBoxLabel(this, 450, y, formatMoveName(moveId, monster), { width: 160, height: 22, size: 18, minSize: 13, maxLines: 1, color });
      addBoxLabel(this, 626, y, details[1], { width: 210, height: 22, size: 15, minSize: 11, maxLines: 1, color: '#3f454d' });
      addBoxLabel(this, 856, y, details[2], { width: 88, height: 22, size: 15, minSize: 12, maxLines: 1, color: '#3f454d' });
    });
  }

  private clampPartyCursor(): void {
    const maxIndex = Math.max(0, this.state.party.length - 1);
    this.partyCursor = Math.min(maxIndex, Math.max(0, this.partyCursor));
  }
  private handleDirectionalInput(direction: Direction): void {
    if (this.isAnimating) {
      return;
    }

    if (this.viewMode === 'status') {
      if (this.statusTab === 'moves' && (direction === 'up' || direction === 'down')) {
        this.moveStatusMoveCursor(direction);
        this.render();
      } else if (direction === 'left' || direction === 'right') {
        this.statusTab = this.statusTab === 'profile' ? 'moves' : 'profile';
        this.statusLearningOpen = false;
        this.render();
      }
      return;
    }

    if (this.viewMode === 'party' || this.state.phase === 'forcedSwitch' || this.state.phase === 'releaseCapture') {
      if (this.partyMenuOpen) {
        this.movePartyMenuCursor(direction);
      } else {
        this.movePartyCursor(direction);
      }
      this.render();
      return;
    }

    if (this.viewMode === 'command' && this.state.phase === 'battle') {
      this.moveCommandCursor(direction);
      this.render();
      return;
    }

    if (this.viewMode === 'moves' && this.state.phase === 'battle') {
      this.moveSelectedMove(direction);
      this.render();
      return;
    }

    if (this.viewMode === 'capsules' && this.state.phase === 'battle') {
      this.moveCapsuleCursor(direction);
      this.render();
      return;
    }

    if (this.viewMode === 'dex' && this.state.phase === 'battle' && (direction === 'left' || direction === 'right')) {
      this.dexTab = this.dexTab === 'moves' ? 'effectiveness' : 'moves';
      this.render();
    }
  }

  private moveCommandCursor(direction: Direction): void {
    const column = this.commandCursor % 2;
    const row = Math.floor(this.commandCursor / 2);
    const nextColumn = direction === 'left' ? Math.max(0, column - 1) : direction === 'right' ? Math.min(1, column + 1) : column;
    const nextRow = direction === 'up' ? Math.max(0, row - 1) : direction === 'down' ? Math.min(1, row + 1) : row;
    this.commandCursor = nextRow * 2 + nextColumn;
  }

  private moveSelectedMove(direction: Direction): void {
    const player = this.state.party[this.state.activeIndex];
    const moves = battleMoveSlots(player);
    const index = Math.max(0, moves.indexOf(this.selectedMoveId));
    const column = index % 2;
    const row = Math.floor(index / 2);
    const nextColumn = direction === 'left' ? Math.max(0, column - 1) : direction === 'right' ? Math.min(1, column + 1) : column;
    const nextRow = direction === 'up' ? Math.max(0, row - 1) : direction === 'down' ? Math.min(1, row + 1) : row;
    const nextMove = moves[nextRow * 2 + nextColumn];

    if (nextMove && canUseBattleMove(player, nextMove)) {
      this.selectedMoveId = nextMove;
      this.armedMoveId = nextMove;
    }
  }

  private moveCapsuleCursor(direction: Direction): void {
    if (direction !== 'up' && direction !== 'down') return;
    this.capsuleCursor += direction === 'down' ? 1 : -1;
    this.capsuleCursor = Math.min(CAPSULE_ORDER.length - 1, Math.max(0, this.capsuleCursor));
  }

  private moveStatusMoveCursor(direction: Direction): void {
    const monster = this.state.party[this.partyCursor] ?? this.state.party[this.state.activeIndex];
    const filledIndexes = battleMoveSlots(monster)
      .map((moveId, index) => (moveId ? index : -1))
      .filter((index) => index >= 0);
    if (filledIndexes.length === 0) return;

    const currentPosition = Math.max(0, filledIndexes.indexOf(this.statusMoveCursor));
    const nextPosition = direction === 'down'
      ? Math.min(filledIndexes.length - 1, currentPosition + 1)
      : Math.max(0, currentPosition - 1);
    this.statusMoveCursor = filledIndexes[nextPosition];
  }

  private movePartyCursor(direction: Direction): void {
    if (direction === 'up') this.partyCursor -= 1;
    if (direction === 'down') this.partyCursor += 1;
    if (direction === 'left') this.partyCursor = Math.max(0, this.partyCursor - 3);
    if (direction === 'right') this.partyCursor = Math.min(this.state.party.length - 1, this.partyCursor + 3);
    this.clampPartyCursor();
  }

  private movePartyMenuCursor(direction: Direction): void {
    if (direction !== 'up' && direction !== 'down') return;
    const optionCount = partyMenuOptions(this.partyPurpose()).length;
    this.partyMenuCursor += direction === 'down' ? 1 : -1;
    this.partyMenuCursor = Math.min(optionCount - 1, Math.max(0, this.partyMenuCursor));
  }

  private handleConfirmInput(): void {
    if (this.isAnimating) {
      return;
    }

    if (this.state.phase === 'floorClear') {
      this.goNextFloor();
      return;
    }

    if (this.viewMode === 'status') {
      if (this.statusTab === 'moves') {
        this.statusLearningOpen = !this.statusLearningOpen;
      } else {
        this.statusTab = 'moves';
        this.statusLearningOpen = false;
      }
      this.render();
      return;
    }

    if (this.viewMode === 'party' || this.state.phase === 'forcedSwitch' || this.state.phase === 'releaseCapture') {
      if (!this.partyMenuOpen) {
        this.partyMenuOpen = true;
        this.partyMenuCursor = 0;
        this.render();
        return;
      }

      const option = partyMenuOptions(this.partyPurpose())[this.partyMenuCursor];
      if (option) this.handlePartyMenuOption(option);
      return;
    }

    if (this.state.phase !== 'battle') {
      return;
    }

    if (this.viewMode === 'command') {
      const option = battleActionOptions(this.state.encounterKind)[this.commandCursor];
      if (option && !option.disabled) this.handleCommandAction(option.id);
    } else if (this.viewMode === 'moves') {
      this.handleMovePress(this.selectedMoveId);
    } else if (this.viewMode === 'capsules') {
      this.handleCapsuleThrow(CAPSULE_ORDER[this.capsuleCursor]);
    }
  }

  private handleCancelInput(): void {
    if (this.isAnimating) {
      return;
    }

    if (this.viewMode === 'status') {
      this.viewMode = 'party';
      this.statusTab = 'profile';
      this.statusLearningOpen = false;
      this.render();
      return;
    }

    if (this.viewMode === 'party' || this.state.phase === 'forcedSwitch' || this.state.phase === 'releaseCapture') {
      this.cancelPartyView();
      return;
    }

    if (this.viewMode !== 'command' && this.state.phase === 'battle') {
      this.viewMode = 'command';
      this.render();
    }
  }

  private handlePartySwitch(index: number): void {
    this.state = this.state.phase === 'forcedSwitch'
      ? resolveForcedSwitchMonster(this.state, index)
      : resolveSwitchMonster(this.state, index);
    const player = this.state.party[this.state.activeIndex];
    this.selectedMoveId = firstUsableMove(player);
    this.armedMoveId = this.selectedMoveId;
    this.notice = this.state.lastLog;
    this.viewMode = 'command';
    this.afterBattleAction();
  }

  private handleCapsuleThrow(capsuleId: CapsuleId): void {
    const enemy = this.state.enemy;
    this.state = resolveCapsuleAction(this.state, capsuleId, 0);
    this.notice = enemy?.isTrainer ? '사람 전투에서는 캡슐을 던질 수 없습니다.' : this.state.lastLog;
    const blocked = this.state.phase === 'battle' && (this.state.lastLog.includes('타입') || this.state.lastLog.includes('없습니다'));
    this.viewMode = blocked ? 'capsules' : this.state.phase === 'releaseCapture' ? 'party' : 'command';
    if (this.state.phase === 'releaseCapture') {
      this.openPartyView();
    }
    this.afterBattleAction();
  }

  private afterBattleAction(): void {
    if (this.state.phase === 'shop') {
      this.preserveBattleBgmOnShutdown = true;
      this.scene.start('ShopScene', { state: this.state });
      return;
    }

    if (this.state.phase === 'releaseCapture') {
      this.viewMode = 'party';
      this.clampPartyCursor();
      this.partyMenuOpen = false;
      this.partyMenuCursor = 0;
    }

    this.render();
  }

  private drawFloorClearView(): void {
    addLabel(this, 34, 410, '층 클리어', 24);
    addBoxLabel(this, 34, 448, this.notice || this.state.lastLog, {
      width: 690,
      height: 74,
      size: 16,
      minSize: 11,
      maxLines: 3,
    }).setAlpha(0.9);
    this.drawMenuButton(780, 444, 160, 48, '다음 층', () => this.goNextFloor());
  }

  private drawDefeatView(): void {
    addLabel(this, 34, 410, '패배', 24);
    addBoxLabel(this, 34, 448, this.notice || this.state.lastLog || '더 이상 전투 가능한 패시몬이 없습니다.', {
      width: 690,
      height: 74,
      size: 16,
      minSize: 11,
      maxLines: 3,
    }).setAlpha(0.9);
    this.drawMenuButton(780, 444, 160, 48, '처음으로', () => this.returnToModeSelect());
  }

  private goNextFloor(): void {
    const nextState = advanceFromShop(this.state);
    this.preserveBattleBgmOnShutdown = shouldPreserveBattleBgm({
      currentEncounterKind: this.state.encounterKind,
      currentKey: this.selectedBgmKey,
      nextEncounterKind: nextState.encounterKind,
      nextFloor: nextState.floor,
      seed: nextState.bgmSeed,
    });
    if (nextState.phase === 'bossIntro') {
      this.scene.start('BossIntroScene', { state: nextState });
      return;
    }
    this.scene.start('BattleScene', { state: nextState });
  }

  private returnToModeSelect(): void {
    this.preserveBattleBgmOnShutdown = false;
    this.registry.set('bossRosterIds', createBossRosterIds(Math.random));
    this.stopBattleBgm();
    this.scene.start('ModeSelectScene');
  }

  private drawMobileOverlay(): void {
    const depth = 900;
    const dpadX = 118;
    const dpadY = 500;

    this.add.rectangle(dpadX, dpadY, 172, 54, OVERLAY_FILL, 0.24).setDepth(depth);
    this.add.rectangle(dpadX, dpadY, 54, 172, OVERLAY_FILL, 0.24).setDepth(depth);
    this.add.rectangle(dpadX, dpadY, 54, 54, OVERLAY_FILL, 0.16).setDepth(depth);

    this.drawOverlayHitArea(dpadX, dpadY - 58, 58, 58, 'up', '↑', depth + 1);
    this.drawOverlayHitArea(dpadX, dpadY + 58, 58, 58, 'down', '↓', depth + 1);
    this.drawOverlayHitArea(dpadX - 58, dpadY, 58, 58, 'left', '←', depth + 1);
    this.drawOverlayHitArea(dpadX + 58, dpadY, 58, 58, 'right', '→', depth + 1);

    this.drawActionOverlayButton(896, 452, 48, 'A', () => this.handleConfirmInput(), depth + 1);
    this.drawActionOverlayButton(802, 510, 44, 'B', () => this.handleCancelInput(), depth + 1);
    const homeButton = mobileHomeButtonLayout();
    this.drawOverlayTextButton(homeButton.x, homeButton.y, homeButton.width, homeButton.height, homeButton.label, () => {
      this.returnToModeSelect();
    }, depth + 1, true);
  }

  private drawOverlayHitArea(x: number, y: number, width: number, height: number, direction: Direction, label: string, depth: number): void {
    const hit = this.add.rectangle(x, y, width, height, OVERLAY_FILL, 0.02).setDepth(depth);
    if (this.mobileControlOverlayInteractive()) {
      hit.setInteractive({ useHandCursor: true });
      hit.on('pointerdown', () => this.handleDirectionalInput(direction));
    }
    addLabel(this, x, y, label, 20).setOrigin(0.5).setAlpha(0.3).setDepth(depth + 1);
  }

  private drawActionOverlayButton(x: number, y: number, radius: number, label: string, onClick: () => void, depth: number): void {
    const circle = this.add.circle(x, y, radius, OVERLAY_FILL, 0.27).setStrokeStyle(2, OVERLAY_STROKE, 0.22).setDepth(depth);
    if (this.mobileControlOverlayInteractive()) {
      circle.setInteractive({ useHandCursor: true });
      circle.on('pointerdown', onClick);
    }
    addLabel(this, x, y, label, 30).setOrigin(0.5).setTint(OVERLAY_TEXT).setAlpha(0.72).setDepth(depth + 1);
  }

  private drawLockedMoveOverlay(x: number, y: number, width: number, height: number): void {
    const overlayPath = lockedMoveOverlayPath();
    if (this.textures.exists(overlayPath)) {
      this.add.image(x, y, overlayPath).setOrigin(0).setDisplaySize(width, height).setAlpha(0.96);
      return;
    }

    const graphics = this.add.graphics();
    graphics.lineStyle(4, 0xd8cde6, 0.9);
    graphics.lineBetween(x + 14, y + 8, x + width - 14, y + height - 8);
    graphics.lineBetween(x + width - 14, y + 8, x + 14, y + height - 8);
  }

  private drawOverlayTextButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    onClick: () => void,
    depth: number,
    interactive: boolean,
  ): void {
    const rect = this.add.rectangle(x, y, width, height, OVERLAY_FILL, 0.2).setOrigin(0).setDepth(depth);
    rect.setStrokeStyle(1, OVERLAY_STROKE, 0.22);
    if (interactive) {
      rect.setInteractive({ useHandCursor: true });
      rect.on('pointerdown', onClick);
    }
    addLabel(this, x + width / 2, y + height / 2, label, 12).setOrigin(0.5).setTint(OVERLAY_TEXT).setAlpha(0.76).setDepth(depth + 1);
  }

  private mobileControlOverlayInteractive(): boolean {
    return mobileControlOverlayInteractive({
      hasTouch: this.sys.game.device.input.touch,
      coarsePointer: window.matchMedia('(pointer: coarse)').matches,
    });
  }

  private drawCursorMarker(x: number, y: number): void {
    this.add.triangle(x, y, 0, -8, 0, 8, 13, 0, 0xffffff).setOrigin(0.5);
  }

  private drawMenuButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    onClick: () => void,
    active = false,
    disabled = false,
  ): void {
    const rect = this.add.rectangle(x, y, width, height, disabled ? COLORS.panelDark : active ? BUTTON_ACTIVE_FILL : BUTTON_FILL).setOrigin(0);
    rect.setStrokeStyle(2, active ? 0x72d6ff : COLORS.line);

    if (!disabled) {
      rect.setInteractive({ useHandCursor: true });
      rect.on('pointerover', () => rect.setFillStyle(BUTTON_ACTIVE_FILL));
      rect.on('pointerout', () => rect.setFillStyle(active ? BUTTON_ACTIVE_FILL : BUTTON_FILL));
      rect.on('pointerdown', onClick);
    } else {
      rect.setAlpha(0.48);
    }

    if (active && !disabled) {
      const marker = cursorMarkerPoint({ x, y, height });
      this.drawCursorMarker(marker.x, marker.y);
    }

    addBoxLabel(this, x + width / 2, y + height / 2, label, {
      width: width - 16,
      height: height - 8,
      size: 15,
      minSize: 10,
      maxLines: 2,
      align: 'center',
      origin: [0.5, 0.5],
    })
      .setAlpha(disabled ? 0.58 : 1);
  }
}
