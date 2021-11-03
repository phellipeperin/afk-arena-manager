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
  if (nextLevel === 11 || nextLevel === 12) { return 10; }
  if (nextLevel === 13 || nextLevel === 14 || nextLevel === 15) { return 12; }
  if (nextLevel >= 16 && nextLevel <= 20) { return 18; }
  return 24;
};

const getTwistedEssenceCostToNextLevel = (nextLevel: number): number => {
  if (nextLevel === 1) { return 50; }
  if (nextLevel === 2) { return 60; }
  if (nextLevel === 3) { return 70; }
  if (nextLevel === 4) { return 80; }
  if (nextLevel === 5) { return 100; }
  if (nextLevel === 6) { return 120; }
  if (nextLevel === 7) { return 140; }
  if (nextLevel === 8) { return 160; }
  if (nextLevel === 9) { return 180; }
  if (nextLevel === 10) { return 200; }
  if (nextLevel === 11) { return 220; }
  if (nextLevel === 12) { return 240; }
  if (nextLevel === 13) { return 260; }
  if (nextLevel === 14) { return 280; }
  if (nextLevel === 15) { return 300; }
  if (nextLevel === 16) { return 330; }
  if (nextLevel === 17) { return 360; }
  if (nextLevel === 18) { return 390; }
  if (nextLevel === 19) { return 420; }
  if (nextLevel === 20) { return 450; }
  if (nextLevel === 21) { return 500; }
  if (nextLevel === 22) { return 550; }
  if (nextLevel === 23) { return 600; }
  if (nextLevel === 24) { return 650; }
  if (nextLevel === 25) { return 700; }
  if (nextLevel === 26) { return 750; }
  return 800;
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

const getAccumulatedTwistedEssenceCost = (level: number): number => {
  let cost = 0;
  for (let i = 0; i <= level; i++) {
    cost += getTwistedEssenceCostToNextLevel(i);
  }
  return cost;
};

const getMaxDroplets = (heroList: Array<Hero>): number => {
  return getDropletsPerAscension(Ascension.Ascended5Star) * heroList.length;
};

const getMaxElderTree = (heroList: Array<Hero>): ResourceElderTreeMain => {
  return getMainElderTree(getMaxDroplets(heroList));
};

const calculateCurrentDroplets = (heroList: Array<Hero>): number => {
  let totalDroplets = 0;
  heroList.filter((hero: Hero) => hero.gameInfo.faction !== Faction.Dimensional).forEach((hero: Hero) => {
    totalDroplets += getDropletsPerAscension(hero.playerInfo.ascension);
  });
  return totalDroplets;
};

const calculateCurrentElderTree = (heroList: Array<Hero>): ResourceElderTreeMain => {
  return getMainElderTree(calculateCurrentDroplets(heroList));
};

export {
  getAccumulatedTwistedEssenceCost,
  getMaxDroplets,
  getMaxElderTree,
  calculateCurrentDroplets,
  calculateCurrentElderTree,
};
