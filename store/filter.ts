import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';

export enum FilterCrystal {
  BOTH = 'BOTH',
  ON_CRYSTAL = 'ON_CRYSTAL',
  NOT_ON_CRYSTAL = 'NOT_ON_CRYSTAL',
}

export enum FilterSort {
  FACTION = 'FACTION',
  NAME = 'NAME',
  ASCENSION_DESC = 'ASCENSION_DESC',
  ASCENSION_ASC = 'ASCENSION_ASC',
  SI_DESC = 'SI_DESC',
  SI_ASC = 'SI_ASC',
  FURNITURE_DESC = 'FURNITURE_DESC',
  FURNITURE_ASC = 'FURNITURE_ASC',
  EQUIPMENT_DESC = 'EQUIPMENT_DESC',
  EQUIPMENT_ASC = 'EQUIPMENT_ASC',
}

export interface State {
  sort: FilterSort;
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

const initialFilter: State = {
  sort: FilterSort.FACTION,
  faction: [Faction.Lightbearer, Faction.Mauler, Faction.Wilder, Faction.Graveborn, Faction.Celestial, Faction.Hypogean, Faction.Dimensional],
  type: [Type.STR, Type.INT, Type.DEX],
  group: [Group.Support, Group.Mage, Group.Warrior, Group.Tank, Group.Ranger],
  role: [Role.AoE, Role.Assassin, Role.Buffer, Role.Tank, Role.BurstDamage, Role.ContinuousDamage, Role.Control, Role.Debuffer, Role.Regeneration],
  ascension: [
    Ascension.None, Ascension.Elite, Ascension.ElitePlus, Ascension.Legendary, Ascension.LegendaryPlus, Ascension.Mythic, Ascension.MythicPlus,
    Ascension.Ascended, Ascension.Ascended1Star, Ascension.Ascended2Star, Ascension.Ascended3Star, Ascension.Ascended4Star, Ascension.Ascended5Star,
  ],
  signatureItem: [-1, 41],
  furniture: [0, 10],
  engrave: [-1, 101],
  equipment: [0, 5],
  crystal: FilterCrystal.BOTH,
};

export const state = (): State => ({ ...initialFilter });

const setWholeFilterWithoutSort = (state: State, filter: State) => {
  state.faction = filter.faction;
  state.type = filter.type;
  state.group = filter.group;
  state.role = filter.role;
  state.ascension = filter.ascension;
  state.signatureItem = filter.signatureItem;
  state.furniture = filter.furniture;
  state.engrave = filter.engrave;
  state.equipment = filter.equipment;
  state.crystal = filter.crystal;
};

export const mutations = {
  RESET: (state: State) => {
    setWholeFilterWithoutSort(state, initialFilter);
    state.sort = FilterSort.FACTION;
  },
  SET_SORT: (state: State, sort: FilterSort) => {
    state.sort = sort;
  },
  SET_FACTION: (state: State, faction: Array<Faction>) => {
    state.faction = faction;
  },
  SET_TYPE: (state: State, type: Array<Type>) => {
    state.type = type;
  },
  SET_GROUP: (state: State, group: Array<Group>) => {
    state.group = group;
  },
  SET_ROLE: (state: State, role: Array<Role>) => {
    state.role = role;
  },
  SET_ASCENSION: (state: State, ascension: Array<Ascension>) => {
    state.ascension = ascension;
  },
  SET_SIGNATURE_ITEM: (state: State, signatureItem: Array<number>) => {
    state.signatureItem = signatureItem;
  },
  SET_FURNITURE: (state: State, furniture: Array<number>) => {
    state.furniture = furniture;
  },
  SET_ENGRAVE: (state: State, engrave: Array<number>) => {
    state.engrave = engrave;
  },
  SET_EQUIPMENT: (state: State, equipment: Array<number>) => {
    state.equipment = equipment;
  },
  SET_CRYSTAL: (state: State, crystal: FilterCrystal) => {
    state.crystal = crystal;
  },
};
