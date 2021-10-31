import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import Hero from '~/application/domain/hero/hero';
import Firebase from 'firebase';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';
import { getGameBaseFilters } from '~/application/services/filterService';

export enum FilterCrystal {
  BOTH = 'BOTH',
  ON_CRYSTAL = 'ON_CRYSTAL',
  NOT_ON_CRYSTAL = 'NOT_ON_CRYSTAL',
}

export enum FilterSort {
  DEFAULT = 'DEFAULT',
  FACTION = 'FACTION',
  NAME = 'NAME',
  ASCENSION_DESC = 'ASCENSION_DESC',
  ASCENSION_ASC = 'ASCENSION_ASC',
  SI_DESC = 'SI_DESC',
  SI_ASC = 'SI_ASC',
  FURNITURE_DESC = 'FURNITURE_DESC',
  FURNITURE_ASC = 'FURNITURE_ASC',
  ENGRAVE_DESC = 'ENGRAVE_DESC',
  ENGRAVE_ASC = 'ENGRAVE_ASC',
  EQUIPMENT_DESC = 'EQUIPMENT_DESC',
  EQUIPMENT_ASC = 'EQUIPMENT_ASC',
}

export enum FilterGroupBy {
  NONE = 'NONE',
  FACTION = 'FACTION',
  ASCENSION = 'ASCENSION',
  SI = 'SI',
  FURNITURE = 'FURNITURE',
  ENGRAVE = 'ENGRAVE',
  EQUIPMENT = 'EQUIPMENT',
}

export interface FilterState {
  sort: FilterSort;
  groupBy: FilterGroupBy;
  faction: Array<Faction>;
  type: Array<Type>;
  group: Array<Group>;
  role: Array<Role>;
  ascension: Array<Ascension>;
  signatureItem: Array<number>;
  furniture: Array<number>;
  engrave: Array<number>;
  equipment: Array<number>;
  crystal: FilterCrystal;
}

export interface Filter {
  id: string;
  name: string;
  state: FilterState;
}

interface State {
  current: FilterState;
  gameList: Array<Filter>;
  playerList: Array<Filter>;
}

const gameFilters = getGameBaseFilters();
export const state = (): State => ({
  current: JSON.parse(JSON.stringify(gameFilters[0].state)),
  gameList: gameFilters,
  playerList: [],
});

export const mutations = {
  SET_WHOLE_FILTER: (state: State, filterState: FilterState) => {
    state.current = JSON.parse(JSON.stringify(filterState));
  },
  SET_SORT: (state: State, sort: FilterSort) => {
    state.current.sort = sort;
  },
  SET_GROUP_BY: (state: State, groupBy: FilterGroupBy) => {
    state.current.groupBy = groupBy;
  },
  SET_FACTION: (state: State, faction: Array<Faction>) => {
    state.current.faction = faction;
  },
  SET_TYPE: (state: State, type: Array<Type>) => {
    state.current.type = type;
  },
  SET_GROUP: (state: State, group: Array<Group>) => {
    state.current.group = group;
  },
  SET_ROLE: (state: State, role: Array<Role>) => {
    state.current.role = role;
  },
  SET_ASCENSION: (state: State, ascension: Array<Ascension>) => {
    state.current.ascension = ascension;
  },
  SET_SIGNATURE_ITEM: (state: State, signatureItem: Array<number>) => {
    state.current.signatureItem = signatureItem;
  },
  SET_FURNITURE: (state: State, furniture: Array<number>) => {
    state.current.furniture = furniture;
  },
  SET_ENGRAVE: (state: State, engrave: Array<number>) => {
    state.current.engrave = engrave;
  },
  SET_EQUIPMENT: (state: State, equipment: Array<number>) => {
    state.current.equipment = equipment;
  },
  SET_CRYSTAL: (state: State, crystal: FilterCrystal) => {
    state.current.crystal = crystal;
  },
};

// export const getters = {
//   default: (state: State) => (userId: string): Array<Hero> => {
//     return [];
//   },
// };

// export const actions = {
//   async load(ctx: any, userId: string): Promise<void> {
//     const playerHeroesCollectionRef = await Firebase.firestore().collection(`users/${userId}/heroes`);
//     const playerHeroes: Array<Hero> = (await playerHeroesCollectionRef.get()).docs.map(doc => new Hero(doc.id, undefined, undefined, doc.data() as HeroPlayerInfo));
//
//     const mergedHeroes: Array<Hero> = [];
//     for (const hero of ctx.state.list) {
//       const index = playerHeroes.findIndex(elem => elem.id === hero.id);
//       let heroPlayerInfo: HeroPlayerInfo = new HeroPlayerInfo();
//       if (index === -1) {
//         await playerHeroesCollectionRef.doc(hero.id).set(JSON.parse(JSON.stringify(new HeroPlayerInfo())));
//       } else {
//         heroPlayerInfo = playerHeroes[index].playerInfo;
//       }
//       mergedHeroes.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, heroPlayerInfo));
//     }
//
//     ctx.commit('SET_PLAYER_HERO_LIST', { id: userId, heroes: convertFirebaseHeroList(mergedHeroes) });
//   },
// };
