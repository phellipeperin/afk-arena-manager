import Hero from '~/application/domain/hero/hero';
import { ResourceElderTreeMain } from '~/application/domain/resources/resourceElderTree';
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

const getDropletsPerAscension = (ascension: Ascension): number => {
  switch (ascension) {
    case Ascension.Elite: { return 1; }
    case Ascension.ElitePlus: { return 2; }
    case Ascension.Legendary: { return 6; }
    case Ascension.LegendaryPlus: { return 8; }
    case Ascension.Mythic: { return 16; }
    case Ascension.MythicPlus: { return 24; }
    case Ascension.Ascended: { return 28; }
    case Ascension.Ascended1Star: { return 30; }
    case Ascension.Ascended2Star: { return 32; }
    case Ascension.Ascended3Star: { return 34; }
    case Ascension.Ascended4Star: { return 36; }
    case Ascension.Ascended5Star: { return 38; }
  }
  return 0;
};

const getMainTreeDropletsCostToNextLevel = (nextLevel: number): number => {
  if (nextLevel === 1 || nextLevel === 2) { return 1; }
  if (nextLevel === 3 || nextLevel === 4) { return 2; }
  if (nextLevel === 5 || nextLevel === 6) { return 4; }
  if (nextLevel === 7 || nextLevel === 8) { return 6; }
  if (nextLevel === 9 || nextLevel === 10) { return 8; }
  if (nextLevel === 11 || nextLevel === 12 || nextLevel === 13) { return 10; }
  if (nextLevel === 14 || nextLevel === 15) { return 12; }
  if (nextLevel >= 16 && nextLevel <= 20) { return 18; }
  return 24;
};

const getMainElderTree = (totalDroplets: number): ResourceElderTreeMain => {
  let level = 0;
  let droplets = totalDroplets;

  for (let i = 1; i < 999; i++) {
    const costToNextLevel = getMainTreeDropletsCostToNextLevel(i);
    const remainingDroplets = droplets - costToNextLevel;
    if (remainingDroplets < 0) {
      level = i - 1;
      break;
    } else if (remainingDroplets === 0) {
      level = i;
      droplets = 0;
      break;
    } else {
      droplets = remainingDroplets;
    }
  }

  return { level, droplets };
};

const getMaxDroplets = (heroList: Array<Hero>): number => {
  return getDropletsPerAscension(Ascension.Ascended5Star) * heroList.length;
};

const getMaxElderTree = (heroList: Array<Hero>): ResourceElderTreeMain => {
  return getMainElderTree(getMaxDroplets(heroList));
};

const calculateCurrentElderTree = (heroList: Array<Hero>): ResourceElderTreeMain => {
  let totalDroplets = 0;
  heroList.filter((hero: Hero) => hero.gameInfo.faction !== Faction.Dimensional).forEach((hero: Hero) => {
    totalDroplets += getDropletsPerAscension(hero.playerInfo.ascension);
  });

  return getMainElderTree(totalDroplets);
};

export {
  getMaxDroplets,
  getMaxElderTree,
  calculateCurrentElderTree,
};
