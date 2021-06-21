import { Faction } from '../info/faction';

export enum HeroEquipType {
  Weapon = 'WEAPON',
  Head = 'HEAD',
  Chest = 'CHEST',
  Feet = 'FEET',
}

export default class HeroEquip {
  type: HeroEquipType;
  faction: Faction;
  tier: number;
  stars: number;

  constructor(type: HeroEquipType = HeroEquipType.Weapon, faction: Faction = Faction.None, tier: number = -1, stars: number = 0) {
    this.type = type;
    this.faction = faction;
    this.tier = tier;
    this.stars = stars;
  }
};
