import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

const generateEngraveChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.engrave === -1);
  const low = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 0 && hero.playerInfo.engrave <= 29);
  const medium = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 30 && hero.playerInfo.engrave <= 59);
  const high = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 60 && hero.playerInfo.signatureItem <= 79);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 80 && hero.playerInfo.signatureItem <= 99);
  const fullMax = heroList.filter((hero: Hero) => hero.playerInfo.engrave === 100);

  if (notUnlocked.length) { statistics.push(new StatisticChartItem(notUnlocked.length, 'Not Unlocked', StatisticColor.NONE)); }
  if (low.length) { statistics.push(new StatisticChartItem(low.length, '0 - 29', StatisticColor.ELITE)); }
  if (medium.length) { statistics.push(new StatisticChartItem(medium.length, '30 - 59', StatisticColor.LEGENDARY)); }
  if (high.length) { statistics.push(new StatisticChartItem(high.length, '60 - 79', StatisticColor.MYTHIC)); }
  if (max.length) { statistics.push(new StatisticChartItem(max.length, '80 - 99', StatisticColor.ASCENDED)); }
  if (fullMax.length) { statistics.push(new StatisticChartItem(fullMax.length, '100', StatisticColor.MAX)); }

  return statistics;
};

const generateEngraveInfoStatistics = (heroList: Array<Hero>): Array<StatisticEngraveInfo> => {
  const infoList: Array<StatisticEngraveInfo> = [];

  const plus60Info = new StatisticEngraveInfo('PLUS_60', '+60');
  infoList.push(plus60Info);

  const plus80Info = new StatisticEngraveInfo('PLUS_80', '+80');
  infoList.push(plus80Info);

  const maxInfo = new StatisticEngraveInfo('MAX', 'Max');
  infoList.push(maxInfo);

  return infoList;
};

export {
  generateEngraveChartStatistics,
  generateEngraveInfoStatistics,
};
