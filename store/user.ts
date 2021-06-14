import User, { UserRole } from '~/application/domain/user';

interface State {
  user: User;
}

export const state = (): State => ({
  user: new User(),
});

export const mutations = {
  SET_NEW_USER: (state: State, id: string, email: string) => {
    state.user = new User();
    state.user.id = id;
    state.user.email = email;
  },
  CLEAR_USER: (state: State) => {
    state.user = new User();
  },
  SET_ROLES: (state: State, roles: Array<UserRole>) => {
    state.user.roles = roles;
  },
};

export const actions = {
  authStateChanged: (ctx: any, { authUser }: any) => {
    if (authUser) {
      const { uid, email } = authUser;
      ctx.commit('SET_NEW_USER', uid, email);
      // TODO get (or create) user basic info

      console.log(ctx.$fire);

      // const docRef = this.$fire.firestore.collection('users').doc(response?.user?.uid);
      // await docRef.set({ roles: ['PLAYER'] });
    } else {
      ctx.commit('CLEAR_USER');
      // TODO go to login
    }
  },
};
