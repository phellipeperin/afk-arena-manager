import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';

export interface StatisticEquipmentStonesTypeNeeded {
  str: number;
  dex: number;
  int: number;
}

export interface StatisticEquipmentStonesNeeded {
  t1: StatisticEquipmentStonesTypeNeeded;
  t2: StatisticEquipmentStonesTypeNeeded;
  t3: StatisticEquipmentStonesTypeNeeded;
}

export default class StatisticEquipmentInfo extends StatisticInfo {
  itemsNeeded: number = 0;
  starsNeeded: number = 0;
  wrongFaction: number = 0;
  noFaction: number = 0;
  tokensNeeded: number = 0;
  goldNeeded: number = 0;
  stonesNeeded: StatisticEquipmentStonesNeeded = {
    t1: { str: 0, dex: 0, int: 0 },
    t2: { str: 0, dex: 0, int: 0 },
    t3: { str: 0, dex: 0, int: 0 },
  };
}
