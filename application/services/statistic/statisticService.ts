import { generateAscensionChartStatistics, generateAscensionInfoStatistics } from './statisticAscensionService';
import { generateSignatureItemChartStatistics, generateSignatureItemInfoStatistics } from './statisticSignatureItemService';
import { generateFurnitureChartStatistics, generateFurnitureInfoStatistics } from './statisticFurnitureService';
import { generateEquipmentChartStatistics, generateEquipmentInfoStatistics } from './statisticEquipmentService';
import { generateEngraveChartStatistics, generateEngraveInfoStatistics } from './statisticEngraveService';

import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';

const generateStatistics = (heroList: Array<Hero>): Statistic => {
  return new Statistic(
    generateAscensionChartStatistics(heroList),
    generateSignatureItemChartStatistics(heroList),
    generateFurnitureChartStatistics(heroList),
    generateEquipmentChartStatistics(heroList),
    generateEngraveChartStatistics(heroList),
    generateAscensionInfoStatistics(heroList),
    generateSignatureItemInfoStatistics(heroList),
    generateFurnitureInfoStatistics(heroList),
    generateEquipmentInfoStatistics(heroList),
    generateEngraveInfoStatistics(heroList),
  );
};

export {
  generateStatistics,
};
