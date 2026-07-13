import { describe, expect, it } from 'vitest';
import storySceneSource from './StoryScene.ts?raw';

describe('StoryScene flow', () => {
  it('continues to the disclaimer after the opening story', () => {
    expect(storySceneSource).toContain("this.scene.start('DisclaimerScene')");
    expect(storySceneSource).not.toContain("this.scene.start('GameGuideScene')");
  });
});
