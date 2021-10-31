import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import HeroFurniture, { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateFurnitureChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  const count: Array<Array<Hero>> = [[], [], [], [], [], [], [], [], [], []];
  const needed = heroList.length * 9;
  let plus0Acquired = 0;
  let plus1Acquired = 0;
  let plus2Acquired = 0;
  let plus3Acquired = 0;

  heroList.forEach((hero: Hero) => {
    const numberOfUnlockedFurniture = (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 0) || []).length;
    count[numberOfUnlockedFurniture].push(hero);

    plus0Acquired += numberOfUnlockedFurniture;
    plus1Acquired += (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 1) || []).length;
    plus2Acquired += (hero.playerInfo.furniture.filter(furniture => furniture.plus >= 2) || []).length;
    plus3Acquired += (hero.playerInfo.furniture.filter(furniture => furniture.plus === 3) || []).length;
  });

  if (count[0].length) { heroesChartData.push(new StatisticChartItem(count[0].length, 'No Furniture', StatisticColor.NONE, count[0])); }
  if (count[1].length + count[2].length) { heroesChartData.push(new StatisticChartItem(count[1].length + count[2].length, '1-2/9 Furniture', StatisticColor.ELITE, [...count[1], ...count[2]])); }
  if (count[3].length) { heroesChartData.push(new StatisticChartItem(count[3].length, '3/9 Furniture', StatisticColor.LEGENDARY, count[3])); }
  if (count[4].length + count[5].length + count[6].length + count[7].length + count[8].length) { heroesChartData.push(new StatisticChartItem(count[4].length + count[5].length + count[6].length + count[7].length + count[8].length, '4-8/9 Furniture', StatisticColor.MYTHIC, [...count[4], ...count[5], ...count[6], ...count[7], ...count[8]])); }
  if (count[9].length) { heroesChartData.push(new StatisticChartItem(count[9].length, '9/9 Furniture', StatisticColor.ASCENDED, count[9])); }

  progressChartData.push(new StatisticChartItem(+(100 * plus0Acquired / needed).toFixed(2), 'Base Furniture', StatisticColor.ELITE));
  progressChartData.push(new StatisticChartItem(+(100 * plus1Acquired / needed).toFixed(2), '+1 Furniture', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+(100 * plus2Acquired / needed).toFixed(2), '+2 Furniture', StatisticColor.MYTHIC));
  progressChartData.push(new StatisticChartItem(+(100 * plus3Acquired / needed).toFixed(2), '+3 Furniture', StatisticColor.ASCENDED));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (acquired)', StatisticChartType.RADIAL, progressChartData));
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
