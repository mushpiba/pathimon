import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  playHtmlBattleBgm,
  prefetchHtmlBattleBgm,
  stopHtmlBattleBgm,
} from './htmlBgm';

class FakeAudio {
  currentTime = 0;
  loop = false;
  preload = '';
  src = '';
  volume = 1;
  pause = vi.fn();
  play = vi.fn(() => Promise.resolve());
  load = vi.fn();
}

describe('HTML battle BGM', () => {
  let audio: FakeAudio;

  beforeEach(() => {
    audio = new FakeAudio();
    vi.stubGlobal('Audio', vi.fn(() => audio));
  });

  afterEach(() => {
    stopHtmlBattleBgm();
    vi.unstubAllGlobals();
    document.querySelectorAll('[data-pathimon-bgm-prefetch]').forEach((node) => node.remove());
  });

  it('reuses one streaming audio element instead of decoding tracks into Phaser', async () => {
    await playHtmlBattleBgm('audio/bgm/forest.mp3');
    await playHtmlBattleBgm('audio/bgm/sea.mp3');

    expect(Audio).toHaveBeenCalledTimes(1);
    expect(audio.loop).toBe(true);
    expect(audio.preload).toBe('auto');
    expect(audio.src).toBe('audio/bgm/sea.mp3');
    expect(audio.play).toHaveBeenCalledTimes(2);
  });

  it('keeps only one upcoming compressed track prefetch', () => {
    prefetchHtmlBattleBgm('audio/bgm/forest.mp3');
    prefetchHtmlBattleBgm('audio/bgm/sea.mp3');

    const links = [...document.querySelectorAll<HTMLLinkElement>('[data-pathimon-bgm-prefetch]')];
    expect(links).toHaveLength(1);
    expect(links[0]?.href).toContain('audio/bgm/sea.mp3');
  });
});
