import Resources from '~/application/domain/resources/resources';

interface PlayerResourcesUpdate {
  id: string;
  resources: Resources;
}

interface PlayerInnerAttributeUpdate {
  id: string;
  value: number;
}

interface State {
  playerResources: Map<string, Resources>;
}

export const state = (): State => ({
  playerResources: new Map(),
});

export const mutations = {
  SET_PLAYER_RESOURCES: (state: State, { id, resources }: PlayerResourcesUpdate) => {
    state.playerResources.set(id, resources);
  },
  // Elder Tree
  UPDATE_ELDER_TREE_SUPPORT: (state: State, { id, value }: PlayerInnerAttributeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree: { ...resources.elderTree, support: value } });
    state.playerResources = newMap;
  },
  UPDATE_ELDER_TREE_MAGE: (state: State, { id, value }: PlayerInnerAttributeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree: { ...resources.elderTree, mage: value } });
    state.playerResources = newMap;
  },
  UPDATE_ELDER_TREE_WARRIOR: (state: State, { id, value }: PlayerInnerAttributeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree: { ...resources.elderTree, warrior: value } });
    state.playerResources = newMap;
  },
  UPDATE_ELDER_TREE_TANK: (state: State, { id, value }: PlayerInnerAttributeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree: { ...resources.elderTree, tank: value } });
    state.playerResources = newMap;
  },
  UPDATE_ELDER_TREE_RANGER: (state: State, { id, value }: PlayerInnerAttributeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree: { ...resources.elderTree, ranger: value } });
    state.playerResources = newMap;
  },
};
