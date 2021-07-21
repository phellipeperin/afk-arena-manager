import StatisticItem from '~/application/domain/statistic/statisticItem';

export default class Statistic {
  ascension: Array<StatisticItem>;
  signatureItem: Array<StatisticItem>;
  furniture: Array<StatisticItem>;
  equipment: Array<StatisticItem>;
  engrave: Array<StatisticItem>;

  constructor(
    ascension: Array<StatisticItem> = [],
    signatureItem: Array<StatisticItem> = [],
    furniture: Array<StatisticItem> = [],
    equipment: Array<StatisticItem> = [],
    engrave: Array<StatisticItem> = [],
  ) {
    this.ascension = ascension;
    this.signatureItem = signatureItem;
    this.furniture = furniture;
    this.equipment = equipment;
    this.engrave = engrave;
  }
};
