import { generateAscensionChartStatistics } from './statisticAscensionService';
import { generateSignatureItemChartStatistics } from './statisticSignatureItemService';
import { generateFurnitureChartStatistics } from './statisticFurnitureService';
import { generateEquipmentChartStatistics } from './statisticEquipmentService';
import { generateEngraveChartStatistics } from './statisticEngraveService';

import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';

const generateStatistics = (heroList: Array<Hero>): Statistic => {
  return new Statistic(
    generateAscensionChartStatistics(heroList),
    generateSignatureItemChartStatistics(heroList),
    generateFurnitureChartStatistics(heroList),
    generateEquipmentChartStatistics(heroList),
    generateEngraveChartStatistics(heroList),
  );
};

export {
  generateStatistics,
};
