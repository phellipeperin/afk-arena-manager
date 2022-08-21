import SummonStatisticsItem from '~/application/domain/summon/summonStatisticsItem';

export default class SummonStatistics {
  stones: SummonStatisticsItem;
  normal: SummonStatisticsItem;
  faction: SummonStatisticsItem;
  companion: SummonStatisticsItem;
  heroChoice: SummonStatisticsItem;
  stargazer: SummonStatisticsItem;
  timeTemple: SummonStatisticsItem;
  furniture: SummonStatisticsItem;
  totals: SummonStatisticsItem;

  constructor(
    stones: SummonStatisticsItem = new SummonStatisticsItem(),
    normal: SummonStatisticsItem = new SummonStatisticsItem(),
    faction: SummonStatisticsItem = new SummonStatisticsItem(),
    companion: SummonStatisticsItem = new SummonStatisticsItem(),
    heroChoice: SummonStatisticsItem = new SummonStatisticsItem(),
    stargazer: SummonStatisticsItem = new SummonStatisticsItem(),
    timeTemple: SummonStatisticsItem = new SummonStatisticsItem(),
    furniture: SummonStatisticsItem = new SummonStatisticsItem(),
    totals: SummonStatisticsItem = new SummonStatisticsItem(),
  ) {
    this.stones = stones;
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
