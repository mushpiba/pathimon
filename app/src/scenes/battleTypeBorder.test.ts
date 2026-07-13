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

  it('preloads only the selected BGM instead of every battle track', () => {
    expect(battleSceneSource).toContain('this.selectedBgmKey = this.chooseBgmKey();');
    expect(battleSceneSource).toContain('this.queueAudio(this.selectedBgmKey);');
    expect(battleSceneSource).not.toContain('[...bgmAssets.normal, ...bgmAssets.boss].forEach((path) => this.queueAudio(path));');
  });
});
