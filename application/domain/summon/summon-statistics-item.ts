export default class SummonStatisticsItem {
  total: number;
  normalFaction: number;
  celepogean: number;
  awakened: number;
  furniture: number;
  heroCards: number;
  furnitureCards: number;

  constructor(
    total: number = 0,
    normalFaction: number = 0,
    celepogean: number = 0,
    awakened: number = 0,
    furniture: number = 0,
    heroCards: number = 0,
    furnitureCards: number = 0,
  ) {
    this.total = total;
    this.normalFaction = normalFaction;
    this.celepogean = celepogean;
    this.awakened = awakened;
    this.furniture = furniture;
    this.heroCards = heroCards;
    this.furnitureCards = furnitureCards;
  }
}
