import { describe, expect, it } from 'vitest';
import bgmPreloadSceneSource from './BgmPreloadScene.ts?raw';

describe('BgmPreloadScene', () => {
  it('warms all battle BGM in the background with a loading indicator', () => {
    expect(bgmPreloadSceneSource).toContain("super('BgmPreloadScene')");
    expect(bgmPreloadSceneSource).toContain('battleBgmAudioPaths()');
    expect(bgmPreloadSceneSource).toContain('startPathimonScreensaver');
    expect(bgmPreloadSceneSource).toContain('createInitialPathimonScreensaverItems');
    expect(bgmPreloadSceneSource).toContain('pathimonScreensaverSpritePool');
    expect(bgmPreloadSceneSource).toContain('removePathimonScreensaver');
    expect(bgmPreloadSceneSource).toContain('drawLoadingOverlay');
    expect(bgmPreloadSceneSource).toContain('BGM 로딩중 0%');
    expect(bgmPreloadSceneSource).toContain("this.load.on('progress'");
    expect(bgmPreloadSceneSource).toContain('this.load.audio(path, path)');
    expect(bgmPreloadSceneSource).toContain("this.registry.set('battleBgmPreloadComplete', true)");
  });
});
