export default class SummonPullsItem {
  total: number;
  elite: Array<string>;
  star: Array<string>;
  awakened: Array<string>;
  mythicFurniture: Array<string>;
  cardHero: Array<string>;
  cardFurniture: Array<string>;

  constructor(
    total: number = 0,
    elite: Array<string> = [],
    star: Array<string> = [],
    awakened: Array<string> = [],
    mythicFurniture: Array<string> = [],
    cardHero: Array<string> = [],
    cardFurniture: Array<string> = [],
  ) {
    this.total = total;
    this.elite = elite;
    this.star = star;
    this.awakened = awakened;
    this.mythicFurniture = mythicFurniture;
    this.cardHero = cardHero;
    this.cardFurniture = cardFurniture;
  }
}
