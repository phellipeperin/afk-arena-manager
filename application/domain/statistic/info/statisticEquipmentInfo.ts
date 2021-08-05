import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';

export interface StatisticEquipmentStonesNeeded {
  t1: number;
  t2: number;
  t3: number;
}

export default class StatisticEquipmentInfo extends StatisticInfo {
  itemsNeeded: number = 0;
  starsNeeded: number = 0;
  wrongFaction: number = 0;
  noFaction: number = 0;
  stonesNeeded: StatisticEquipmentStonesNeeded = {
    t1: 0,
    t2: 0,
    t3: 0,
  };
}
