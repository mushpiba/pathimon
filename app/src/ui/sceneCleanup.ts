type DestroyableChild = {
  destroy?: (fromScene?: boolean) => void;
};

type SceneWithChildren = {
  children: {
    getAll: () => DestroyableChild[];
    removeAll: () => void;
  };
};

export function destroySceneChildren(scene: SceneWithChildren): void {
  const children = scene.children.getAll();
  children.forEach((child) => child.destroy?.());
  scene.children.removeAll();
}