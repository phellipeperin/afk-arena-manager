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

// export interface Filter {
//   id: string;
//   name: string;
//   default: boolean;
//   filterState: FilterState;
// }

const initialFilterState: FilterState = {
  sort: FilterSort.DEFAULT,
  groupBy: FilterGroupBy.NONE,
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
  engrave: [0, 101],
  equipment: [0, 5],
  crystal: FilterCrystal.BOTH,
};

interface State {
  current: FilterState;
}

export const state = (): State => ({ current: { ...initialFilterState } });

const setWholeFilter = (state: State, filterState: FilterState) => {
  state.current.sort = filterState.sort;
  state.current.groupBy = filterState.groupBy;
  state.current.faction = filterState.faction;
  state.current.type = filterState.type;
  state.current.group = filterState.group;
  state.current.role = filterState.role;
  state.current.ascension = filterState.ascension;
  state.current.signatureItem = filterState.signatureItem;
  state.current.furniture = filterState.furniture;
  state.current.engrave = filterState.engrave;
  state.current.equipment = filterState.equipment;
  state.current.crystal = filterState.crystal;
};

export const mutations = {
  RESET: (state: State) => {
    setWholeFilter(state, initialFilterState);
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
