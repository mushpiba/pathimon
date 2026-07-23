import type { RuntimeMonster } from '../types/game';

export function randomLearningPoint(
  monster: Pick<RuntimeMonster, 'profileMemo'> | undefined,
  random: () => number = Math.random,
): string {
  const points = monster?.profileMemo?.filter((line) => line.trim().length > 0) ?? [];
  if (points.length === 0) return '';

  const index = Math.min(points.length - 1, Math.max(0, Math.floor(random() * points.length)));
  return points[index] ?? '';
}
