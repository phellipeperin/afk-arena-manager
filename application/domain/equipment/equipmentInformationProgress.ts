import EquipmentInformationProgressEquipItem from '~/application/domain/equipment/equipmentInformationProgressEquipItem';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';

export default class EquipmentInformationProgress {
  faction: Faction | undefined;
  type: Type | undefined;
  items: Array<EquipmentInformationProgressEquipItem>;

  constructor(faction: Faction | undefined, type: Type | undefined) {
    this.faction = faction;
    this.type = type;
    this.items = [];
  }
}
