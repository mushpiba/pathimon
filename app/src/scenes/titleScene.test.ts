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

  it('starts with the story before showing the disclaimer', () => {
    expect(titleSceneSource).toContain("this.scene.start('StoryScene')");
    expect(titleSceneSource).not.toContain("this.scene.start('DisclaimerScene')");
  });

  it('starts the story with Enter as well as pointer input', () => {
    expect(titleSceneSource).toContain("this.input.keyboard?.on('keydown'");
    expect(titleSceneSource).toContain("command === 'confirm'");
  });
});
