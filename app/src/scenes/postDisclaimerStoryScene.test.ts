import { describe, expect, it } from 'vitest';
import postDisclaimerStorySceneSource from './PostDisclaimerStoryScene.ts?raw';

describe('PostDisclaimerStoryScene flow', () => {
  it('holds black, shows the wake line, then opens the battle guide after a click', () => {
    expect(postDisclaimerStorySceneSource).toContain("super('PostDisclaimerStoryScene')");
    expect(postDisclaimerStorySceneSource).toContain('queueIntroBgm(this)');
    expect(postDisclaimerStorySceneSource).toContain('playIntroBgm(this)');
    expect(postDisclaimerStorySceneSource).toContain('this.time.delayedCall(1000');
    expect(postDisclaimerStorySceneSource).toContain('APP_HEIGHT - 122');
    expect(postDisclaimerStorySceneSource).toContain("'... 일어나세요..!'");
    expect(postDisclaimerStorySceneSource).toContain("this.scene.start('GameGuideScene')");
    expect(postDisclaimerStorySceneSource).toContain("this.input.keyboard?.on('keydown'");
    expect(postDisclaimerStorySceneSource).toContain("command === 'confirm'");
  });
});
