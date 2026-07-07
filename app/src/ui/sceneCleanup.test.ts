import { describe, expect, it, vi } from 'vitest';
import { destroySceneChildren } from './sceneCleanup';

describe('destroySceneChildren', () => {
  it('destroys existing scene children before clearing the display list', () => {
    const first = { destroy: vi.fn() };
    const second = { destroy: vi.fn() };
    const removeAll = vi.fn();
    const scene = {
      children: {
        getAll: () => [first, second],
        removeAll,
      },
    };

    destroySceneChildren(scene);

    expect(first.destroy).toHaveBeenCalledTimes(1);
    expect(second.destroy).toHaveBeenCalledTimes(1);
    expect(removeAll).toHaveBeenCalledTimes(1);
  });

  it('clears the display list even when a child has no destroy method', () => {
    const destroy = vi.fn();
    const removeAll = vi.fn();
    const scene = {
      children: {
        getAll: () => [{ destroy }, {}],
        removeAll,
      },
    };

    destroySceneChildren(scene);

    expect(destroy).toHaveBeenCalledTimes(1);
    expect(removeAll).toHaveBeenCalledTimes(1);
  });
});