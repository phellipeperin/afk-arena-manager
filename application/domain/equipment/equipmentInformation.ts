import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';

export default class EquipmentInformation {
  progress: EquipmentInformationProgress;
  arrangement: EquipmentInformationArrangement;

  constructor(progress: EquipmentInformationProgress, arrangement: EquipmentInformationArrangement) {
    this.progress = progress;
    this.arrangement = arrangement;
  }
}
