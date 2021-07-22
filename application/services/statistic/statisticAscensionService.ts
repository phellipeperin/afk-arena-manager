import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';

const generateAscensionChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

  const notAcquiredHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.None);
  const eliteHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Elite || hero.playerInfo.ascension === Ascension.ElitePlus);
  const legendaryHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Legendary || hero.playerInfo.ascension === Ascension.LegendaryPlus);
  const mythicHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Mythic || hero.playerInfo.ascension === Ascension.MythicPlus);
  const ascendedHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended || hero.playerInfo.ascension === Ascension.Ascended1Star || hero.playerInfo.ascension === Ascension.Ascended2Star || hero.playerInfo.ascension === Ascension.Ascended3Star || hero.playerInfo.ascension === Ascension.Ascended4Star);
  const ascendedMaxHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended5Star);

  statistics.push(new StatisticChartItem(notAcquiredHeroes.length, 'Not Acquired', StatisticColor.NONE));
  statistics.push(new StatisticChartItem(eliteHeroes.length, 'Elite', StatisticColor.ELITE));
  statistics.push(new StatisticChartItem(legendaryHeroes.length, 'Legendary', StatisticColor.LEGENDARY));
  statistics.push(new StatisticChartItem(mythicHeroes.length, 'Mythic', StatisticColor.MYTHIC));
  statistics.push(new StatisticChartItem(ascendedHeroes.length, 'Ascended', StatisticColor.ASCENDED));
  statistics.push(new StatisticChartItem(ascendedMaxHeroes.length, 'Ascended Max', StatisticColor.MAX));

  return statistics;
};

const generateAscensionInfoStatistics = (heroList: Array<Hero>): Array<StatisticAscensionInfo> => {
  const infoList: Array<StatisticAscensionInfo> = [];

  const ascendedInfo = new StatisticAscensionInfo('ASCENDED', 'Ascended');
  infoList.push(ascendedInfo);

  const ascendedMaxInfo = new StatisticAscensionInfo('ASCENDED_MAX', 'Ascended Max');
  infoList.push(ascendedMaxInfo);

  return infoList;
};

export {
  generateAscensionChartStatistics,
  generateAscensionInfoStatistics,
};
