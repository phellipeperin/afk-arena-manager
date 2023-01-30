import Firebase from 'firebase';
import { FilterCrystal, FilterEquipmentStars, FilterEquipmentState, FilterState } from './filter';
import Hero from '~/application/domain/hero/hero';
import HeroEquip from '~/application/domain/hero/hero-equip';
import User from '~/application/domain/user/user';
import UserHeroList from '~/application/domain/user/userHeroList';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Division } from '~/application/domain/info/division';
import { Role } from '~/application/domain/info/role';
import { sortHeroList } from '~/application/services/sortService';
import { mergeHeroList, convertFirebaseHeroList } from '~/application/services/firebaseConverterService';

interface PlayerHeroListUpdate {
  id: string;
  heroes: Array<Hero>;
}

interface PlayerHeroUpdate {
  id: string;
  hero: Hero;
}

interface State {
  list: Array<Hero>;
  playerHeroList: Map<string, Array<Hero>>;
  filteredPlayerHeroList: Map<string, Array<Hero>>;
  objectiveHeroList: Map<string, Array<Hero>>;
  hero: Hero; // only for admin edit
}

export const state = (): State => ({
  list: [],
  playerHeroList: new Map(),
  filteredPlayerHeroList: new Map(),
  objectiveHeroList: new Map(),
  hero: new Hero(),
});

export const mutations = {
  // Basic
  SET_BASE_HERO_LIST: (state: State, list: Array<Hero>) => {
    state.list = list;
  },
  SET_PLAYER_HERO_LIST: (state: State, { id, heroes }: PlayerHeroListUpdate) => {
    state.playerHeroList.set(id, heroes);
  },
  SET_FILTERED_PLAYER_HERO_LIST: (state: State, { id, heroes }: PlayerHeroListUpdate) => {
    state.filteredPlayerHeroList.set(id, heroes);
  },
  SET_OBJECTIVE_HERO_LIST: (state: State, { id, heroes }: PlayerHeroListUpdate) => {
    state.objectiveHeroList.set(id, heroes);
  },
  UPDATE_HERO: (state: State, hero: Hero) => {
    const newList = state.list.filter(elem => elem.id !== hero.id);
    newList.push(hero);
    state.list = newList;
  },
  UPDATE_PLAYER_HERO: (state: State, { id, hero }: PlayerHeroUpdate) => {
    const newList: Array<Hero> = state.playerHeroList.get(id)?.filter(elem => elem.id !== hero.id) || [];
    if (newList && newList.length) {
      newList.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, hero.playerInfo));

      const newMap = new Map(state.playerHeroList);
      newMap.delete(id);
      newMap.set(id, newList);
      state.playerHeroList = newMap;
    }
  },
  UPDATE_OBJECTIVE_HERO: (state: State, { id, hero }: PlayerHeroUpdate) => {
    const newList: Array<Hero> = state.objectiveHeroList.get(id)?.filter(elem => elem.id !== hero.id) || [];
    if (newList && newList.length) {
      newList.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, hero.playerInfo));

      const newMap = new Map(state.objectiveHeroList);
      newMap.delete(id);
      newMap.set(id, newList);
      state.objectiveHeroList = newMap;
    }
  },
  SET_HERO: (state: State, hero: Hero) => {
    state.hero = JSON.parse(JSON.stringify(hero));
  },
  // Admin Edit
  SET_GAME_INFO_NAME: (state: State, name: string) => {
    state.hero.gameInfo.name = name;
    state.hero.id = name.toUpperCase().split(' ').join('_');
  },
  SET_GAME_INFO_TITLE: (state: State, title: string) => {
    state.hero.gameInfo.title = title;
  },
  SET_SYSTEM_INFO_IMAGE_URL_NAME: (state: State, url: string) => {
    state.hero.systemInfo.imageUrlName = url;
  },
  SET_GAME_INFO_AWAKENED: (state: State, awakened: boolean) => {
    state.hero.gameInfo.awakened = awakened;
  },
  SET_GAME_INFO_FACTION: (state: State, faction: Faction) => {
    state.hero.gameInfo.faction = faction;
  },
  SET_GAME_INFO_TYPE: (state: State, type: Type) => {
    state.hero.gameInfo.type = type;
  },
  SET_GAME_INFO_DIVISION: (state: State, division: Division) => {
    state.hero.gameInfo.division = division;
  },
  SET_GAME_INFO_ROLE: (state: State, role: Role) => {
    state.hero.gameInfo.role = role;
  },
};

export const getters = {
  userHeroList: (state: State) => (users: Array<User>): Array<UserHeroList> => {
    const list: Array<UserHeroList> = [];
    users.forEach((user: User) => {
      list.push(new UserHeroList(user, state.playerHeroList.get(user.id) || []));
    });
    return list;
  },
  baseHeroList: (state: State) => (userId: string): Array<Hero> => {
    return state.playerHeroList.get(userId) || [];
  },
  heroList: (state: State) => (userId: string): Array<Hero> => {
    return state.filteredPlayerHeroList.get(userId) || [];
  },
  objectiveHeroList: (state: State) => (groupId: string): Array<Hero> => {
    return state.objectiveHeroList.get(groupId) || [];
  },
};

