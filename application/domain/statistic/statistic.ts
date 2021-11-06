import StatisticChart from '~/application/domain/statistic/statisticChart';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';
import StatisticArtifactInfo from '~/application/domain/statistic/info/statisticArtifactInfo';
import StatisticElderTreeInfo from '~/application/domain/statistic/info/statisticElderTreeInfo';

export default class Statistic {
  ascensionChartList: Array<StatisticChart>;
  signatureItemChartList: Array<StatisticChart>;
  furnitureChartList: Array<StatisticChart>;
  engraveChartList: Array<StatisticChart>;
  equipmentChartList: Array<StatisticChart>;

  ascensionInfo: Array<StatisticAscensionInfo>;
  signatureItemInfo: Array<StatisticSignatureItemInfo>;
  furnitureInfo: Array<StatisticFurnitureInfo>;
  engraveInfo: Array<StatisticEngraveInfo>;
  equipmentInfo: Array<StatisticEquipmentInfo>;
  artifactInfo: Array<StatisticArtifactInfo>;
  elderTreeInfo: Array<StatisticElderTreeInfo>;

  constructor(
    ascensionChartList: Array<StatisticChart> = [],
    signatureItemChartList: Array<StatisticChart> = [],
    furnitureChartList: Array<StatisticChart> = [],
    engraveChartList: Array<StatisticChart> = [],
    equipmentChartList: Array<StatisticChart> = [],

    ascensionInfo: Array<StatisticAscensionInfo> = [],
    signatureItemInfo: Array<StatisticSignatureItemInfo> = [],
    furnitureInfo: Array<StatisticFurnitureInfo> = [],
    engraveInfo: Array<StatisticEngraveInfo> = [],
    equipmentInfo: Array<StatisticEquipmentInfo> = [],
    artifactInfo: Array<StatisticArtifactInfo> = [],
    elderTreeInfo: Array<StatisticElderTreeInfo> = [],
  ) {
    this.ascensionChartList = ascensionChartList;
    this.signatureItemChartList = signatureItemChartList;
    this.furnitureChartList = furnitureChartList;
    this.engraveChartList = engraveChartList;
    this.equipmentChartList = equipmentChartList;

    this.ascensionInfo = ascensionInfo;
    this.signatureItemInfo = signatureItemInfo;
    this.furnitureInfo = furnitureInfo;
    this.engraveInfo = engraveInfo;
    this.equipmentInfo = equipmentInfo;
    this.artifactInfo = artifactInfo;
    this.elderTreeInfo = elderTreeInfo;
  }
};
