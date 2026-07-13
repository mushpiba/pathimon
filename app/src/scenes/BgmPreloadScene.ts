import Phaser from 'phaser';
import { battleBgmAudioPaths } from '../ui/battleUi';

export class BgmPreloadScene extends Phaser.Scene {
  constructor() {
    super('BgmPreloadScene');
  }

  init(): void {
    this.registry.set('battleBgmPreloadStarted', true);
  }

  preload(): void {
    battleBgmAudioPaths().forEach((path) => {
      if (!this.cache.audio.exists(path)) {
        this.load.audio(path, path);
      }
    });
  }

  create(): void {
    this.registry.set('battleBgmPreloadComplete', true);
    this.scene.stop();
  }
}
