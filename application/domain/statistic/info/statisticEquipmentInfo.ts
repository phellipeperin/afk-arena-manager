export interface StatisticEquipmentStonesNeeded {
  t1: number;
  t2: number;
  t3: number;
}

export default class StatisticEquipmentInfo {
  key: string;
  label: string;

  itemsMissing: number = 0;
  starsMissing: number = 0;
  stonesMissing: StatisticEquipmentStonesNeeded = {
    t1: 0,
    t2: 0,
    t3: 0,
  };

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}
