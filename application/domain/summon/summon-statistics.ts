import SummonStatisticsItem from '~/application/domain/summon/summon-statistics-item';

export default class SummonStatistics {
  normal: SummonStatisticsItem;
  faction: SummonStatisticsItem;
  companion: SummonStatisticsItem;
  heroChoice: SummonStatisticsItem;
  stargazer: SummonStatisticsItem;
  timeTemple: SummonStatisticsItem;
  furniture: SummonStatisticsItem;
  totals: SummonStatisticsItem;

  constructor(
    normal: SummonStatisticsItem = new SummonStatisticsItem(),
    faction: SummonStatisticsItem = new SummonStatisticsItem(),
    companion: SummonStatisticsItem = new SummonStatisticsItem(),
    heroChoice: SummonStatisticsItem = new SummonStatisticsItem(),
    stargazer: SummonStatisticsItem = new SummonStatisticsItem(),
    timeTemple: SummonStatisticsItem = new SummonStatisticsItem(),
    furniture: SummonStatisticsItem = new SummonStatisticsItem(),
    totals: SummonStatisticsItem = new SummonStatisticsItem(),
  ) {
    this.normal = normal;
    this.faction = faction;
    this.companion = companion;
    this.heroChoice = heroChoice;
    this.stargazer = stargazer;
    this.timeTemple = timeTemple;
    this.furniture = furniture;
    this.totals = totals;
  }
}
