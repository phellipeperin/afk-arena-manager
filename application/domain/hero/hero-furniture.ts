export enum HeroFurnitureType {
  Large = 'LARGE',
  Small = 'SMALL',
  Hanging = 'HANGING',
}

export default class HeroFurniture {
  pos: number;
  type: HeroFurnitureType;
  plus: number;

  constructor(pos: number = 0, type: HeroFurnitureType = HeroFurnitureType.Large, plus: number = -1) {
    this.pos = pos;
    this.type = type;
    this.plus = plus;
  }
};
