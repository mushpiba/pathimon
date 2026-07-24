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
    expect(battleSceneSource).toContain('const BATTLE_ACTION_HOLD_MS = 1000;');
    expect(battleSceneSource).toContain('const BATTLE_STATUS_HOLD_MS = 500;');
    expect(battleSceneSource).toContain("type BattleMessageStage = 'preparation' | 'combat' | 'status';");
    expect(battleSceneSource).toMatch(/showCombatMessage\(\)[\s\S]*?delayedCall\(BATTLE_ACTION_HOLD_MS/);
    expect(battleSceneSource).toMatch(/showStatusMessage\(\)[\s\S]*?playStatusDamageCue/);
    expect(battleSceneSource).toMatch(/showStatusMessage\(\)[\s\S]*?delayedCall\(BATTLE_STATUS_HOLD_MS/);
    expect(battleSceneSource).toMatch(/pointerdown[\s\S]{0,120}advanceBattleMessage/);
  });

  it('keeps ShopScene cleanup on redraw and shutdown', () => {
    assertSceneCleanupLifecycle(shopSceneSource);
  });

  it('shows the increasing maintenance refresh cost on the shop button', () => {
    expect(shopSceneSource).toContain('maintenanceRefreshCost');
    expect(shopSceneSource).toContain('새로고침 ₩');
  });
});
