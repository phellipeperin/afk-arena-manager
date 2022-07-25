import {
  Filter,
  FilterCrystal,
  FilterEquipmentState,
  FilterEquipmentStars,
  FilterGroupBy,
  FilterSort,
  FilterState,
} from '~/store/filter';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';

const getGameBaseFilters = (): Array<Filter> => {
  const allFilter: FilterState = {
    textSearch: '',
    sort: FilterSort.DEFAULT,
    groupBy: FilterGroupBy.NONE,
    faction: [],
    type: [],
    group: [],
    role: [],
    ascension: [],
    crystal: FilterCrystal.BOTH,
    equipmentState: FilterEquipmentState.BOTH,
    equipmentStars: FilterEquipmentStars.BOTH,
    signatureItemMin: -1,
    signatureItemMax: 40,
    furnitureMin: 0,
    furnitureMax: 36,
    engraveMin: 0,
    engraveMax: 100,
    equipmentMin: 0,
    equipmentMax: 4,
  };

  const normalHeroesFilter: FilterState = {
    ...allFilter,
    faction: [Faction.Lightbearer, Faction.Mauler, Faction.Wilder, Faction.Graveborn],
  };

  const celepogeanFilter: FilterState = {
    ...allFilter,
    faction: [Faction.Celestial, Faction.Hypogean],
  };

  const mythicHigherFilter: FilterState = {
    ...allFilter,
    ascension: [Ascension.Mythic, Ascension.MythicPlus, Ascension.Ascended, Ascension.Ascended1Star, Ascension.Ascended2Star, Ascension.Ascended3Star, Ascension.Ascended4Star, Ascension.Ascended5Star],
  };

  const ascendedHigherFilter: FilterState = {
    ...allFilter,
    ascension: [Ascension.Ascended, Ascension.Ascended1Star, Ascension.Ascended2Star, Ascension.Ascended3Star, Ascension.Ascended4Star, Ascension.Ascended5Star],
  };

  return [
    { id: 'GAME_ALL', name: 'All', state: allFilter },
    { id: 'GAME_NORMAL_FACTION', name: 'Normal Factions', state: normalHeroesFilter },
    { id: 'GAME_CELEPOGEAN', name: 'Celepogean', state: celepogeanFilter },
    { id: 'GAME_MYTHIC_HIGHER', name: 'Mythic and Higher', state: mythicHigherFilter },
    { id: 'GAME_ASCENDED_HIGHER', name: 'Ascended and Higher', state: ascendedHigherFilter },
  ];
};

export {
  getGameBaseFilters,
};
