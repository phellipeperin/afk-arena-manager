import EquipmentInformationProgressEquipItem from '~/application/domain/equipment/equipmentInformationProgressEquipItem';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';

export default class EquipmentInformationProgress {
  faction: Faction;
  type: Type;
  items: Array<EquipmentInformationProgressEquipItem>;

  constructor(faction: Faction, type: Type) {
    this.faction = faction;
    this.type = type;
    this.items = [];
  }
}
