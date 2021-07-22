import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';

const generateEngraveChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

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
