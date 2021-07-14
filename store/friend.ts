import User from '~/application/domain/user/user';

interface State {
  list: Array<User>;
}

export const state = (): State => ({
  list: [],
});

export const mutations = {
  SET_LIST: (state: State, list: Array<User>) => {
    state.list = list;
  },
};
