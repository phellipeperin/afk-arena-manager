import SummonPullsItem from '~/application/domain/summon/summonPullsItem';

export default class SummonPulls {
  stones: SummonPullsItem;
  companion: SummonPullsItem;
  normal: SummonPullsItem;
  faction: SummonPullsItem;
  heroChoice: SummonPullsItem;
  timeTemple: SummonPullsItem;
  stargazer: SummonPullsItem;
  furniture: SummonPullsItem;
  cards: SummonPullsItem;

  constructor(
    stones: SummonPullsItem = new SummonPullsItem(),
    companion: SummonPullsItem = new SummonPullsItem(),
    normal: SummonPullsItem = new SummonPullsItem(),
    faction: SummonPullsItem = new SummonPullsItem(),
    heroChoice: SummonPullsItem = new SummonPullsItem(),
    timeTemple: SummonPullsItem = new SummonPullsItem(),
    stargazer: SummonPullsItem = new SummonPullsItem(),
    furniture: SummonPullsItem = new SummonPullsItem(),
    cards: SummonPullsItem = new SummonPullsItem(),
  ) {
    this.stones = stones;
    this.companion = companion;
    this.normal = normal;
    this.faction = faction;
    this.heroChoice = heroChoice;
    this.timeTemple = timeTemple;
    this.stargazer = stargazer;
    this.furniture = furniture;
    this.cards = cards;
  }
}
