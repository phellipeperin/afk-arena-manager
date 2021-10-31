import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';

export default class StatisticFurnitureInfo extends StatisticInfo {
  totalNeeded: number = 0;
  estimatedPoeNeeded: number = 0;
  largeFurnitureNeeded: number = 0;
  smallFurnitureNeeded: number = 0;
  hangingFurnitureNeeded: number = 0;
}
