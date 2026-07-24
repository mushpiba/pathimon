import { describe, expect, it } from 'vitest';
import battleSceneSource from './BattleScene.ts?raw';
import shopSceneSource from './ShopScene.ts?raw';

function assertSceneCleanupLifecycle(source: string): void {
  expect(source).toContain("import { destroySceneChildren } from '../ui/sceneCleanup';");
  expect(source).toMatch(/create\(\): void \{[\s\S]*?Phaser\.Scenes\.Events\.SHUTDOWN[\s\S]*?destroySceneChildren\(this\);/);
  expect(source).toMatch(/private render\(\): void \{[\s\S]{0,120}destroySceneChildren\(this\);/);
  expect(source).not.toContain('children.removeAll()');
}

describe('scene cleanup lifecycle wiring', () => {
  it('keeps BattleScene cleanup on redraw and shutdown', () => {
    assertSceneCleanupLifecycle(battleSceneSource);
  });

  it('stages combat and status messages before returning to preparation', () => {
    expect(battleSceneSource).toContain('const BATTLE_ACTION_HOLD_MS = 2000;');
    expect(battleSceneSource).toContain('const BATTLE_STATUS_HOLD_MS = 1000;');
    expect(battleSceneSource).toContain("type BattleMessageStage = 'preparation' | 'combat' | 'status';");
    expect(battleSceneSource).toMatch(/showCombatMessage\(\)[\s\S]*?delayedCall\(BATTLE_ACTION_HOLD_MS/);
    expect(battleSceneSource).toMatch(/showStatusMessage\(\)[\s\S]*?playStatusDamageCue/);
    expect(battleSceneSource).toMatch(/showStatusMessage\(\)[\s\S]*?delayedCall\(BATTLE_STATUS_HOLD_MS/);
    expect(battleSceneSource).toMatch(/pointerdown[\s\S]{0,120}advanceBattleMessage/);
  });

  it('places status immediately after effects and leaves a gap before the move description', () => {
    expect(battleSceneSource).toMatch(
      /const effectLabel = addBoxLabel[\s\S]*?detail\.effect[\s\S]*?const conditionY = panelY \+ 74 \+ Math\.min\(30, effectLabel\.height\) \+ 2;/,
    );
    expect(battleSceneSource).toMatch(
      /const conditionLabel = addBoxLabel[\s\S]*?detail\.conditions[\s\S]*?const descriptionY = conditionY \+ conditionLabel\.height \+ 10;/,
    );
    expect(battleSceneSource.indexOf('detail.effect')).toBeLessThan(battleSceneSource.indexOf('detail.conditions'));
    expect(battleSceneSource.indexOf('detail.conditions')).toBeLessThan(battleSceneSource.indexOf('detail.description'));
  });

  it('keeps ShopScene cleanup on redraw and shutdown', () => {
    assertSceneCleanupLifecycle(shopSceneSource);
  });

  it('shows the increasing maintenance refresh cost on the shop button', () => {
    expect(shopSceneSource).toContain('maintenanceRefreshCost');
    expect(shopSceneSource).toContain('새로고침 ₩');
  });

  it('supports arrow navigation and Enter confirmation in the shop', () => {
    expect(shopSceneSource).toContain("this.input.keyboard?.on('keydown', this.handleKeyboardDown)");
    expect(shopSceneSource).toContain("command === 'confirm'");
    expect(shopSceneSource).toContain('this.keyboardButtons[this.keyboardCursor]');
  });
});
