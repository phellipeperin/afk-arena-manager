import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';
import Hero from '~/application/domain/hero/hero';

export interface StatisticHeroCopyNeeded {
  amount: number;
  hero: Hero;
}

export default class StatisticAscensionInfo extends StatisticInfo {
  eliteSacNeeded: number = 0;
  totalNormalCopiesNeeded: number = 0;
  totalCelepogeanCopiesNeeded: number = 0;
  totalAwakenedCopiesNeeded: number = 0;
  copiesNormalNeeded: Array<StatisticHeroCopyNeeded> = [];
  copiesCelepogeanNeeded: Array<StatisticHeroCopyNeeded> = [];
  copiesAwakenedNeeded: Array<StatisticHeroCopyNeeded> = [];
}
