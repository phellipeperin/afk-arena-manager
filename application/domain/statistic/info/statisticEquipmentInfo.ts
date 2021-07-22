import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';

export interface StatisticEquipmentStonesNeeded {
  t1: number;
  t2: number;
  t3: number;
}

export default class StatisticEquipmentInfo extends StatisticInfo {
  itemsMissing: number = 0;
  starsMissing: number = 0;
  stonesMissing: StatisticEquipmentStonesNeeded = {
    t1: 0,
    t2: 0,
    t3: 0,
  };
}
