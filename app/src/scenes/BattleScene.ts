import Phaser from 'phaser';
import { resolveCapsuleAction, resolvePlayerMove } from '../battle/turn';
import { ABILITIES } from '../data/abilities';
import { MOVES } from '../data/moves';
import { createInitialRunState, enterBattle } from '../state/runState';
import type { MoveId, RunState, RuntimeMonster } from '../types/game';
import { COLORS, APP_WIDTH, APP_HEIGHT } from '../game/constants';
import { formatMoveDetails, hpPct, resolveMoveSelectionPress, statusSummary } from '../ui/battleUi';
import { destroySceneChildren } from '../ui/sceneCleanup';
import { addLabel, drawHpBar, drawPanel } from '../ui/draw';

interface BattleSceneData {
  state?: RunState;
}

export class BattleScene extends Phaser.Scene {
  private state!: RunState;
  private selectedMoveId!: MoveId;
  private armedMoveId!: MoveId;
  private notice = '';

  constructor() {
    super('BattleScene');
  }

  init(data: BattleSceneData = {}): void {
    this.state = this.normalizeState(data.state);
    this.selectedMoveId = this.state.party[this.state.activeIndex].moveset[0];
    this.armedMoveId = this.selectedMoveId;
    this.notice = this.state.lastLog;
  }

  create(): void {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => destroySceneChildren(this));
    this.render();
  }

  private normalizeState(state?: RunState): RunState {
    if (!state) {
      return enterBattle(createInitialRunState(), 1);
    }

    if (state.phase === 'bossIntro') {
      return {
        ...state,
        phase: 'battle',
      };
    }

    if (state.phase === 'story') {
      return enterBattle(state);
    }

    return state;
  }

  private render(): void {
    destroySceneChildren(this);
    this.add.rectangle(0, 0, APP_WIDTH, APP_HEIGHT, COLORS.ink).setOrigin(0);

    const player = this.state.party[this.state.activeIndex];
    const enemy = this.state.enemy;

    if (!player || !enemy) {
      addLabel(this, 120, 140, '전투 대상을 불러오지 못했습니다.', 28);
      return;
    }

    this.drawUnitPanel(48, 40, 430, 182, enemy, '야생 패시몬');
    this.drawUnitPanel(546, 40, 430, 182, player, '내 패시몬');

    drawPanel(this, 48, 246, 930, 110);
    addLabel(this, 74, 270, `층 ${this.state.floor}`, 20);
    addLabel(this, 74, 306, this.notice || '기술을 선택하세요.', 18).setWordWrapWidth(870);

    drawPanel(this, 48, 378, 450, 160);
    addLabel(this, 72, 402, '기술 설명', 22);
    const moveLines = formatMoveDetails(this.selectedMoveId);
    moveLines.forEach((line, index) => {
      addLabel(this, 72, 438 + index * 20, line, index === 0 ? 20 : 16).setAlpha(index === 0 ? 1 : 0.92);
    });

    drawPanel(this, 524, 378, 454, 160);
    addLabel(this, 548, 402, '행동', 22);
    this.drawMoveButtons(player);
    this.drawCapsuleButton();
  }

  private drawUnitPanel(x: number, y: number, width: number, height: number, monster: RuntimeMonster, heading: string): void {
    drawPanel(this, x, y, width, height);
    addLabel(this, x + 20, y + 18, heading, 18).setAlpha(0.85);
    addLabel(this, x + 20, y + 46, `${monster.glyph} ${monster.name}`, 24);
    addLabel(this, x + 20, y + 76, monster.scientificName, 18).setAlpha(0.88);
    addLabel(this, x + 20, y + 108, `방어 특성: ${ABILITIES[monster.ability].name}`, 18);
    addLabel(this, x + 20, y + 138, 'HP', 16).setAlpha(0.85);
    drawHpBar(this, x + 64, y + 146, width - 90, hpPct(monster));
    addLabel(this, x + 20, y + 160, statusSummary(monster), 16).setWordWrapWidth(width - 40);
  }

  private drawMoveButtons(player: RuntimeMonster): void {
    player.moveset.slice(0, 4).forEach((moveId, index) => {
      const move = MOVES[moveId];
      const column = index % 2;
      const row = Math.floor(index / 2);
      const x = 548 + column * 150;
      const y = 438 + row * 46;
      const selected = moveId === this.selectedMoveId;
      const rect = this.add.rectangle(x, y, 134, 36, selected ? COLORS.line : COLORS.panelDark).setOrigin(0);
      rect.setStrokeStyle(2, COLORS.line);
      rect.setInteractive({ useHandCursor: true });
      rect.on('pointerover', () => {
        this.selectedMoveId = moveId;
        this.render();
      });
      rect.on('pointerdown', () => {
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

        this.state = resolvePlayerMove(this.state, moveId, 1);
        this.notice = this.state.lastLog;

        if (this.state.phase === 'shop') {
          this.scene.start('ShopScene', { state: this.state });
          return;
        }

        this.render();
      });
      addLabel(this, x + 67, y + 18, move.name, 14).setOrigin(0.5);
    });
  }

  private drawCapsuleButton(): void {
    const enemy = this.state.enemy;
    if (!enemy) {
      return;
    }

    const x = 856;
    const y = 438;
    const rect = this.add.rectangle(x, y, 96, 82, 0x72d6ff).setOrigin(0);
    rect.setStrokeStyle(2, COLORS.line);
    rect.setInteractive({ useHandCursor: true });
    rect.on('pointerdown', () => {
      this.state = resolveCapsuleAction(this.state, 0);
      this.notice = enemy.isBoss ? '보스 포획 불가' : this.state.lastLog;

      if (this.state.phase === 'shop') {
        this.scene.start('ShopScene', { state: this.state });
        return;
      }

      this.render();
    });
    addLabel(this, x + 48, y + 28, '캡슐', 18).setOrigin(0.5);
    addLabel(this, x + 48, y + 56, `${this.state.capsules}개`, 14).setOrigin(0.5);
  }
}