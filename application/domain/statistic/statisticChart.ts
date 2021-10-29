import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';

export enum StatisticChartType {
  DONUT = 'DONUT',
  RADIAL = 'RADIAL',
}

export default class StatisticChart {
  title: string;
  type: StatisticChartType;
  data: Array<StatisticChartItem>;

  constructor(title: string, type: StatisticChartType, data: Array<StatisticChartItem> = []) {
    this.title = title;
    this.type = type;
    this.data = data;
  }
}
