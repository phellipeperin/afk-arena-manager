export enum HeroFurnitureType {
  Large = 'LARGE',
  Small = 'SMALL',
  Hanging = 'HANGING',
}

export default class HeroFurniture {
  type: HeroFurnitureType;
  plus: number;

  constructor(type: HeroFurnitureType = HeroFurnitureType.Large, plus: number = 0) {
    this.type = type;
    this.plus = plus;
  }
};
