import Hero from '~/application/domain/hero/hero';

export interface StatisticHeroCopyNeeded {
  amount: number;
  hero: Hero;
}

export default class StatisticAscensionInfo {
  key: string;
  label: string;

  elitePlusSacNeeded: number = 0;
  totalNormalCopiesNeeded: number = 0;
  totalCelepogeanCopiesNeeded: number = 0;
  copiedNeeded: Array<StatisticHeroCopyNeeded> = [];

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}
