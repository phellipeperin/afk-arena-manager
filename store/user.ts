import User from '~/application/domain/user';

interface State {
  user: User;
}

export const state = (): State => ({
  user: new User(),
});

export const mutations = {
  // set: (state: State, user: User) => {
  //   state.user = user;
  // },
  ON_AUTH_STATE_CHANGED_MUTATION: (state: State, { authUser, claims }: any) => {
    console.log(authUser);
    console.log(claims);
    const { uid } = authUser;
    state.user = {
      id: uid,
    };
  },
};