export const actions = {
  async loadHeroesForUser(ctx: any, userId: string): Promise<void> {
    const playerHeroesCollectionRef = await Firebase.firestore().collection(`users/${userId}/heroes`);
    ctx.commit('SET_PLAYER_HERO_LIST', { id: userId, heroes: convertFirebaseHeroList(await mergeHeroList(playerHeroesCollectionRef, ctx.state.list)) });
  },
  async loadPersonalObjectiveHeroes(ctx: any, userId: string): Promise<void> {
    const objectiveHeroesCollectionRef = await Firebase.firestore().collection(`users/${userId}/objective`);
    ctx.commit('SET_OBJECTIVE_HERO_LIST', { id: 'personal', heroes: convertFirebaseHeroList(await mergeHeroList(objectiveHeroesCollectionRef, ctx.state.list)) });
  },
  async loadGroupObjectiveHeroes(ctx: any, groupId: string): Promise<void> {
    const objectiveHeroesCollectionRef = await Firebase.firestore().collection(`groups/${groupId}/objective`);
    ctx.commit('SET_OBJECTIVE_HERO_LIST', { id: groupId, heroes: convertFirebaseHeroList(await mergeHeroList(objectiveHeroesCollectionRef, ctx.state.list)) });
  },
  filterChange(ctx: any, filterState: FilterState): void {
    const loweredTextSearch = (filterState.textSearch || '').toLowerCase();
    for (const [key, value] of ctx.state.playerHeroList.entries()) {
      const newHeroList: Array<Hero> = [];

      ctx.state.list.forEach((hero: Hero) => {
        const playerHero = value.find((elem: Hero) => elem.id === hero.id) as Hero;

        if (!playerHero.gameInfo.name.toLowerCase().includes(loweredTextSearch)) {
          return;
        }

        if ((filterState.faction.length && !filterState.faction.includes(playerHero.gameInfo.faction)) ||
          (filterState.type.length && !filterState.type.includes(playerHero.gameInfo.type)) ||
          (filterState.division.length && !filterState.division.includes(playerHero.gameInfo.division)) ||
          (filterState.role.length && !filterState.role.includes(playerHero.gameInfo.role)) ||
          (filterState.ascension.length && !filterState.ascension.includes(playerHero.playerInfo.ascension))) {
          return;
        }

        const playerSI = playerHero.playerInfo.signatureItem;
        const playerFurnitureNumber = playerHero.playerInfo.furniture;
        const playerEngrave = playerHero.playerInfo.engrave < 0 ? 0 : playerHero.playerInfo.engrave;
        const playerEquipmentNumber = playerHero.playerInfo.equipment.filter(elem => elem.tier === filterState.equipmentTier).length;

        if (filterState.signatureItemMin > playerSI ||
          filterState.signatureItemMax < playerSI ||
          filterState.furnitureMin > playerFurnitureNumber ||
          filterState.furnitureMax < playerFurnitureNumber ||
          filterState.engraveMin > playerEngrave ||
          filterState.engraveMax < playerEngrave ||
          filterState.equipmentMin > playerEquipmentNumber ||
          filterState.equipmentMax < playerEquipmentNumber) {
          return;
        }

        if ((filterState.crystal === FilterCrystal.ON_CRYSTAL && !playerHero.playerInfo.onCrystal) ||
          (filterState.crystal === FilterCrystal.NOT_ON_CRYSTAL && playerHero.playerInfo.onCrystal)) {
          return;
        }

        const equips = playerHero.playerInfo.equipment;
        const isIncorrectEquipmentState = equips.some((equipItem: HeroEquip) => equipItem.faction !== playerHero.gameInfo.faction && equipItem.tier === -1);
        const isNotFullEquipmentStars = equips.some((equipItem: HeroEquip) => equipItem.tier !== -1 && equipItem.stars !== 5);

        if ((filterState.equipmentState === FilterEquipmentState.CORRECT && isIncorrectEquipmentState) ||
          (filterState.equipmentState === FilterEquipmentState.INCORRECT && !isIncorrectEquipmentState)) {
          return;
        }

        if ((filterState.equipmentStars === FilterEquipmentStars.FULL && isNotFullEquipmentStars) ||
          (filterState.equipmentStars === FilterEquipmentStars.NOT_FULL && !isNotFullEquipmentStars)) {
          return;
        }

        newHeroList.push(playerHero);
      });

      ctx.commit('SET_FILTERED_PLAYER_HERO_LIST', { id: key, heroes: sortHeroList(newHeroList, filterState.sort) });
    }
  },
};
