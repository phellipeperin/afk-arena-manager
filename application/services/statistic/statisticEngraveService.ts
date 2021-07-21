import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';

const generateEngraveChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

  return statistics;
};

const generateEngraveInfoStatistics = (heroList: Array<Hero>): StatisticEngraveInfo => {
  const info = new StatisticEngraveInfo();

  return info;
};

export {
  generateEngraveChartStatistics,
  generateEngraveInfoStatistics,
};
