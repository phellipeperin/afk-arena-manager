import { Filter, FilterCrystal, FilterGroupBy, FilterSort, FilterState } from '~/store/filter';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';

const getGameBaseFilters = (): Array<Filter> => {
  const filterAll: FilterState = {
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

  return [
    { id: 'GAME_ALL', name: 'All', state: filterAll },
  ];
};

export {
  getGameBaseFilters,
};
