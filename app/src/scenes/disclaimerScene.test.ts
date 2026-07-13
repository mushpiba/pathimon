import { describe, expect, it } from 'vitest';
import disclaimerSceneSource from './DisclaimerScene.ts?raw';

describe('DisclaimerScene blink transition', () => {
  it('uses a horizontal curtain blink-out before entering the wake story', () => {
    expect(disclaimerSceneSource).toContain('this.playBlinkOut(content.blinkEffect');
    expect(disclaimerSceneSource).toContain('scaleY: closed ? 1 : 0.001');
    expect(disclaimerSceneSource).toContain("this.scene.start('PostDisclaimerStoryScene')");
    expect(disclaimerSceneSource).not.toContain('잠시 후 화면이 어두워집니다.');
  });
});
