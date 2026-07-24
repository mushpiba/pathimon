import { describe, expect, it } from 'vitest';
import battleSceneSource from './BattleScene.ts?raw';

describe('BattleScene pathimon type borders', () => {
  it('applies challenge-mode pathimon type borders to pathimon-specific frames', () => {
    expect(battleSceneSource).toContain('pathimonTypeBorderColor');
    expect(battleSceneSource).toContain('pathimonFrameBorderColor');
    expect(battleSceneSource).toContain('drawPathimonPanel');
    expect(battleSceneSource).toContain(
      'rect.setStrokeStyle(selected ? 4 : 2, this.pathimonFrameBorderColor(monster, selected ? 0xffffff : 0x2ee9ff))',
    );
  });
  it('draws challenge-mode type icons for every non-trainer pathimon panel and attaches them to the top-right corner', () => {
    expect(battleSceneSource).toContain('const typeIcon = pathimonTypeIcon(monster, this.state.mode);');
    expect(battleSceneSource).not.toContain("role === 'player' ? pathimonTypeIcon");
    expect(battleSceneSource).toContain('this.drawPathimonTypeIcon(x + width - 82, y, 82, 54, typeIcon);');
    expect(battleSceneSource).toContain('pathimonTypeIconAssetPaths().forEach((path) => this.queueImage(path));');
    expect(battleSceneSource).toContain('this.add.image(x, y, icon.assetPath).setOrigin(0).setDisplaySize(width, height);');
  });

  it('uses the chain image for locked challenge-mode signature moves', () => {
    expect(battleSceneSource).toContain('this.queueImage(lockedMoveOverlayPath());');
    expect(battleSceneSource).toContain('const overlayPath = lockedMoveOverlayPath();');
    expect(battleSceneSource).toContain('this.add.image(x, y, overlayPath).setOrigin(0).setDisplaySize(width, height).setAlpha(0.96);');
  });

  it('streams battle BGM outside Phaser while keeping Phaser audio for SFX', () => {
    expect(battleSceneSource).toContain('this.selectedBgmKey = this.chooseBgmKey();');
    expect(battleSceneSource).toContain('playHtmlBattleBgm');
    expect(battleSceneSource).toContain('prefetchHtmlBattleBgm');
    expect(battleSceneSource).not.toContain('this.queueAudio(this.selectedBgmKey);');
    expect(battleSceneSource).toContain('Object.values(battleSfxAssetPaths()).forEach((path) => this.queueAudio(path));');
  });

  it('keeps wild-block BGM continuous and refreshes boss roster when returning home', () => {
    expect(battleSceneSource).toContain('createBossRosterIds');
    expect(battleSceneSource).toContain('private preserveBattleBgmOnShutdown = false;');
    expect(battleSceneSource).toContain('shouldPreserveBattleBgm');
    expect(battleSceneSource).toContain("if (this.state.phase === 'shop') {");
    expect(battleSceneSource).toContain('this.preserveBattleBgmOnShutdown = true;');
    expect(battleSceneSource).toContain('this.registry.set(\'bossRosterIds\', createBossRosterIds(Math.random));');
    expect(battleSceneSource).toContain("this.drawMenuButton(780, 444, 160, 48, '처음으로', () => this.returnToModeSelect())");
    expect(battleSceneSource).toContain("this.scene.start('ModeSelectScene');");
  });
});
