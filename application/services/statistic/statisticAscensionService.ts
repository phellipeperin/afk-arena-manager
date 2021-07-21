import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import StatisticItem from '~/application/domain/statistic/statisticItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

const generateAscensionStatistics = (heroList: Array<Hero>): Array<StatisticItem> => {
  const statistics: Array<StatisticItem> = [];

  const notAcquiredHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.None);
  const eliteHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Elite || hero.playerInfo.ascension === Ascension.ElitePlus);
  const legendaryHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Legendary || hero.playerInfo.ascension === Ascension.LegendaryPlus);
  const mythicHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Mythic || hero.playerInfo.ascension === Ascension.MythicPlus);
  const ascendedHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended || hero.playerInfo.ascension === Ascension.Ascended1Star || hero.playerInfo.ascension === Ascension.Ascended2Star || hero.playerInfo.ascension === Ascension.Ascended3Star || hero.playerInfo.ascension === Ascension.Ascended4Star);
  const ascendedMaxHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended5Star);

  statistics.push(new StatisticItem(notAcquiredHeroes.length, 'Not Acquired', StatisticColor.NONE));
  statistics.push(new StatisticItem(eliteHeroes.length, 'Elite', StatisticColor.ELITE));
  statistics.push(new StatisticItem(legendaryHeroes.length, 'Legendary', StatisticColor.LEGENDARY));
  statistics.push(new StatisticItem(mythicHeroes.length, 'Mythic', StatisticColor.MYTHIC));
  statistics.push(new StatisticItem(ascendedHeroes.length, 'Ascended', StatisticColor.ASCENDED));
  statistics.push(new StatisticItem(ascendedMaxHeroes.length, 'Ascended Max', StatisticColor.MAX));

  return statistics;
};

export {
  generateAscensionStatistics,
};
