import { StatisticColor } from '~/application/domain/statistic/statisticColor';

export default class StatisticItem {
  amount: number;
  label: string;
  color: StatisticColor;
  // TODO in the future, a filter that is set on click

  constructor(amount: number = 0, label: string = '', color: StatisticColor = StatisticColor.NONE) {
    this.amount = amount;
    this.label = label;
    this.color = color;
  }
}
