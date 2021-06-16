import { Ascension } from '../info/ascension';
import HeroEquip, { HeroEquipType } from './hero-equip';

export default class HeroPlayerInfo {
  ascension: Ascension;
  equipment: Array<HeroEquip>;
  signatureItem: number; // -1 to 30 (or 40)
  // TODO furniture
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
    this.numberOfCopies = 0;
    this.onCrystal = false;
    this.acquiredSkins = [];
  }
}
