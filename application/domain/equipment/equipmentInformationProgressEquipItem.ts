import { HeroEquipType } from '~/application/domain/hero/hero-equip';

export interface EquipmentInformationProgressEquipItemValues {
  total: number;
  notAcquired: number;
  t0: number;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
}

export default class EquipmentInformationProgressEquipItem {
  equipType: HeroEquipType;
  values: EquipmentInformationProgressEquipItemValues;

  constructor(equipType: HeroEquipType) {
    this.equipType = equipType;
    this.values = {
      total: 0,
      notAcquired: 0,
      t0: 0,
      t1: 0,
      t2: 0,
      t3: 0,
      t4: 0,
    };
  }
}
