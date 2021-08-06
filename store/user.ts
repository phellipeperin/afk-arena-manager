import Firebase from 'firebase';
import Hero from '~/application/domain/hero/hero';
import User, { UserRole } from '~/application/domain/user/user';
import UserGameInfo from '~/application/domain/user/userGameInfo';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserProgressInfo from '~/application/domain/user/userProgressInfo';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';
import Artifact from '~/application/domain/artifact/artifact';

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
  SET_IS_USER_LOADED: (state: State, isLoaded: boolean) => {
    state.isUserLoaded = isLoaded;
  },
  SET_ROLES: (state: State, roles: Array<UserRole>) => {
    state.user.roles = roles;
  },
  SET_SYSTEM_INFO: (state: State, systemInfo: UserSystemInfo) => {
    state.user.systemInfo = systemInfo;
  },
  SET_GAME_INFO: (state: State, gameInfo: UserGameInfo) => {
    state.user.gameInfo = gameInfo;
  },
  SET_PROGRESS_INFO: (state: State, progressInfo: UserProgressInfo) => {
    state.user.progressInfo = progressInfo;
  },
  SET_PROGRESS_INFO_ARTIFACT: (state: State, artifact: Artifact) => {
    // TODO
  },
  SET_FRIENDS: (state: State, friends: Array<string>) => {
    state.user.friends = friends;
  },
};

export const actions = {
  authStateChanged: async(ctx: any, { authUser }: any) => {
    if (authUser) {
      const { uid, email } = authUser;
      ctx.commit('SET_NEW_USER', { id: uid, email });

      const adminHeroesCollection = await Firebase.firestore().collection('heroes').get();
      const adminHeroes: Array<Hero> = adminHeroesCollection.docs.map((doc) => {
        const data = doc.data();
        return new Hero(doc.id, data.gameInfo, data.systemInfo);
      });

      const docRef = Firebase.firestore().collection('users').doc(uid);
      const doc = await docRef.get();
      if (doc.exists) {
        const docData = doc.data() || {};

        ctx.commit('SET_ROLES', docData.roles);
        ctx.commit('SET_SYSTEM_INFO', docData.systemInfo);
        ctx.commit('SET_GAME_INFO', docData.gameInfo);
        ctx.commit('SET_PROGRESS_INFO', docData.progressInfo);
        ctx.commit('SET_FRIENDS', docData.friends);

        const loadedFriendList: Array<User> = [];
        for (const friend of docData.friends) {
          const friendDocRef = Firebase.firestore().collection('users').doc(friend);
          const friendDoc = await friendDocRef.get();
          if (friendDoc.exists) {
            const friendData = friendDoc.data() || {};
            const friendUser = new User();
            friendUser.id = friendDoc.id;
            friendUser.systemInfo = friendData.systemInfo || new UserSystemInfo();
            friendUser.gameInfo = friendData.gameInfo || new UserGameInfo();
            friendUser.progressInfo = friendData.progressInfo || new UserProgressInfo();
            loadedFriendList.push(friendUser);
          }
        }
        ctx.commit('friend/SET_LIST', loadedFriendList, { root: true });
      } else {
        const roles = ['PLAYER'];
        const systemInfo = new UserSystemInfo();
        const gameInfo = new UserGameInfo();
        const progressInfo = new UserProgressInfo();
        const friends: Array<string> = [];

        await docRef.set({ roles, systemInfo, gameInfo, friends });
        ctx.commit('SET_ROLES', roles);
        ctx.commit('SET_SYSTEM_INFO', systemInfo);
        ctx.commit('SET_GAME_INFO', gameInfo);
        ctx.commit('SET_PROGRESS_INFO', progressInfo);
        ctx.commit('SET_FRIENDS', friends);
      }

      ctx.commit('hero/SET_BASE_HERO_LIST', convertFirebaseHeroList(adminHeroes), { root: true });
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
