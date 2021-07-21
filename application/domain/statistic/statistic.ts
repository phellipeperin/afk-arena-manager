import StatisticItem from '~/application/domain/statistic/statisticItem';

export default class Statistic {
  ascensionChart: Array<StatisticItem>;
  signatureItemChart: Array<StatisticItem>;
  furnitureChart: Array<StatisticItem>;
  equipmentChart: Array<StatisticItem>;
  engraveChart: Array<StatisticItem>;

  constructor(
    ascensionChart: Array<StatisticItem> = [],
    signatureItemChart: Array<StatisticItem> = [],
    furnitureChart: Array<StatisticItem> = [],
    equipmentChart: Array<StatisticItem> = [],
    engraveChart: Array<StatisticItem> = [],
  ) {
    this.ascensionChart = ascensionChart;
    this.signatureItemChart = signatureItemChart;
    this.furnitureChart = furnitureChart;
    this.equipmentChart = equipmentChart;
    this.engraveChart = engraveChart;
  }
};
