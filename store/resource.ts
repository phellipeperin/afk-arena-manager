import Resources from '~/application/domain/resources/resources';
import ResourceElderTree from '~/application/domain/resources/resourceElderTree';
import ResourceArtifact from '~/application/domain/resources/resourceArtifact';

interface PlayerResourcesUpdate {
  id: string;
  resources: Resources;
}

interface PlayerElderTreeUpdate {
  id: string;
  elderTree: ResourceElderTree;
}

interface PlayerArtifactsUpdate {
  id: string;
  artifacts: Array<ResourceArtifact>;
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
  UPDATE_ELDER_TREE: (state: State, { id, elderTree }: PlayerElderTreeUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, elderTree });
    state.playerResources = newMap;
  },
  UPDATE_ARTIFACTS: (state: State, { id, artifacts }: PlayerArtifactsUpdate) => {
    const resources = state.playerResources.get(id) || new Resources();
    const newMap = new Map(state.playerResources);
    newMap.delete(id);
    newMap.set(id, { ...resources, artifacts });
    state.playerResources = newMap;
  },
};

export const getters = {
  playerResources: (state: State) => (userId: string): Resources => {
    return state.playerResources.get(userId) || new Resources();
  },
};
