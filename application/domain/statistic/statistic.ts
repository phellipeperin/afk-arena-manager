import StatisticItem from '~/application/domain/statistic/statisticItem';

export default class Statistic {
  ascension: Array<StatisticItem>;
  signatureItem: Array<StatisticItem>;
  furniture: Array<StatisticItem>;
  equipment: Array<StatisticItem>;
  engrave: Array<StatisticItem>;

  constructor() {
    this.ascension = [];
    this.signatureItem = [];
    this.furniture = [];
    this.equipment = [];
    this.engrave = [];
  }
};
