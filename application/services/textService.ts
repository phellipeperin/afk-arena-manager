// Domain Imports
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';

// Load Functions
const loadAscensionLabel = (option: Ascension): string => {
  switch (option) {
    case Ascension.None: { return 'Not Acquired'; }
    case Ascension.Elite: { return 'Elite'; }
    case Ascension.ElitePlus: { return 'Elite Plus'; }
    case Ascension.Legendary: { return 'Legendary'; }
    case Ascension.LegendaryPlus: { return 'Legendary Plus'; }
    case Ascension.Mythic: { return 'Mythic'; }
    case Ascension.MythicPlus: { return 'Mythic Plus'; }
    case Ascension.Ascended: { return 'Ascended'; }
    case Ascension.Ascended1Star: { return 'Ascended 1 Star'; }
    case Ascension.Ascended2Star: { return 'Ascended 2 Stars'; }
    case Ascension.Ascended3Star: { return 'Ascended 3 Stars'; }
    case Ascension.Ascended4Star: { return 'Ascended 4 Stars'; }
    case Ascension.Ascended5Star: { return 'Ascended 5 Stars'; }
  }
  return '';
};

const loadFactionLabel = (option: Faction): string => {
  switch (option) {
    case Faction.None: { return 'No Faction'; }
    case Faction.Lightbearer: { return 'Lightbearer'; }
    case Faction.Mauler: { return 'Mauler'; }
    case Faction.Wilder: { return 'Wilder'; }
    case Faction.Graveborn: { return 'Graveborn'; }
    case Faction.Celestial: { return 'Celestial'; }
    case Faction.Hypogean: { return 'Hypogean'; }
    case Faction.Dimensional: { return 'Dimensional'; }
  }
  return '';
};

const loadGroupLabel = (option: Group): string => {
  switch (option) {
    case Group.Support: { return 'Support'; }
    case Group.Mage: { return 'Mage'; }
    case Group.Warrior: { return 'Warrior'; }
    case Group.Tank: { return 'Tank'; }
    case Group.Ranger: { return 'Ranger'; }
  }
  return '';
};

const loadRoleLabel = (option: Role): string => {
  switch (option) {
    case Role.AoE: { return 'AoE'; }
    case Role.Assassin: { return 'Assassin'; }
    case Role.Buffer: { return 'Buffer'; }
    case Role.BurstDamage: { return 'Burst Damage'; }
    case Role.ContinuousDamage: { return 'Continuous Damage'; }
    case Role.Control: { return 'Control'; }
    case Role.Debuffer: { return 'Debuffer'; }
    case Role.Regeneration: { return 'Regeneration'; }
    case Role.Tank: { return 'Tank'; }
  }
  return '';
};

const loadTypeLabel = (option: Type): string => {
  switch (option) {
    case Type.STR: { return 'STR'; }
    case Type.INT: { return 'INT'; }
    case Type.DEX: { return 'DEX'; }
  }
  return '';
};

const loadEquipmentTypeLabel = (type: HeroEquipType): string => {
  switch (type) {
    case HeroEquipType.Weapon: { return 'Weapon'; }
    case HeroEquipType.Head: { return 'Head'; }
    case HeroEquipType.Chest: { return 'Chest'; }
    case HeroEquipType.Feet: { return 'Feet'; }
  }
  return '';
};

const loadFurnitureTypeLabel = (type: HeroFurnitureType): string => {
  switch (type) {
    case HeroFurnitureType.Large: { return 'Large'; }
    case HeroFurnitureType.Small: { return 'Small'; }
    case HeroFurnitureType.Hanging: { return 'Hanging'; }
  }
  return '';
};

const loadEquipmentTierLabel = (tier: number): string => {
  switch (tier) {
    case -1: { return 'Not Acquired'; }
    case 0: { return 'T0'; }
    case 1: { return 'T1'; }
    case 2: { return 'T2'; }
    case 3: { return 'T3'; }
  }
  return '';
};

// Export
export {
  loadAscensionLabel,
  loadFactionLabel,
  loadGroupLabel,
  loadRoleLabel,
  loadTypeLabel,
  loadEquipmentTypeLabel,
  loadFurnitureTypeLabel,
  loadEquipmentTierLabel,
};
