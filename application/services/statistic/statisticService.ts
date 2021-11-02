import { generateAscensionChartStatistics, generateAscensionInfoStatistics } from './statisticAscensionService';
import { generateSignatureItemChartStatistics, generateSignatureItemInfoStatistics } from './statisticSignatureItemService';
import { generateFurnitureChartStatistics, generateFurnitureInfoStatistics } from './statisticFurnitureService';
import { generateEquipmentChartStatistics, generateEquipmentInfoStatistics } from './statisticEquipmentService';
import { generateEngraveChartStatistics, generateEngraveInfoStatistics } from './statisticEngraveService';
import { generateElderTreeInfoStatistics } from './statisticElderTreeService';

import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';
import Resources from '~/application/domain/resources/resources';

const generateStatistics = (heroList: Array<Hero>, resources: Resources): Statistic => {
  return new Statistic(
    generateAscensionChartStatistics(heroList),
    generateSignatureItemChartStatistics(heroList),
    generateFurnitureChartStatistics(heroList),
    generateEngraveChartStatistics(heroList),
    generateEquipmentChartStatistics(heroList),
    generateAscensionInfoStatistics(heroList),
    generateSignatureItemInfoStatistics(heroList),
    generateFurnitureInfoStatistics(heroList),
    generateEngraveInfoStatistics(heroList),
    generateEquipmentInfoStatistics(heroList),
    generateElderTreeInfoStatistics(heroList, resources),
  );
};

export {
  generateStatistics,
};
