import Firebase from 'firebase';
import Hero from '~/application/domain/hero/hero';
import User, { UserRole } from '~/application/domain/user/user';
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
      } else {
        const roles = ['PLAYER'];
        await docRef.set({ roles });
        ctx.commit('SET_ROLES', roles);
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

      ctx.commit('hero/SET_HERO_LIST', convertFirebaseHeroList(mergedHeroes), { root: true });
      ctx.commit('SET_IS_USER_LOADED', true);
    } else {
      ctx.commit('CLEAR_USER');
    }
  },
};
