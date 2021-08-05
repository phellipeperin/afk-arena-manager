import Hero from '~/application/domain/hero/hero';
import Ladder from '~/application/domain/ladder/ladder';
import { Faction } from '~/application/domain/info/faction';
import { Group } from '~/application/domain/info/group';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import LadderItem from '~/application/domain/ladder/ladderItem';

const calculateHeroLadderPoints = (hero: Hero): number => {
  const { ascension } = hero.playerInfo;
  switch (ascension) {
    case Ascension.Elite: { return 50; }
    case Ascension.ElitePlus: { return 150; }
    case Ascension.Legendary: { return 500; }
    case Ascension.LegendaryPlus: { return 650; }
    case Ascension.Mythic: { return 1300; }
    case Ascension.MythicPlus: { return 2000; }
    case Ascension.Ascended: { return 2500; }
    case Ascension.Ascended1Star: { return 2800; }
    case Ascension.Ascended2Star: { return 3100; }
    case Ascension.Ascended3Star: { return 3400; }
    case Ascension.Ascended4Star: { return 3700; }
    case Ascension.Ascended5Star: { return 4000; }
  }
  return 0;
};

const calculateLadderPoints = (heroList: Array<Hero>): number => {
  return heroList.reduce((total: number, hero: Hero) => total + calculateHeroLadderPoints(hero), 0);
};

const generateRoleLadder = (heroList: Array<Hero>): Array<LadderItem> => {
  const result: Array<LadderItem> = [];
  const items: Array<Role> = [Role.AoE, Role.Assassin, Role.Buffer, Role.BurstDamage, Role.ContinuousDamage, Role.Control, Role.Debuffer, Role.Regeneration, Role.Tank];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.role === item);
    result.push(new LadderItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateTypeLadder = (heroList: Array<Hero>): Array<LadderItem> => {
  const result: Array<LadderItem> = [];
  const items: Array<Type> = [Type.STR, Type.INT, Type.DEX];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.type === item);
    result.push(new LadderItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateGroupLadder = (heroList: Array<Hero>): Array<LadderItem> => {
  const result: Array<LadderItem> = [];
  const items: Array<Group> = [Group.Support, Group.Mage, Group.Warrior, Group.Tank, Group.Ranger];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.group === item);
    result.push(new LadderItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateFactionLadder = (heroList: Array<Hero>): Array<LadderItem> => {
  const result: Array<LadderItem> = [];
  const items: Array<Faction> = [Faction.Lightbearer, Faction.Mauler, Faction.Wilder, Faction.Graveborn, Faction.Celestial, Faction.Hypogean, Faction.Dimensional];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.faction === item);
    result.push(new LadderItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateLadder = (heroList: Array<Hero>): Ladder => {
  return new Ladder(
    calculateLadderPoints(heroList),
    generateFactionLadder(heroList),
    generateGroupLadder(heroList),
    generateTypeLadder(heroList),
    generateRoleLadder(heroList),
  );
};

export {
  generateLadder,
};
