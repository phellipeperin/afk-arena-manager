import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import Hero from '~/application/domain/hero/hero';

export default class StatisticChartItem {
  amount: number;
  label: string;
  color: StatisticColor;
  heroes: Array<Hero>;

  constructor(amount: number = 0, label: string = '', color: StatisticColor = StatisticColor.NONE, heroes: Array<Hero> = []) {
    this.amount = amount;
    this.label = label;
    this.color = color;
    this.heroes = heroes;
  }
}
