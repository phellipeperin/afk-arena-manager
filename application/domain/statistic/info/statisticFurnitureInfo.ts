import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';

export default class StatisticFurnitureInfo extends StatisticInfo {
  totalNeeded: number = 0;
  estimatedPoeNeeded: number = 0;
}

export const poeCostPerFurniture = 5790;
