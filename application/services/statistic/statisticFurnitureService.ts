import Hero from '~/application/domain/hero/hero';
import StatisticItem from '~/application/domain/statistic/statisticItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

const generateFurnitureStatistics = (heroList: Array<Hero>): Array<StatisticItem> => {
  const statistics: Array<StatisticItem> = [];
  const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfUnlockedFurniture = (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 0) || []).length;
    count[numberOfUnlockedFurniture]++;
  });

  statistics.push(new StatisticItem(count[0], 'No Furniture', StatisticColor.NONE));
  statistics.push(new StatisticItem(count[1] + count[2], '1-2 Furniture', StatisticColor.ELITE));
  statistics.push(new StatisticItem(count[3], '3 Furniture', StatisticColor.LEGENDARY));
  statistics.push(new StatisticItem(count[4] + count[5] + count[6] + count[7] + count[8], '4-8 Furniture', StatisticColor.MYTHIC));
  statistics.push(new StatisticItem(count[9], 'All Furniture', StatisticColor.ASCENDED));

  return statistics;
};

export {
  generateFurnitureStatistics,
};
