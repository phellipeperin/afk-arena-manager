import Hero from '~/application/domain/hero/hero';
import HeroSkin from '~/application/domain/hero/hero-skin';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';

interface State {
  list: Array<Hero>;
  hero: Hero;
}

export const state = (): State => ({
  list: [],
  hero: new Hero(),
});

export const mutations = {
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
};
