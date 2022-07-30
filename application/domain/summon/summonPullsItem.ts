export default class SummonPullsItem {
  total: number;
  normal: Array<string>;
  celepogean: Array<string>;
  awakened: Array<string>;
  mythicFurniture: Array<string>;
  cardHero: Array<string>;
  cardFurniture: Array<string>;

  constructor(
    total: number = 0,
    normal: Array<string> = [],
    celepogean: Array<string> = [],
    awakened: Array<string> = [],
    mythicFurniture: Array<string> = [],
    cardHero: Array<string> = [],
    cardFurniture: Array<string> = [],
  ) {
    this.total = total;
    this.normal = normal;
    this.celepogean = celepogean;
    this.awakened = awakened;
    this.mythicFurniture = mythicFurniture;
    this.cardHero = cardHero;
    this.cardFurniture = cardFurniture;
  }
}
