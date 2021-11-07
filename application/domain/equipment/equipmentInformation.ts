import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import EquipmentInformationProgressCollection
  from '~/application/domain/equipment/equipmentInformationProgressCollection';

export default class EquipmentInformation {
  progress: EquipmentInformationProgressCollection;
  arrangement: EquipmentInformationArrangement;

  constructor(progress: EquipmentInformationProgressCollection, arrangement: EquipmentInformationArrangement) {
    this.progress = progress;
    this.arrangement = arrangement;
  }
}
