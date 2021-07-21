import { generateAscensionStatistics } from './statisticAscensionService';
import { generateSignatureItemStatistics } from './statisticSignatureItemService';
import { generateFurnitureStatistics } from './statisticFurnitureService';
import { generateEquipmentStatistics } from './statisticEquipmentService';
import { generateEngraveStatistics } from './statisticEngraveService';

import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';

const generateStatistics = (heroList: Array<Hero>): Statistic => {
  return new Statistic(
    generateAscensionStatistics(heroList),
    generateSignatureItemStatistics(heroList),
    generateFurnitureStatistics(heroList),
    generateEquipmentStatistics(heroList),
    generateEngraveStatistics(heroList),
  );
};

export {
  generateStatistics,
};
