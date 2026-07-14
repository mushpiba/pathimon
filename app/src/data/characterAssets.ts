type AssetModules = Record<string, string>;

const bossCharacterModules = import.meta.glob('/public/images/trainers/boss/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as AssetModules;

const trainerCharacterModules = import.meta.glob('/public/images/trainers/trainer/*.png', {
  eager: true,
  query: '?url',
  import: 'default',
}) as AssetModules;

function publicAssetPaths(modules: AssetModules): string[] {
  return Object.keys(modules)
    .sort()
    .map((path) => path.replace('/public/', ''));
}

export function assetIdFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.png$/, '') ?? path;
}

export function characterAssetPathForId(assets: string[], id: string): string | undefined {
  return assets.find((assetPath) => assetIdFromPath(assetPath) === id);
}

export const BOSS_CHARACTER_ASSETS = publicAssetPaths(bossCharacterModules);
export const TRAINER_CHARACTER_ASSETS = publicAssetPaths(trainerCharacterModules);