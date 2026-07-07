import { describe, expect, it } from 'vitest';
import battleSceneSource from './BattleScene.ts?raw';
import shopSceneSource from './ShopScene.ts?raw';

function assertSceneCleanupLifecycle(source: string): void {
  expect(source).toContain("import { destroySceneChildren } from '../ui/sceneCleanup';");
  expect(source).toMatch(
    /create\(\): void \{\s+this\.events\.once\(Phaser\.Scenes\.Events\.SHUTDOWN, \(\) => destroySceneChildren\(this\)\);/s,
  );
  expect(source).toMatch(/private render\(\): void \{\s+destroySceneChildren\(this\);/s);
  expect(source).not.toContain('children.removeAll()');
}

describe('scene cleanup lifecycle wiring', () => {
  it('keeps BattleScene cleanup on redraw and shutdown', () => {
    assertSceneCleanupLifecycle(battleSceneSource);
  });

  it('keeps ShopScene cleanup on redraw and shutdown', () => {
    assertSceneCleanupLifecycle(shopSceneSource);
  });
});
