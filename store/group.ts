import Group from '~/application/domain/group/group';

interface State {
  list: Array<Group>;
}

export const state = (): State => ({
  list: [],
});

export const mutations = {
  SET_LIST: (state: State, list: Array<Group>) => {
    state.list = list;
  },
};
