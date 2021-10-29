import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';

export default class StatisticChart {
  title: string;
  chartItems: Array<StatisticChartItem>;

  constructor(title: string = '', chartItems: Array<StatisticChartItem> = []) {
    this.title = title;
    this.chartItems = chartItems;
  }
}
