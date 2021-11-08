import Hero from '~/application/domain/hero/hero';
import Ladder from '~/application/domain/ladder/ladder';
import { Faction } from '~/application/domain/info/faction';
import { Group } from '~/application/domain/info/group';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';
import { Ascension } from '~/application/domain/info/ascension';
import UserHeroList from '~/application/domain/user/userHeroList';
import LadderFactionItem from '~/application/domain/ladder/ladderFactionItem';
import LadderGroupItem from '~/application/domain/ladder/ladderGroupItem';
import LadderTypeItem from '~/application/domain/ladder/ladderTypeItem';
import LadderRoleItem from '~/application/domain/ladder/ladderRoleItem';

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

const generateRoleLadder = (heroList: Array<Hero>): Array<LadderRoleItem> => {
  const result: Array<LadderRoleItem> = [];
  const items: Array<Role> = [Role.AoE, Role.Assassin, Role.Buffer, Role.BurstDamage, Role.ContinuousDamage, Role.Control, Role.Debuffer, Role.Regeneration, Role.Tank];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.role === item);
    result.push(new LadderRoleItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateTypeLadder = (heroList: Array<Hero>): Array<LadderTypeItem> => {
  const result: Array<LadderTypeItem> = [];
  const items: Array<Type> = [Type.STR, Type.INT, Type.DEX];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.type === item);
    result.push(new LadderTypeItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateGroupLadder = (heroList: Array<Hero>): Array<LadderGroupItem> => {
  const result: Array<LadderGroupItem> = [];
  const items: Array<Group> = [Group.Support, Group.Mage, Group.Warrior, Group.Tank, Group.Ranger];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.group === item);
    result.push(new LadderGroupItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateFactionLadder = (heroList: Array<Hero>): Array<LadderFactionItem> => {
  const result: Array<LadderFactionItem> = [];
  const items: Array<Faction> = [Faction.Lightbearer, Faction.Mauler, Faction.Wilder, Faction.Graveborn, Faction.Celestial, Faction.Hypogean, Faction.Dimensional];

  items.forEach((item) => {
    const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.faction === item);
    result.push(new LadderFactionItem(item, calculateLadderPoints(filteredHeroList)));
  });

  return result;
};

const generateLadder = (userHeroList: Array<UserHeroList>): Ladder => {
  return new Ladder(
    generateFactionLadder(heroList),
    generateGroupLadder(heroList),
    generateTypeLadder(heroList),
    generateRoleLadder(heroList),
  );
};

export {
  generateLadder,
};
