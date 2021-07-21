export default class StatisticItem {
  amount: number;
  label: string;
  // TODO in the future, a filter that is set on click

  constructor(amount: number = 0, label: string = '') {
    this.amount = amount;
    this.label = label;
  }
}
