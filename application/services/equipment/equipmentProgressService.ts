import Hero from '~/application/domain/hero/hero';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';

const generateEquipmentInformationProgress = (heroList: Array<Hero>): EquipmentInformationProgress => {
  return new EquipmentInformationProgress();
};

export {
  generateEquipmentInformationProgress,
};
