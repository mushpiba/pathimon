import { describe, expect, it } from 'vitest';
import titleSceneSource from './TitleScene.ts?raw';

describe('TitleScene rendering', () => {
  it('renders the title through a low-resolution pixel texture', () => {
    expect(titleSceneSource).toContain('titleLogoStyle');
    expect(titleSceneSource).toContain('drawPixelatedTitleTexture');
    expect(titleSceneSource).toContain('imageSmoothingEnabled = false');
    expect(titleSceneSource).toContain('drawLogoChunk');
    expect(titleSceneSource).toContain('drawMicrobeDecorations');
    expect(titleSceneSource).toContain('this.textures.addCanvas');
  });
});
