import Hero from '~/application/domain/hero/hero';
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
import LadderItemPosition from '~/application/domain/ladder/ladderItemPosition';

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

const generateRoleLadder = (userHeroList: Array<UserHeroList>): Array<LadderRoleItem> => {
  const result: Array<LadderRoleItem> = [];
  const items: Array<Role> = [Role.AoE, Role.Assassin, Role.Buffer, Role.BurstDamage, Role.ContinuousDamage, Role.Control, Role.Debuffer, Role.Regeneration, Role.Tank];

  items.forEach((item) => {
    const ladderItem = new LadderRoleItem(item);
    userHeroList.forEach((userHero: UserHeroList) => {
      const filteredHeroList = userHero.heroList.filter((hero: Hero) => hero.gameInfo.role === item);
      const points = calculateLadderPoints(filteredHeroList);
      const index = ladderItem.positions.findIndex((pos: LadderItemPosition) => pos.amount === points);
      if (index !== -1) {
        ladderItem.positions[index].users.push(userHero.user);
      } else {
        ladderItem.positions.push(new LadderItemPosition(points, [userHero.user]));
      }

      if (!ladderItem.totalPossible) {
        ladderItem.totalPossible = 4000 * filteredHeroList.length;
      }
    });
    result.push(ladderItem);
  });

  return result;
};

const generateTypeLadder = (userHeroList: Array<UserHeroList>): Array<LadderTypeItem> => {
  const result: Array<LadderTypeItem> = [];
  const items: Array<Type> = [Type.STR, Type.INT, Type.DEX];

  items.forEach((item) => {
    const ladderItem = new LadderTypeItem(item);
    userHeroList.forEach((userHero: UserHeroList) => {
      const filteredHeroList = userHero.heroList.filter((hero: Hero) => hero.gameInfo.type === item);
      const points = calculateLadderPoints(filteredHeroList);
      const index = ladderItem.positions.findIndex((pos: LadderItemPosition) => pos.amount === points);
      if (index !== -1) {
        ladderItem.positions[index].users.push(userHero.user);
      } else {
        ladderItem.positions.push(new LadderItemPosition(points, [userHero.user]));
      }

      if (!ladderItem.totalPossible) {
        ladderItem.totalPossible = 4000 * filteredHeroList.length;
      }
    });
    result.push(ladderItem);
  });

  return result;
};

const generateGroupLadder = (userHeroList: Array<UserHeroList>): Array<LadderGroupItem> => {
  const result: Array<LadderGroupItem> = [];
  const items: Array<Group> = [Group.Support, Group.Mage, Group.Warrior, Group.Tank, Group.Ranger];

  items.forEach((item) => {
    const ladderItem = new LadderGroupItem(item);
    userHeroList.forEach((userHero: UserHeroList) => {
      const filteredHeroList = userHero.heroList.filter((hero: Hero) => hero.gameInfo.group === item);
      const points = calculateLadderPoints(filteredHeroList);
      const index = ladderItem.positions.findIndex((pos: LadderItemPosition) => pos.amount === points);
      if (index !== -1) {
        ladderItem.positions[index].users.push(userHero.user);
      } else {
        ladderItem.positions.push(new LadderItemPosition(points, [userHero.user]));
      }

      if (!ladderItem.totalPossible) {
        ladderItem.totalPossible = 4000 * filteredHeroList.length;
      }
    });
    result.push(ladderItem);
  });

  return result;
};

const generateFactionLadder = (userHeroList: Array<UserHeroList>): Array<LadderFactionItem> => {
  const result: Array<LadderFactionItem> = [];
  const items: Array<Faction> = [Faction.Lightbearer, Faction.Mauler, Faction.Wilder, Faction.Graveborn, Faction.Celestial, Faction.Hypogean, Faction.Dimensional];

  items.forEach((item) => {
    const ladderItem = new LadderFactionItem(item);
    userHeroList.forEach((userHero: UserHeroList) => {
      const filteredHeroList = userHero.heroList.filter((hero: Hero) => hero.gameInfo.faction === item);
      const points = calculateLadderPoints(filteredHeroList);
      const index = ladderItem.positions.findIndex((pos: LadderItemPosition) => pos.amount === points);
      if (index !== -1) {
        ladderItem.positions[index].users.push(userHero.user);
      } else {
        ladderItem.positions.push(new LadderItemPosition(points, [userHero.user]));
      }

      if (!ladderItem.totalPossible) {
        ladderItem.totalPossible = 4000 * filteredHeroList.length;
      }
    });
    result.push(ladderItem);
  });

  return result;
};

export {
  generateFactionLadder,
  generateGroupLadder,
  generateTypeLadder,
  generateRoleLadder,
};
