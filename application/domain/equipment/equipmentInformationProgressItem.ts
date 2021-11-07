import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';

export default class EquipmentInformationProgressItem {
  faction: Faction;
  type: Type;
  totalPossible: number;
  values: Array<StatisticChartItem>;

  constructor(faction: Faction, type: Type) {
    this.faction = faction;
    this.type = type;
    this.totalPossible = 0;
    this.values = [];
  }
}
