import User from '~/application/domain/user';

interface State {
  user: User;
}

export const state = (): State => ({
  user: new User(),
});

export const mutations = {
  AUTH_STATE_CHANGED: (state: State, { authUser }: any) => {
    if (authUser) {
      const { uid } = authUser;
      state.user = {
        id: uid,
      };
    } else {
      state.user = new User();
    }
  },
};
