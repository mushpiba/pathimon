import { describe, expect, it } from 'vitest';
import bgmPreloadSceneSource from './BgmPreloadScene.ts?raw';

describe('BgmPreloadScene', () => {
  it('warms all battle BGM in the background without drawing UI', () => {
    expect(bgmPreloadSceneSource).toContain("super('BgmPreloadScene')");
    expect(bgmPreloadSceneSource).toContain('battleBgmAudioPaths()');
    expect(bgmPreloadSceneSource).toContain('this.load.audio(path, path)');
    expect(bgmPreloadSceneSource).toContain("this.registry.set('battleBgmPreloadComplete', true)");
  });
});
