import Firebase from 'firebase';
import { FilterCrystal, FilterState } from './filter';
import Hero from '~/application/domain/hero/hero';
import HeroSkin from '~/application/domain/hero/hero-skin';
import HeroEquip from '~/application/domain/hero/hero-equip';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import User from '~/application/domain/user/user';
import UserHeroList from '~/application/domain/user/userHeroList';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import { sortHeroList } from '~/application/services/sortService';
import { getMinNumberOfCopies } from '~/application/services/resource/resourceAscensionService';
import { isSignatureItemAvailable } from '~/application/services/resource/resourceSignatureItemService';
import { isFurnitureAvailable } from '~/application/services/resource/resourceFurnitureService';
import { isEngraveAvailable } from '~/application/services/resource/resourceEngraveService';
import { convertFirebaseHeroList } from '~/application/services/firebaseConverterService';

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
  hero: Hero;
}

export const state = (): State => ({
  list: [],
  playerHeroList: new Map(),
  filteredPlayerHeroList: new Map(),
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
  SET_GAME_INFO_AWAKENED: (state: State, awakened: boolean) => {
    state.hero.gameInfo.awakened = awakened;
  },
  SET_GAME_INFO_FACTION: (state: State, faction: Faction) => {
    state.hero.gameInfo.faction = faction;
  },
  SET_GAME_INFO_TYPE: (state: State, type: Type) => {
    state.hero.gameInfo.type = type;
  },
  SET_GAME_INFO_GROUP: (state: State, group: Group) => {
    state.hero.gameInfo.group = group;
  },
  SET_GAME_INFO_ROLE: (state: State, role: Role) => {
    state.hero.gameInfo.role = role;
  },
  SET_GAME_INFO_IMAGE_PROFILE: (state: State, imageUrl: string) => {
    state.hero.gameInfo.images.profile = imageUrl;
  },
  SET_GAME_INFO_IMAGE_BANNER: (state: State, imageUrl: string) => {
    state.hero.gameInfo.images.banner = imageUrl;
  },
  SET_GAME_INFO_ADD_SKIN: (state: State) => {
    state.hero.gameInfo.skins.push(new HeroSkin());
  },
  SET_GAME_INFO_REMOVE_SKIN: (state: State, pos: number) => {
    state.hero.gameInfo.skins.splice(pos, 1);
  },
  SET_GAME_INFO_SKIN_NAME: (state: State, { pos, name }: any) => {
    state.hero.gameInfo.skins[pos].name = name;
    state.hero.gameInfo.skins[pos].id = name.toUpperCase().split(' ').join('_');
  },
  SET_GAME_INFO_SKIN_IMAGE: (state: State, { pos, imageUrl }: any) => {
    state.hero.gameInfo.skins[pos].profileImage = imageUrl;
  },
  // Player Edit
  SET_PLAYER_INFO_ASCENSION: (state: State, ascension: Ascension) => {
    state.hero.playerInfo.ascension = ascension;
    const minCopies = getMinNumberOfCopies(state.hero.gameInfo.faction, state.hero.gameInfo.awakened, ascension);
    if (minCopies > state.hero.playerInfo.numberOfCopies) {
      state.hero.playerInfo.numberOfCopies = minCopies;
    }
    if (!isSignatureItemAvailable(ascension)) {
      state.hero.playerInfo.signatureItem = -1;
    }
    if (!isEngraveAvailable(ascension)) {
      state.hero.playerInfo.engrave = 0;
    }
    if (!isFurnitureAvailable(ascension)) {
      state.hero.playerInfo.furniture = 0;
    }
    if (ascension === Ascension.None) {
      state.hero.playerInfo.numberOfCopies = 0;
      state.hero.playerInfo.onCrystal = false;
      state.hero.playerInfo.equipment = state.hero.playerInfo.equipment.map(elem => (new HeroEquip(elem.type)));
    }
  },
  SET_PLAYER_INFO_NO_OF_COPIES: (state: State, numberOfCopies: number) => {
    state.hero.playerInfo.numberOfCopies = numberOfCopies;
  },
  SET_PLAYER_INFO_ON_CRYSTAL: (state: State, onCrystal: boolean) => {
    state.hero.playerInfo.onCrystal = onCrystal || false;
  },
  SET_PLAYER_INFO_SIGNATURE_ITEM: (state: State, signatureItem: number) => {
    state.hero.playerInfo.signatureItem = signatureItem;
  },
  SET_PLAYER_INFO_FURNITURE: (state: State, furniture: number) => {
    state.hero.playerInfo.furniture = furniture;
  },
  SET_PLAYER_INFO_ENGRAVE: (state: State, engrave: number) => {
    state.hero.playerInfo.engrave = engrave;
  },
  SET_PLAYER_INFO_ACQUIRED_SKINS: (state: State, skins: Array<string>) => {
    state.hero.playerInfo.acquiredSkins = skins;
  },
  SET_PLAYER_INFO_PRIORITY: (state: State, priority: number) => {
    state.hero.playerInfo.priority = priority;
  },
  SET_PLAYER_INFO_EQUIP_TIER: (state: State, { type, tier }: HeroEquip) => {
    const newTier = Number(tier);
    const index = state.hero.playerInfo.equipment.findIndex(elem => elem.type === type);
    state.hero.playerInfo.equipment[index].tier = newTier;
    if (newTier === 3) {
      state.hero.playerInfo.equipment[index].faction = state.hero.gameInfo.faction;
      state.hero.playerInfo.equipment[index].stars = 5;
    }
    if (newTier === -1) {
      state.hero.playerInfo.equipment[index].faction = Faction.None;
      state.hero.playerInfo.equipment[index].stars = 0;
    }
  },
  SET_PLAYER_INFO_EQUIP_FACTION: (state: State, { type, faction }: HeroEquip) => {
    const index = state.hero.playerInfo.equipment.findIndex(elem => elem.type === type);
    state.hero.playerInfo.equipment[index].faction = faction;
  },
  SET_PLAYER_INFO_EQUIP_STARS: (state: State, { type, stars }: HeroEquip) => {
    const index = state.hero.playerInfo.equipment.findIndex(elem => elem.type === type);
    state.hero.playerInfo.equipment[index].stars = stars;
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
};

export const actions = {
  async loadHeroesForUser(ctx: any, userId: string): Promise<void> {
    const playerHeroesCollectionRef = await Firebase.firestore().collection(`users/${userId}/heroes`);
    const playerHeroes: Array<Hero> = (await playerHeroesCollectionRef.get()).docs.map(doc => new Hero(doc.id, undefined, undefined, doc.data() as HeroPlayerInfo));

    const mergedHeroes: Array<Hero> = [];
    for (const hero of ctx.state.list) {
      const index = playerHeroes.findIndex(elem => elem.id === hero.id);
      let heroPlayerInfo: HeroPlayerInfo = new HeroPlayerInfo();
      if (index === -1) {
        await playerHeroesCollectionRef.doc(hero.id).set(JSON.parse(JSON.stringify(new HeroPlayerInfo())));
      } else {
        heroPlayerInfo = playerHeroes[index].playerInfo;
      }
      mergedHeroes.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, heroPlayerInfo));
    }

    ctx.commit('SET_PLAYER_HERO_LIST', { id: userId, heroes: convertFirebaseHeroList(mergedHeroes) });
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

        if (!filterState.faction.includes(playerHero.gameInfo.faction) ||
          !filterState.type.includes(playerHero.gameInfo.type) ||
          !filterState.group.includes(playerHero.gameInfo.group) ||
          !filterState.role.includes(playerHero.gameInfo.role) ||
          !filterState.ascension.includes(playerHero.playerInfo.ascension)) {
          return;
        }

        const playerSI = playerHero.playerInfo.signatureItem;
        const playerFurnitureNumber = playerHero.playerInfo.furniture;
        const playerEngrave = playerHero.playerInfo.engrave < 0 ? 0 : playerHero.playerInfo.engrave;
        const playerEquipmentNumber = playerHero.playerInfo.equipment.filter(elem => elem.tier === 3).length;
        const playerPriorityNumber = playerHero.playerInfo.priority;

        if (filterState.signatureItemMin > playerSI ||
          filterState.signatureItemMax < playerSI ||
          filterState.furnitureMin > playerFurnitureNumber ||
          filterState.furnitureMax < playerFurnitureNumber ||
          filterState.engraveMin > playerEngrave ||
          filterState.engraveMax < playerEngrave ||
          filterState.equipmentMin > playerEquipmentNumber ||
          filterState.equipmentMax < playerEquipmentNumber ||
          filterState.priorityMin > playerPriorityNumber ||
          filterState.priorityMax < playerPriorityNumber) {
          return;
        }

        if ((filterState.crystal === FilterCrystal.ON_CRYSTAL && !playerHero.playerInfo.onCrystal) ||
          (filterState.crystal === FilterCrystal.NOT_ON_CRYSTAL && playerHero.playerInfo.onCrystal)) {
          return;
        }

        newHeroList.push(playerHero);
      });

      ctx.commit('SET_FILTERED_PLAYER_HERO_LIST', { id: key, heroes: sortHeroList(newHeroList, filterState.sort) });
    }
  },
};
