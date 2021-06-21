import Hero from '~/application/domain/hero/hero';
import HeroSkin from '~/application/domain/hero/hero-skin';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import HeroFurniture from '~/application/domain/hero/hero-furniture';
import HeroEquip from '~/application/domain/hero/hero-equip';
import {
  getMinNumberOfCopies,
  isFurnitureAvailable,
  isSignatureItemAvailable,
} from '~/application/services/heroService';

interface State {
  list: Array<Hero>;
  hero: Hero;
}

export const state = (): State => ({
  list: [],
  hero: new Hero(),
});

export const mutations = {
  // Basic
  SET_HERO_LIST: (state: State, list: Array<Hero>) => {
    state.list = list;
  },
  UPDATE_HERO_IN_LIST: (state: State, hero: Hero) => {
    const newList = state.list.filter(elem => elem.id !== hero.id);
    newList.push(hero);
    state.list = newList;
  },
  SET_HERO: (state: State, hero: Hero) => {
    state.hero = hero;
  },
  // Admin Edit
  SET_GAME_INFO_NAME: (state: State, name: string) => {
    state.hero.gameInfo.name = name;
    state.hero.id = name.toUpperCase().split(' ').join('_');
  },
  SET_GAME_INFO_TITLE: (state: State, title: string) => {
    state.hero.gameInfo.title = title;
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
    const minCopies = getMinNumberOfCopies(state.hero.gameInfo.faction, ascension);
    if (minCopies > state.hero.playerInfo.numberOfCopies) {
      state.hero.playerInfo.numberOfCopies = minCopies;
    }
    if (!isSignatureItemAvailable(ascension)) {
      state.hero.playerInfo.signatureItem = -1;
    }
    if (!isFurnitureAvailable(ascension)) {
      state.hero.playerInfo.furniture = state.hero.playerInfo.furniture.map(elem => ({ ...elem, plus: -1 }));
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
  SET_PLAYER_INFO_ACQUIRED_SKINS: (state: State, skins: Array<string>) => {
    state.hero.playerInfo.acquiredSkins = skins;
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
  SET_PLAYER_INFO_FURNITURE_PLUS: (state: State, { plus, pos, type }: HeroFurniture) => {
    const index = state.hero.playerInfo.furniture.findIndex(elem => elem.pos === pos && elem.type === type);
    state.hero.playerInfo.furniture[index].plus = plus;
  },
};
