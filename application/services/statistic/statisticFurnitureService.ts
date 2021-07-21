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

  statistics.push(new StatisticChartItem(count[0], 'No Furniture', StatisticColor.NONE));
  statistics.push(new StatisticChartItem(count[1] + count[2], '1-2 Furniture', StatisticColor.ELITE));
  statistics.push(new StatisticChartItem(count[3], '3 Furniture', StatisticColor.LEGENDARY));
  statistics.push(new StatisticChartItem(count[4] + count[5] + count[6] + count[7] + count[8], '4-8 Furniture', StatisticColor.MYTHIC));
  statistics.push(new StatisticChartItem(count[9], 'All Furniture', StatisticColor.ASCENDED));

  return statistics;
};

const generateFurnitureInfoStatistics = (heroList: Array<Hero>): Array<StatisticFurnitureInfo> => {
  const infoList: Array<StatisticFurnitureInfo> = [];

  return infoList;
};

export {
  generateFurnitureChartStatistics,
  generateFurnitureInfoStatistics,
};
