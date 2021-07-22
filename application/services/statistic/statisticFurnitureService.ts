import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';

const generateFurnitureChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];
  const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfUnlockedFurniture = (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 0) || []).length;
    count[numberOfUnlockedFurniture]++;
  });

  if (count[0]) { statistics.push(new StatisticChartItem(count[0], 'No Furniture', StatisticColor.NONE)); }
  if (count[1] + count[2]) { statistics.push(new StatisticChartItem(count[1] + count[2], '1-2 Furniture', StatisticColor.ELITE)); }
  if (count[3]) { statistics.push(new StatisticChartItem(count[3], '3 Furniture', StatisticColor.LEGENDARY)); }
  if (count[4] + count[5] + count[6] + count[7] + count[8]) { statistics.push(new StatisticChartItem(count[4] + count[5] + count[6] + count[7] + count[8], '4-8 Furniture', StatisticColor.MYTHIC)); }
  if (count[9]) { statistics.push(new StatisticChartItem(count[9], 'All Furniture', StatisticColor.ASCENDED)); }

  return statistics;
};

const generateFurnitureInfoStatistics = (heroList: Array<Hero>): Array<StatisticFurnitureInfo> => {
  const infoList: Array<StatisticFurnitureInfo> = [];

  const acquireInfo = new StatisticFurnitureInfo('ACQUIRE', 'Acquire');
  infoList.push(acquireInfo);

  const maxInfo = new StatisticFurnitureInfo('MAX', 'Max');
  infoList.push(maxInfo);

  return infoList;
};

export {
  generateFurnitureChartStatistics,
  generateFurnitureInfoStatistics,
};
