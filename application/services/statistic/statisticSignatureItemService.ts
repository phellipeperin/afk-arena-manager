import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';

const generateSignatureItemChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem === -1);
  const elite = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 0 && hero.playerInfo.signatureItem <= 9);
  const legendary = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 10 && hero.playerInfo.signatureItem <= 19);
  const mythic = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 20 && hero.playerInfo.signatureItem <= 29);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 30 && hero.playerInfo.signatureItem <= 40);

  statistics.push(new StatisticChartItem(notUnlocked.length, 'Not Unlocked', StatisticColor.NONE));
  statistics.push(new StatisticChartItem(elite.length, '+0 - +9', StatisticColor.ELITE));
  statistics.push(new StatisticChartItem(legendary.length, '+10 - +19', StatisticColor.LEGENDARY));
  statistics.push(new StatisticChartItem(mythic.length, '+20 - +29', StatisticColor.MYTHIC));
  statistics.push(new StatisticChartItem(max.length, '+30 - +40', StatisticColor.ASCENDED));

  return statistics;
};

const generateSignatureItemInfoStatistics = (heroList: Array<Hero>): Array<StatisticSignatureItemInfo> => {
  const infoList: Array<StatisticSignatureItemInfo> = [];

  const plus30Info = new StatisticSignatureItemInfo('PLUS_30', '+30');
  infoList.push(plus30Info);

  const plus40Info = new StatisticSignatureItemInfo('PLUS_40', '+40');
  infoList.push(plus40Info);

  return infoList;
};

export {
  generateSignatureItemChartStatistics,
  generateSignatureItemInfoStatistics,
};
