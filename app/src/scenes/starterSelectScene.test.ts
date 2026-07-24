import { describe, expect, it } from 'vitest';
import starterSelectSceneSource from './StarterSelectScene.ts?raw';

describe('StarterSelectScene audio', () => {
  it('keeps the intro BGM through starter selection and stops it when the run starts', () => {
    const createIndex = starterSelectSceneSource.indexOf('create(): void');
    const startRunIndex = starterSelectSceneSource.indexOf('private startRun(): void');
    const stopIndex = starterSelectSceneSource.indexOf('stopIntroBgm(this);');

    expect(starterSelectSceneSource).toContain('queueIntroBgm(this);');
    expect(starterSelectSceneSource).toContain('playIntroBgm(this);');
    expect(stopIndex).toBeGreaterThan(startRunIndex);
    expect(stopIndex).toBeGreaterThan(createIndex);
  });

  it('moves keyboard focus to the start button after selecting the starter', () => {
    expect(starterSelectSceneSource).toContain(
      'this.startCursor = canStartWithStarterSelection(this.selectedIds);',
    );
  });
});
