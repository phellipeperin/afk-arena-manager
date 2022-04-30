import { FilterSort } from '~/store/filter';
import Hero from '~/application/domain/hero/hero';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

const getNumberByFaction = (faction: Faction): number => {
  if (faction === Faction.Lightbearer) { return 6; }
  if (faction === Faction.Mauler) { return 5; }
  if (faction === Faction.Wilder) { return 4; }
  if (faction === Faction.Graveborn) { return 3; }
  if (faction === Faction.Celestial) { return 2; }
  if (faction === Faction.Hypogean) { return 1; }
  if (faction === Faction.Dimensional) { return 0; }
  return 99;
};

const getNumberByAscension = (ascension: Ascension): number => {
  if (ascension === Ascension.None) { return 0; }
  if (ascension === Ascension.Elite) { return 1; }
  if (ascension === Ascension.ElitePlus) { return 2; }
  if (ascension === Ascension.Legendary) { return 3; }
  if (ascension === Ascension.LegendaryPlus) { return 4; }
  if (ascension === Ascension.Mythic) { return 5; }
  if (ascension === Ascension.MythicPlus) { return 6; }
  if (ascension === Ascension.Ascended) { return 7; }
  if (ascension === Ascension.Ascended1Star) { return 8; }
  if (ascension === Ascension.Ascended2Star) { return 9; }
  if (ascension === Ascension.Ascended3Star) { return 10; }
  if (ascension === Ascension.Ascended4Star) { return 11; }
  if (ascension === Ascension.Ascended5Star) { return 12; }
  return 99;
};

const getNumberByPower = (playerInfo: HeroPlayerInfo): number => {
  const ascension = getNumberByAscension(playerInfo.ascension) * 1000000;
  const si = playerInfo.signatureItem * 10000;
  const engrave = playerInfo.engrave * 100;
  const furniture = playerInfo.furniture * 10;
  const equip = playerInfo.equipment.filter((elem: HeroEquip) => elem.tier === 4).length;
  return ascension + si + furniture + engrave + equip;
};

const sortTwoHeroes = (aValue: any, bValue: any): number => {
  return aValue > bValue ? -1 : bValue > aValue ? 1 : 0;
};

const sortHeroList = (heroList: Array<Hero>, filterSort: FilterSort): Array<Hero> => {
  const sortedHeroList: Array<Hero> = [...heroList];

  if (filterSort === FilterSort.DEFAULT) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(getNumberByPower(a.playerInfo), getNumberByPower(b.playerInfo)));
  } else if (filterSort === FilterSort.FACTION) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(getNumberByFaction(a.gameInfo.faction), getNumberByFaction(b.gameInfo.faction)));
  } else if (filterSort === FilterSort.NAME) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.gameInfo.name, b.gameInfo.name) * -1);
  } else if (filterSort === FilterSort.ASCENSION_DESC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(getNumberByAscension(a.playerInfo.ascension), getNumberByAscension(b.playerInfo.ascension)));
  } else if (filterSort === FilterSort.ASCENSION_ASC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(getNumberByAscension(a.playerInfo.ascension), getNumberByAscension(b.playerInfo.ascension)) * -1);
  } else if (filterSort === FilterSort.SI_DESC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.signatureItem, b.playerInfo.signatureItem));
  } else if (filterSort === FilterSort.SI_ASC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.signatureItem, b.playerInfo.signatureItem) * -1);
  } else if (filterSort === FilterSort.FURNITURE_DESC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.furniture, b.playerInfo.furniture));
  } else if (filterSort === FilterSort.FURNITURE_ASC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.furniture, b.playerInfo.furniture) * -1);
  } else if (filterSort === FilterSort.ENGRAVE_DESC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.engrave, b.playerInfo.engrave));
  } else if (filterSort === FilterSort.ENGRAVE_ASC) {
    sortedHeroList.sort((a, b) => sortTwoHeroes(a.playerInfo.engrave, b.playerInfo.engrave) * -1);
  } else if (filterSort === FilterSort.EQUIPMENT_DESC) {
    sortedHeroList.sort((a, b) => {
      const aNumber = a.playerInfo.equipment.filter(elem => elem.tier === 4).length;
      const bNumber = b.playerInfo.equipment.filter(elem => elem.tier === 4).length;
      return sortTwoHeroes(aNumber, bNumber);
    });
  } else if (filterSort === FilterSort.EQUIPMENT_ASC) {
    sortedHeroList.sort((a, b) => {
      const aNumber = a.playerInfo.equipment.filter(elem => elem.tier === 4).length;
      const bNumber = b.playerInfo.equipment.filter(elem => elem.tier === 4).length;
      return sortTwoHeroes(aNumber, bNumber) * -1;
    });
  }

  return sortedHeroList;
};

export {
  sortHeroList,
};
