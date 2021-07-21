import { Ascension } from '../info/ascension';
import HeroEquip, { HeroEquipType } from './hero-equip';
import HeroFurniture, { HeroFurnitureType } from './hero-furniture';

export default class HeroPlayerInfo {
  ascension: Ascension;
  equipment: Array<HeroEquip>;
  signatureItem: number; // -1 to 30 (or 40)
  engrave: number; // -1 to 100
  furniture: Array<HeroFurniture>;
  onCrystal: boolean;
  numberOfCopies: number;
  acquiredSkins: Array<string>;

  constructor() {
    this.ascension = Ascension.None;
    this.equipment = [
      new HeroEquip(HeroEquipType.Weapon),
      new HeroEquip(HeroEquipType.Head),
      new HeroEquip(HeroEquipType.Chest),
      new HeroEquip(HeroEquipType.Feet),
    ];
    this.signatureItem = -1;
    this.engrave = -1;
    this.furniture = [
      new HeroFurniture(1, HeroFurnitureType.Large),
      new HeroFurniture(2, HeroFurnitureType.Large),
      new HeroFurniture(3, HeroFurnitureType.Large),
      new HeroFurniture(1, HeroFurnitureType.Small),
      new HeroFurniture(2, HeroFurnitureType.Small),
      new HeroFurniture(3, HeroFurnitureType.Small),
      new HeroFurniture(1, HeroFurnitureType.Hanging),
      new HeroFurniture(2, HeroFurnitureType.Hanging),
      new HeroFurniture(3, HeroFurnitureType.Hanging),
    ];
    this.numberOfCopies = 0;
    this.onCrystal = false;
    this.acquiredSkins = [];
  }
}
