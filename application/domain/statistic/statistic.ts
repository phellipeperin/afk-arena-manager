import StatisticChart from '~/application/domain/statistic/statisticChart';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';

export default class Statistic {
  ascensionChartList: Array<StatisticChart>;
  signatureItemChartList: Array<StatisticChart>;
  furnitureChartList: Array<StatisticChart>;
  equipmentChartList: Array<StatisticChart>;
  engraveChartList: Array<StatisticChart>;

  ascensionInfo: Array<StatisticAscensionInfo>;
  signatureItemInfo: Array<StatisticSignatureItemInfo>;
  furnitureInfo: Array<StatisticFurnitureInfo>;
  equipmentInfo: Array<StatisticEquipmentInfo>;
  engraveInfo: Array<StatisticEngraveInfo>;

  constructor(
    ascensionChartList: Array<StatisticChart> = [],
    signatureItemChartList: Array<StatisticChart> = [],
    furnitureChartList: Array<StatisticChart> = [],
    equipmentChartList: Array<StatisticChart> = [],
    engraveChartList: Array<StatisticChart> = [],
    ascensionInfo: Array<StatisticAscensionInfo> = [],
    signatureItemInfo: Array<StatisticSignatureItemInfo> = [],
    furnitureInfo: Array<StatisticFurnitureInfo> = [],
    equipmentInfo: Array<StatisticEquipmentInfo> = [],
    engraveInfo: Array<StatisticEngraveInfo> = [],
  ) {
    this.ascensionChartList = ascensionChartList;
    this.signatureItemChartList = signatureItemChartList;
    this.furnitureChartList = furnitureChartList;
    this.equipmentChartList = equipmentChartList;
    this.engraveChartList = engraveChartList;

    this.ascensionInfo = ascensionInfo;
    this.signatureItemInfo = signatureItemInfo;
    this.furnitureInfo = furnitureInfo;
    this.equipmentInfo = equipmentInfo;
    this.engraveInfo = engraveInfo;
  }
};
