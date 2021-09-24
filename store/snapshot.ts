import Firebase from 'firebase';
import Snapshot from '~/application/domain/snapshot/snapshot';
import Hero from '~/application/domain/hero/hero';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';

interface SnapshotLoadHeroList {
  userId: string;
  snapshotId: string;
}

interface SnapshotHeroList {
  id: string;
  heroes: Array<Hero>;
}

interface State {
  loaded: boolean;
  list: Array<Snapshot>;
  heroList: Map<string, Array<Hero>>;
  snapshot: Snapshot;
}

export const state = (): State => ({
  loaded: false,
  list: [],
  heroList: new Map(),
  snapshot: new Snapshot(),
});

export const mutations = {
  // Basic
  SET_LOADED: (state: State, loaded: boolean) => {
    state.loaded = loaded;
  },
  SET_SNAPSHOT_LIST: (state: State, list: Array<Snapshot>) => {
    state.list = list;
  },
  SET_SNAPSHOT: (state: State, snapshot: Snapshot) => {
    state.snapshot = snapshot;
  },
  UPDATE_SNAPSHOT: (state: State, snapshot: Snapshot) => {
    const index = state.list.findIndex(elem => elem.id === snapshot.id);
    const newList = [...state.list];
    if (index === -1) {
      newList.push(snapshot);
    } else {
      newList.splice(index, 1, snapshot);
    }
    state.list = newList;
  },
  DELETE_SNAPSHOT: (state: State, id: string) => {
    state.list = state.list.filter(elem => elem.id !== id);
  },
  SET_SNAPSHOT_HERO_LIST: (state: State, { id, heroes }: SnapshotHeroList) => {
    state.heroList.set(id, heroes);
  },
  // Edit
  SET_SNAPSHOT_NAME: (state: State, name: string) => {
    state.snapshot.name = name;
  },
  SET_SNAPSHOT_FUTURE_GOAL: (state: State, futureGoal: boolean) => {
    state.snapshot.futureGoal = futureGoal;
  },
  SET_SNAPSHOT_CREATED_AT: (state: State, createdAt: number) => {
    state.snapshot.createdAt = createdAt;
  },
};

export const getters = {
  heroList: (state: State) => (snapshotId: string): Array<Hero> => {
    if (snapshotId) {
      return state.heroList.get(snapshotId) || [];
    }
    return [];
  },
};

export const actions = {
  async loadSnapshots(ctx: any, userId: string): Promise<void> {
    const snapshotCollectionRef = await Firebase.firestore().collection(`users/${userId}/snapshots`);
    const snapshots: Array<Snapshot> = (await snapshotCollectionRef.get()).docs.map((doc) => {
      const data = doc.data();
      return new Snapshot(doc.id, data.name, data.futureGoal, data.createdAt);
    });
    ctx.commit('SET_SNAPSHOT_LIST', snapshots);
    ctx.commit('SET_LOADED', true);
  },
  async loadHeroesForSnapshot(ctx: any, { userId, snapshotId }: SnapshotLoadHeroList): Promise<void> {
    const baseHeroes = ctx.rootState.hero.list;
    const playerHeroes = ctx.rootState.hero.playerHeroList.get(userId);
    const snapshotHeroesCollectionRef = await Firebase.firestore().collection(`users/${userId}/snapshots/${snapshotId}/heroes`);
    const snapshotHeroes: Array<Hero> = (await snapshotHeroesCollectionRef.get()).docs.map(doc => new Hero(doc.id, undefined, undefined, doc.data() as HeroPlayerInfo));

    const mergedHeroes: Array<Hero> = [];
    for (const hero of playerHeroes) {
      const snapshotHero = snapshotHeroes.find((elem: Hero) => elem.id === hero.id);
      const baseHero = baseHeroes.find((elem: Hero) => elem.id === hero.id);
      const playerHero = playerHeroes.find((elem: Hero) => elem.id === hero.id);
      let heroPlayerInfo: HeroPlayerInfo = playerHero.playerInfo;
      if (!snapshotHero) {
        heroPlayerInfo = JSON.parse(JSON.stringify(heroPlayerInfo));
        await snapshotHeroesCollectionRef.doc(hero.id).set(heroPlayerInfo);
      } else {
        heroPlayerInfo = snapshotHero.playerInfo;
      }
      mergedHeroes.push(new Hero(baseHero.id, baseHero.gameInfo, baseHero.systemInfo, heroPlayerInfo));
    }

    ctx.commit('SET_SNAPSHOT_HERO_LIST', { id: snapshotId, heroes: convertFirebaseHeroList(mergedHeroes) });
  },
};
