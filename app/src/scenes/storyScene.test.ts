import { describe, expect, it } from 'vitest';
import storySceneSource from './StoryScene.ts?raw';

describe('StoryScene flow', () => {
  it('continues to the disclaimer after the opening story', () => {
    expect(storySceneSource).toContain("this.registry.set('introStoryComplete', false)");
    expect(storySceneSource).toContain("this.scene.launch('BgmPreloadScene')");
    expect(storySceneSource).toContain('finishStory');
    expect(storySceneSource).toContain("this.registry.set('introStoryComplete', true)");
    expect(storySceneSource).toContain("if (this.registry.get('battleBgmPreloadComplete'))");
    expect(storySceneSource).toContain('stopPathimonScreensaver');
    expect(storySceneSource).toContain("this.scene.start('DisclaimerScene')");
    expect(storySceneSource).not.toContain("this.scene.start('GameGuideScene')");
  });
});
