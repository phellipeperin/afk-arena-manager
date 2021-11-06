import { generateEquipmentInformationProgress } from './equipmentProgressService';
import { generateEquipmentInformationArrangement } from './equipmentArrangementService';

import Hero from '~/application/domain/hero/hero';
import EquipmentInformation from '~/application/domain/equipment/equipmentInformation';

const generateEquipmentInformation = (heroList: Array<Hero>): EquipmentInformation => {
  return new EquipmentInformation(
    generateEquipmentInformationProgress(heroList),
    generateEquipmentInformationArrangement(heroList),
  );
};

export {
  generateEquipmentInformation,
};
