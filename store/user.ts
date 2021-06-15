import Firebase from 'firebase';
import User, { UserRole } from '~/application/domain/user';

interface State {
  user: User;
  isUserLoaded: boolean;
}

export const state = (): State => ({
  user: new User(),
  isUserLoaded: false,
});

export const mutations = {
  SET_NEW_USER: (state: State, { id, email }: User) => {
    state.user = new User();
    state.user.id = id;
    state.user.email = email;
  },
  CLEAR_USER: (state: State) => {
    state.user = new User();
    state.isUserLoaded = false;
  },
  SET_ROLES: (state: State, roles: Array<UserRole>) => {
    state.user.roles = roles;
  },
  SET_IS_USER_LOADED: (state: State, isLoaded: boolean) => {
    state.isUserLoaded = isLoaded;
  },
};

export const actions = {
  authStateChanged: async(ctx: any, { authUser }: any) => {
    if (authUser) {
      const { uid, email } = authUser;
      ctx.commit('SET_NEW_USER', { id: uid, email });

      const docRef = Firebase.firestore().collection('users').doc(uid);
      const doc = await docRef.get();
      if (doc.exists) {
        const docData = doc.data() || {};
        ctx.commit('SET_ROLES', docData.roles);
        // TODO other infos
      } else {
        const roles = ['PLAYER'];
        await docRef.set({ roles });
        ctx.commit('SET_ROLES', roles);
        // TODO rest of creation and checks
      }
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
