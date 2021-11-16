import { Ascension } from '../info/ascension';
import HeroEquip, { HeroEquipType } from './hero-equip';

export default class HeroPlayerInfo {
  ascension: Ascension;
  equipment: Array<HeroEquip>;
  signatureItem: number; // -1 to 40
  furniture: number; // 0 to 36
  engrave: number; // 0 to 100
  onCrystal: boolean;
  numberOfCopies: number;
  acquiredSkins: Array<string>;
  // System
  priority: number;

  constructor() {
    this.ascension = Ascension.None;
    this.equipment = [
      new HeroEquip(HeroEquipType.Weapon),
      new HeroEquip(HeroEquipType.Head),
      new HeroEquip(HeroEquipType.Chest),
      new HeroEquip(HeroEquipType.Feet),
    ];
    this.signatureItem = -1;
    this.furniture = 0;
    this.engrave = 0;
    this.numberOfCopies = 0;
    this.onCrystal = false;
    this.acquiredSkins = [];

    this.priority = 0;
  }
}
