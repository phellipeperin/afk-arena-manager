import Firebase from 'firebase';
import Hero from '~/application/domain/hero/hero';
import User, { UserRole } from '~/application/domain/user/user';
import UserGameInfo from '~/application/domain/user/userGameInfo';
import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';

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
      const playerHeroesCollectionRef = await Firebase.firestore().collection(`users/${uid}/heroes`);
      const playerHeroes: Array<Hero> = (await playerHeroesCollectionRef.get()).docs.map(doc => new Hero(doc.id, undefined, undefined, doc.data() as HeroPlayerInfo));

      const docRef = Firebase.firestore().collection('users').doc(uid);
      const doc = await docRef.get();
      if (doc.exists) {
        const docData = doc.data() || {};

        ctx.commit('SET_ROLES', docData.roles);
        ctx.commit('SET_SYSTEM_INFO', docData.systemInfo);
        ctx.commit('SET_GAME_INFO', docData.gameInfo);
        ctx.commit('SET_FRIENDS', docData.friends);
      } else {
        const roles = ['PLAYER'];
        const systemInfo = new UserSystemInfo();
        const gameInfo = new UserGameInfo();
        const friends: Array<string> = [];

        await docRef.set({ roles, systemInfo, gameInfo, friends });
        ctx.commit('SET_ROLES', roles);
        ctx.commit('SET_SYSTEM_INFO', systemInfo);
        ctx.commit('SET_GAME_INFO', gameInfo);
        ctx.commit('SET_FRIENDS', friends);
      }

      const mergedHeroes: Array<Hero> = [];
      for (const hero of adminHeroes) {
        const index = playerHeroes.findIndex(elem => elem.id === hero.id);
        let heroPlayerInfo: HeroPlayerInfo = new HeroPlayerInfo();
        if (index === -1) {
          await playerHeroesCollectionRef.doc(hero.id).set(JSON.parse(JSON.stringify(new HeroPlayerInfo())));
        } else {
          heroPlayerInfo = playerHeroes[index].playerInfo;
        }
        mergedHeroes.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, heroPlayerInfo));
      }

      ctx.commit('hero/SET_BASE_HERO_LIST', convertFirebaseHeroList(adminHeroes), { root: true });
      ctx.commit('hero/SET_PLAYER_HERO_LIST', { id: uid, heroes: convertFirebaseHeroList(mergedHeroes) }, { root: true });
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
