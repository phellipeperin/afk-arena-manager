import Hero from '~/application/domain/hero/hero';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';

const generateEquipmentInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  return new EquipmentInformationArrangement();
};

export {
  generateEquipmentInformationArrangement,
};
