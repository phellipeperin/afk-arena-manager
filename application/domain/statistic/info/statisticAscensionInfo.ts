import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';
import Hero from '~/application/domain/hero/hero';

export interface StatisticHeroCopyNeeded {
  amount: number;
  hero: Hero;
}

export default class StatisticAscensionInfo extends StatisticInfo {
  elitePlusSacNeeded: number = 0;
  totalNormalCopiesNeeded: number = 0;
  totalCelepogeanCopiesNeeded: number = 0;
  copiedNeeded: Array<StatisticHeroCopyNeeded> = [];
}
