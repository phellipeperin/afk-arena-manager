import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import HeroFurniture, { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateFurnitureChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfUnlockedFurniture = (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 0) || []).length;
    count[numberOfUnlockedFurniture]++;
  });

  if (count[0]) { heroesChartData.push(new StatisticChartItem(count[0], 'No Furniture', StatisticColor.NONE)); }
  if (count[1] + count[2]) { heroesChartData.push(new StatisticChartItem(count[1] + count[2], '1-2 Furniture', StatisticColor.ELITE)); }
  if (count[3]) { heroesChartData.push(new StatisticChartItem(count[3], '3 Furniture', StatisticColor.LEGENDARY)); }
  if (count[4] + count[5] + count[6] + count[7] + count[8]) { heroesChartData.push(new StatisticChartItem(count[4] + count[5] + count[6] + count[7] + count[8], '4-8 Furniture', StatisticColor.MYTHIC)); }
  if (count[9]) { heroesChartData.push(new StatisticChartItem(count[9], 'All Furniture', StatisticColor.ASCENDED)); }

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  return chartList;
};

const generateFurnitureInfoStatistics = (heroList: Array<Hero>): Array<StatisticFurnitureInfo> => {
  const infoList: Array<StatisticFurnitureInfo> = [];
  const acquireInfo = new StatisticFurnitureInfo('ACQUIRE', 'Acquire');
  const maxInfo = new StatisticFurnitureInfo('MAX', 'Max');

  heroList.forEach((hero: Hero) => {
    hero.playerInfo.furniture.forEach((furniture: HeroFurniture) => {
      const increaseToAcquire = furniture.plus === -1 ? 1 : 0;
      const increaseToMax = 3 - furniture.plus;

      switch (furniture.type) {
        case HeroFurnitureType.Large: {
          acquireInfo.largeFurnitureNeeded += increaseToAcquire;
          maxInfo.largeFurnitureNeeded += increaseToMax;
          break;
        }
        case HeroFurnitureType.Small: {
          acquireInfo.smallFurnitureNeeded += increaseToAcquire;
          maxInfo.smallFurnitureNeeded += increaseToMax;
          break;
        }
        case HeroFurnitureType.Hanging: {
          acquireInfo.hangingFurnitureNeeded += increaseToAcquire;
          maxInfo.hangingFurnitureNeeded += increaseToMax;
          break;
        }
      }
    });
  });

  infoList.push(acquireInfo);
  infoList.push(maxInfo);
  return infoList;
};

export {
  generateFurnitureChartStatistics,
  generateFurnitureInfoStatistics,
};
