import Firebase from 'firebase';
import Hero from '~/application/domain/hero/hero';
import User, { UserRole } from '~/application/domain/user/user';
import UserGameInfo from '~/application/domain/user/userGameInfo';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';
import { Filter } from '~/store/filter';
import Resources from '~/application/domain/resources/resources';

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
        const filtersCollection = await Firebase.firestore().collection(`users/${uid}/filters`).get();
        const filters: Array<Filter> = filtersCollection.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, name: data.name, state: data.state };
        });

        ctx.commit('SET_ROLES', docData.roles);
        ctx.commit('SET_SYSTEM_INFO', docData.systemInfo);
        ctx.commit('SET_GAME_INFO', docData.gameInfo);
        ctx.commit('SET_FRIENDS', docData.friends);
        ctx.commit('SET_FRIENDS', docData.friends);
        ctx.commit('filter/SET_USER_FILTERS', filters, { root: true });
        ctx.commit('resource/SET_PLAYER_RESOURCES', { id: uid, resources: docData.resources || new Resources() }, { root: true });

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
            friendUser.resources = friendData.resources || new Resources();
            loadedFriendList.push(friendUser);
            ctx.commit('resource/SET_PLAYER_RESOURCES', { id: friendUser.id, resources: friendUser.resources }, { root: true });
          }
        }
        ctx.commit('friend/SET_LIST', loadedFriendList, { root: true });
      } else {
        const roles = ['PLAYER'];
        const systemInfo = new UserSystemInfo();
        const gameInfo = new UserGameInfo();
        const resources = new Resources();
        const friends: Array<string> = [];

        await docRef.set(JSON.parse(JSON.stringify({ roles, systemInfo, gameInfo, friends, resources })));
        ctx.commit('SET_ROLES', roles);
        ctx.commit('SET_SYSTEM_INFO', systemInfo);
        ctx.commit('SET_GAME_INFO', gameInfo);
        ctx.commit('SET_FRIENDS', friends);
        ctx.commit('resource/SET_PLAYER_RESOURCES', { id: uid, resources }, { root: true });
      }

      ctx.commit('hero/SET_BASE_HERO_LIST', convertFirebaseHeroList(adminHeroes), { root: true });
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
