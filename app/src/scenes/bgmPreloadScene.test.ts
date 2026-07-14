import { describe, expect, it } from 'vitest';
import bgmPreloadSceneSource from './BgmPreloadScene.ts?raw';

describe('BgmPreloadScene', () => {
  it('warms all battle BGM in the background with a loading indicator', () => {
    expect(bgmPreloadSceneSource).toContain("super('BgmPreloadScene')");
    expect(bgmPreloadSceneSource).toContain('battleBgmAudioPaths()');
    expect(bgmPreloadSceneSource).toContain('startPathimonScreensaver');
    expect(bgmPreloadSceneSource).toContain('createInitialPathimonScreensaverItems');
    expect(bgmPreloadSceneSource).toContain('createPathimonScreensaverPair');
    expect(bgmPreloadSceneSource).toContain('addScreensaverPair');
    expect(bgmPreloadSceneSource).toContain('pathimonScreensaverSpritePool');
    expect(bgmPreloadSceneSource).toContain('this.previousCanvasZIndex = this.game.canvas.style.zIndex');
    expect(bgmPreloadSceneSource).toContain("this.game.canvas.style.zIndex = '1000'");
    expect(bgmPreloadSceneSource).toContain("zIndex: '1001'");
    expect(bgmPreloadSceneSource).toContain('stopPathimonScreensaver');
    expect(bgmPreloadSceneSource).toContain('removePathimonScreensaver');
    expect(bgmPreloadSceneSource).toContain('drawLoadingOverlay');
    expect(bgmPreloadSceneSource).toContain('BGM 로딩중 0%');
    expect(bgmPreloadSceneSource).toContain("this.load.on('progress'");
    expect(bgmPreloadSceneSource).toContain('this.load.audio(path, path)');
    expect(bgmPreloadSceneSource).toContain("this.registry.set('battleBgmPreloadComplete', true)");
    expect(bgmPreloadSceneSource).not.toContain('this.removePathimonScreensaver();\r\n    this.registry.set');
  });
});
