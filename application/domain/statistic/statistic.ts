import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';

export default class Statistic {
  ascensionChart: Array<StatisticChartItem>;
  signatureItemChart: Array<StatisticChartItem>;
  furnitureChart: Array<StatisticChartItem>;
  equipmentChart: Array<StatisticChartItem>;
  engraveChart: Array<StatisticChartItem>;

  ascensionInfo: Array<StatisticAscensionInfo>;
  signatureItemInfo: Array<StatisticSignatureItemInfo>;
  furnitureInfo: Array<StatisticFurnitureInfo>;
  equipmentInfo: Array<StatisticEquipmentInfo>;
  engraveInfo: Array<StatisticEngraveInfo>;

  constructor(
    ascensionChart: Array<StatisticChartItem> = [],
    signatureItemChart: Array<StatisticChartItem> = [],
    furnitureChart: Array<StatisticChartItem> = [],
    equipmentChart: Array<StatisticChartItem> = [],
    engraveChart: Array<StatisticChartItem> = [],
    ascensionInfo: Array<StatisticAscensionInfo> = [],
    signatureItemInfo: Array<StatisticSignatureItemInfo> = [],
    furnitureInfo: Array<StatisticFurnitureInfo> = [],
    equipmentInfo: Array<StatisticEquipmentInfo> = [],
    engraveInfo: Array<StatisticEngraveInfo> = [],
  ) {
    this.ascensionChart = ascensionChart;
    this.signatureItemChart = signatureItemChart;
    this.furnitureChart = furnitureChart;
    this.equipmentChart = equipmentChart;
    this.engraveChart = engraveChart;

    this.ascensionInfo = ascensionInfo;
    this.signatureItemInfo = signatureItemInfo;
    this.furnitureInfo = furnitureInfo;
    this.equipmentInfo = equipmentInfo;
    this.engraveInfo = engraveInfo;
  }
};
