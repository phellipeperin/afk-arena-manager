import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import Hero from '~/application/domain/hero/hero';

export interface EquipmentInformationProgressEquipItemValueItem {
  amount: number;
  heroes: Array<Hero>;
}

export interface EquipmentInformationProgressEquipItemValues {
  total: EquipmentInformationProgressEquipItemValueItem;
  notAcquired: EquipmentInformationProgressEquipItemValueItem;
  t0: EquipmentInformationProgressEquipItemValueItem;
  t1: EquipmentInformationProgressEquipItemValueItem;
  t2: EquipmentInformationProgressEquipItemValueItem;
  t3: EquipmentInformationProgressEquipItemValueItem;
  t4: EquipmentInformationProgressEquipItemValueItem;
}

export default class EquipmentInformationProgressEquipItem {
  equipType: HeroEquipType;
  values: EquipmentInformationProgressEquipItemValues;

  constructor(equipType: HeroEquipType) {
    this.equipType = equipType;
    this.values = {
      total: { amount: 0, heroes: [] },
      notAcquired: { amount: 0, heroes: [] },
      t0: { amount: 0, heroes: [] },
      t1: { amount: 0, heroes: [] },
      t2: { amount: 0, heroes: [] },
      t3: { amount: 0, heroes: [] },
      t4: { amount: 0, heroes: [] },
    };
  }
}
