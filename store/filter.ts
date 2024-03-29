import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Division } from '~/application/domain/info/division';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import { getGameBaseFilters } from '~/application/services/filterService';

export enum FilterCrystal {
  BOTH = 'BOTH',
  ON_CRYSTAL = 'ON_CRYSTAL',
  NOT_ON_CRYSTAL = 'NOT_ON_CRYSTAL',
}

export enum FilterEquipmentState {
  BOTH = 'BOTH',
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
}

export enum FilterEquipmentStars {
  BOTH = 'BOTH',
  FULL = 'FULL',
  NOT_FULL = 'NOT_FULL',
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
  textSearch: string;
  sort: FilterSort;
  groupBy: FilterGroupBy;
  faction: Array<Faction>;
  type: Array<Type>;
  division: Array<Division>;
  role: Array<Role>;
  ascension: Array<Ascension>;
  crystal: FilterCrystal;
  equipmentState: FilterEquipmentState;
  equipmentStars: FilterEquipmentStars;
  signatureItemMin: number;
  signatureItemMax: number;
  furnitureMin: number;
  furnitureMax: number;
  engraveMin: number;
  engraveMax: number;
  equipmentTier: number;
  equipmentMin: number;
  equipmentMax: number;
}

export interface Filter {
  id?: string;
  name?: string;
  state: FilterState;
}

interface State {
  current: FilterState;
  currentEditing: Filter;
  gameList: Array<Filter>;
  userList: Array<Filter>;
}

const gameFilters = getGameBaseFilters();
export const state = (): State => ({
  current: JSON.parse(JSON.stringify(gameFilters[0].state)),
  currentEditing: { state: JSON.parse(JSON.stringify(gameFilters[0].state)) },
  gameList: gameFilters,
  userList: [],
});

export const mutations = {
  RESET: (state: State) => {
    state.current = JSON.parse(JSON.stringify(gameFilters[0].state));
  },
  // Edit
  SET_EDITING: (state: State, filter: Filter) => {
    state.currentEditing = JSON.parse(JSON.stringify(filter));
  },
  SET_EDITING_NAME: (state: State, name: string) => {
    state.currentEditing.name = name;
  },
  UPDATE_USER_FILTER: (state: State, filter: Filter) => {
    const index = state.userList.findIndex(elem => elem.id === filter.id);
    const newList = [...state.userList];
    if (index === -1) {
      newList.push(filter);
    } else {
      newList.splice(index, 1, filter);
    }
    state.userList = newList;
  },
  DELETE_USER_FILTER: (state: State, id: string) => {
    state.userList = state.userList.filter(elem => elem.id !== id);
  },
  // Current
  SET_WHOLE_FILTER: (state: State, filterState: FilterState) => {
    state.current = JSON.parse(JSON.stringify(filterState));
  },
  SET_TEXT_SEARCH: (state: State, textSearch: string) => {
    state.current.textSearch = textSearch;
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
  SET_DIVISION: (state: State, division: Array<Division>) => {
    state.current.division = division;
  },
  SET_ROLE: (state: State, role: Array<Role>) => {
    state.current.role = role;
  },
  SET_ASCENSION: (state: State, ascension: Array<Ascension>) => {
    state.current.ascension = ascension;
  },
  SET_CRYSTAL: (state: State, crystal: FilterCrystal) => {
    state.current.crystal = crystal;
  },
  SET_EQUIPMENT_STATE: (state: State, equipmentState: FilterEquipmentState) => {
    state.current.equipmentState = equipmentState;
  },
  SET_EQUIPMENT_STARS: (state: State, equipmentStars: FilterEquipmentStars) => {
    state.current.equipmentStars = equipmentStars;
  },
  SET_SIGNATURE_ITEM_MIN: (state: State, newValue: number) => {
    state.current.signatureItemMin = newValue;
    if (state.current.signatureItemMax < state.current.signatureItemMin) {
      state.current.signatureItemMax = state.current.signatureItemMin;
    }
  },
  SET_SIGNATURE_ITEM_MAX: (state: State, newValue: number) => {
    state.current.signatureItemMax = newValue;
    if (state.current.signatureItemMin > state.current.signatureItemMax) {
      state.current.signatureItemMin = state.current.signatureItemMax;
    }
  },
  SET_FURNITURE_MIN: (state: State, newValue: number) => {
    state.current.furnitureMin = newValue;
    if (state.current.furnitureMax < state.current.furnitureMin) {
      state.current.furnitureMax = state.current.furnitureMin;
    }
  },
  SET_FURNITURE_MAX: (state: State, newValue: number) => {
    state.current.furnitureMax = newValue;
    if (state.current.furnitureMin > state.current.furnitureMax) {
      state.current.furnitureMin = state.current.furnitureMax;
    }
  },
  SET_ENGRAVE_MIN: (state: State, newValue: number) => {
    state.current.engraveMin = newValue;
    if (state.current.engraveMax < state.current.engraveMin) {
      state.current.engraveMax = state.current.engraveMin;
    }
  },
  SET_ENGRAVE_MAX: (state: State, newValue: number) => {
    state.current.engraveMax = newValue;
    if (state.current.engraveMin > state.current.engraveMax) {
      state.current.engraveMin = state.current.engraveMax;
    }
  },
  SET_EQUIPMENT_TIER: (state: State, newValue: number) => {
    state.current.equipmentTier = newValue;
  },
  SET_EQUIPMENT_MIN: (state: State, newValue: number) => {
    state.current.equipmentMin = newValue;
    if (state.current.equipmentMax < state.current.equipmentMin) {
      state.current.equipmentMax = state.current.equipmentMin;
    }
  },
  SET_EQUIPMENT_MAX: (state: State, newValue: number) => {
    state.current.equipmentMax = newValue;
    if (state.current.equipmentMin > state.current.equipmentMax) {
      state.current.equipmentMin = state.current.equipmentMax;
    }
  },
  // Start
  SET_USER_FILTERS: (state: State, userList: Array<Filter>) => {
    state.userList = userList;
  },
};
