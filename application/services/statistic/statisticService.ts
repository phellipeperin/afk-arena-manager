import { generateAscensionChartStatistics, generateAscensionInfoStatistics } from './statisticAscensionService';
import { generateSignatureItemChartStatistics, generateSignatureItemInfoStatistics } from './statisticSignatureItemService';
import { generateFurnitureChartStatistics, generateFurnitureInfoStatistics } from './statisticFurnitureService';
import { generateEquipmentChartStatistics, generateEquipmentInfoStatistics } from './statisticEquipmentService';
import { generateEngraveChartStatistics, generateEngraveInfoStatistics } from './statisticEngraveService';
import { generateArtifactInfoStatistics } from './statisticArtifactService';
import { generateElderTreeInfoStatistics } from './statisticElderTreeService';

import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';
import Resources from '~/application/domain/resources/resources';

const generateStatistics = (baseHeroList: Array<Hero>, filteredHeroList: Array<Hero>, resources: Resources): Statistic => {
  return new Statistic(
    generateAscensionChartStatistics(filteredHeroList),
    generateSignatureItemChartStatistics(filteredHeroList),
    generateFurnitureChartStatistics(filteredHeroList),
    generateEngraveChartStatistics(filteredHeroList),
    generateEquipmentChartStatistics(filteredHeroList),
    generateAscensionInfoStatistics(filteredHeroList),
    generateSignatureItemInfoStatistics(filteredHeroList),
    generateFurnitureInfoStatistics(filteredHeroList),
    generateEngraveInfoStatistics(filteredHeroList),
    generateEquipmentInfoStatistics(filteredHeroList),
    generateArtifactInfoStatistics(resources),
    generateElderTreeInfoStatistics(baseHeroList, resources),
  );
};

export {
  generateStatistics,
};
