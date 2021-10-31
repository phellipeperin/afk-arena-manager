import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import HeroFurniture, { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const poeCostPerFurniture = 5790;

const generateFurnitureChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  const count: Array<Array<Hero>> = [[], [], [], [], [], [], [], [], [], []];
  const maxed36Heroes: Array<Hero> = [];
  let acquiredUntil3 = 0;
  let acquiredUntil9 = 0;
  let acquiredAll = 0;

  heroList.forEach((hero: Hero) => {
    const numberOfUnlockedFurniture = (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 0) || []).length;
    count[numberOfUnlockedFurniture].push(hero);
    if ((hero.playerInfo.furniture.filter(furniture => furniture.plus === 3) || []).length === 9) {
      maxed36Heroes.push(hero);
    }

    acquiredUntil3 += numberOfUnlockedFurniture <= 3 ? numberOfUnlockedFurniture : 3;
    acquiredUntil9 += numberOfUnlockedFurniture;

    const plus0Acquired = (hero.playerInfo.furniture.filter(furniture => furniture.plus === 0) || []).length;
    const plus1Acquired = (hero.playerInfo.furniture.filter(furniture => furniture.plus === 1) || []).length;
    const plus2Acquired = (hero.playerInfo.furniture.filter(furniture => furniture.plus === 2) || []).length;
    const plus3Acquired = (hero.playerInfo.furniture.filter(furniture => furniture.plus === 3) || []).length;
    acquiredAll += plus0Acquired + plus1Acquired * 2 + plus2Acquired * 3 + plus3Acquired * 4;
  });

  if (count[0].length) { heroesChartData.push(new StatisticChartItem(count[0].length, 'No Furniture', StatisticColor.NONE, count[0])); }
  if (count[1].length + count[2].length) { heroesChartData.push(new StatisticChartItem(count[1].length + count[2].length, '1-2/9 Furniture', StatisticColor.ELITE, [...count[1], ...count[2]])); }
  if (count[3].length) { heroesChartData.push(new StatisticChartItem(count[3].length, '3/9 Furniture', StatisticColor.LEGENDARY, count[3])); }
  if (count[4].length + count[5].length + count[6].length + count[7].length + count[8].length) { heroesChartData.push(new StatisticChartItem(count[4].length + count[5].length + count[6].length + count[7].length + count[8].length, '4-8/9 Furniture', StatisticColor.MYTHIC, [...count[4], ...count[5], ...count[6], ...count[7], ...count[8]])); }
  if (count[9].length) { heroesChartData.push(new StatisticChartItem(count[9].length, '9/9 Furniture', StatisticColor.ASCENDED, count[9])); }
  if (maxed36Heroes.length) { heroesChartData.push(new StatisticChartItem(maxed36Heroes.length, 'Maxed Furniture', StatisticColor.MAX, maxed36Heroes)); }

  progressChartData.push(new StatisticChartItem(+((100 * acquiredUntil3) / (heroList.length * 3)).toFixed(2), '3/9', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+((100 * acquiredUntil9) / (heroList.length * 9)).toFixed(2), '9/9 Furniture', StatisticColor.ASCENDED));
  progressChartData.push(new StatisticChartItem(+((100 * acquiredAll) / (heroList.length * 36)).toFixed(2), 'Max Furniture', StatisticColor.MAX));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (Acquired)', StatisticChartType.RADIAL, progressChartData));
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

  acquireInfo.totalNeeded = acquireInfo.largeFurnitureNeeded + acquireInfo.smallFurnitureNeeded + acquireInfo.hangingFurnitureNeeded;
  acquireInfo.estimatedPoeNeeded = acquireInfo.totalNeeded * poeCostPerFurniture;

  maxInfo.totalNeeded = maxInfo.largeFurnitureNeeded + maxInfo.smallFurnitureNeeded + maxInfo.hangingFurnitureNeeded;
  maxInfo.estimatedPoeNeeded = maxInfo.totalNeeded * poeCostPerFurniture;

  infoList.push(acquireInfo);
  infoList.push(maxInfo);
  return infoList;
};

export {
  generateFurnitureChartStatistics,
  generateFurnitureInfoStatistics,
};
