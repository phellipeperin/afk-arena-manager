// Domain Imports
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';

// Equip Image Imports
const equipNotAcquiredStrWeapon = require('~/assets/images/equipment/none/str/weapon.jpg');
const equipNotAcquiredStrHead = require('~/assets/images/equipment/none/str/head.jpg');
const equipNotAcquiredStrChest = require('~/assets/images/equipment/none/str/chest.jpg');
const equipNotAcquiredStrFeet = require('~/assets/images/equipment/none/str/feet.jpg');
const equipNotAcquiredDexWeapon = require('~/assets/images/equipment/none/dex/weapon.jpg');
const equipNotAcquiredDexHead = require('~/assets/images/equipment/none/dex/head.jpg');
const equipNotAcquiredDexChest = require('~/assets/images/equipment/none/dex/chest.jpg');
const equipNotAcquiredDexFeet = require('~/assets/images/equipment/none/dex/feet.jpg');
const equipNotAcquiredIntWeapon = require('~/assets/images/equipment/none/int/weapon.jpg');
const equipNotAcquiredIntHead = require('~/assets/images/equipment/none/int/head.jpg');
const equipNotAcquiredIntChest = require('~/assets/images/equipment/none/int/chest.jpg');
const equipNotAcquiredIntFeet = require('~/assets/images/equipment/none/int/feet.jpg');

const equipT0StrWeapon = require('~/assets/images/equipment/t0/str/weapon.jpg');
const equipT0StrHead = require('~/assets/images/equipment/t0/str/head.jpg');
const equipT0StrChest = require('~/assets/images/equipment/t0/str/chest.jpg');
const equipT0StrFeet = require('~/assets/images/equipment/t0/str/feet.jpg');
const equipT0DexWeapon = require('~/assets/images/equipment/t0/dex/weapon.jpg');
const equipT0DexHead = require('~/assets/images/equipment/t0/dex/head.jpg');
const equipT0DexChest = require('~/assets/images/equipment/t0/dex/chest.jpg');
const equipT0DexFeet = require('~/assets/images/equipment/t0/dex/feet.jpg');
const equipT0IntWeapon = require('~/assets/images/equipment/t0/int/weapon.jpg');
const equipT0IntHead = require('~/assets/images/equipment/t0/int/head.jpg');
const equipT0IntChest = require('~/assets/images/equipment/t0/int/chest.jpg');
const equipT0IntFeet = require('~/assets/images/equipment/t0/int/feet.jpg');

const equipT1StrWeapon = require('~/assets/images/equipment/t1/str/weapon.jpg');
const equipT1StrHead = require('~/assets/images/equipment/t1/str/head.jpg');
const equipT1StrChest = require('~/assets/images/equipment/t1/str/chest.jpg');
const equipT1StrFeet = require('~/assets/images/equipment/t1/str/feet.jpg');
const equipT1DexWeapon = require('~/assets/images/equipment/t1/dex/weapon.jpg');
const equipT1DexHead = require('~/assets/images/equipment/t1/dex/head.jpg');
const equipT1DexChest = require('~/assets/images/equipment/t1/dex/chest.jpg');
const equipT1DexFeet = require('~/assets/images/equipment/t1/dex/feet.jpg');
const equipT1IntWeapon = require('~/assets/images/equipment/t1/int/weapon.jpg');
const equipT1IntHead = require('~/assets/images/equipment/t1/int/head.jpg');
const equipT1IntChest = require('~/assets/images/equipment/t1/int/chest.jpg');
const equipT1IntFeet = require('~/assets/images/equipment/t1/int/feet.jpg');

const equipT2StrWeapon = require('~/assets/images/equipment/t2/str/weapon.jpg');
const equipT2StrHead = require('~/assets/images/equipment/t2/str/head.jpg');
const equipT2StrChest = require('~/assets/images/equipment/t2/str/chest.jpg');
const equipT2StrFeet = require('~/assets/images/equipment/t2/str/feet.jpg');
const equipT2DexWeapon = require('~/assets/images/equipment/t2/dex/weapon.jpg');
const equipT2DexHead = require('~/assets/images/equipment/t2/dex/head.jpg');
const equipT2DexChest = require('~/assets/images/equipment/t2/dex/chest.jpg');
const equipT2DexFeet = require('~/assets/images/equipment/t2/dex/feet.jpg');
const equipT2IntWeapon = require('~/assets/images/equipment/t2/int/weapon.jpg');
const equipT2IntHead = require('~/assets/images/equipment/t2/int/head.jpg');
const equipT2IntChest = require('~/assets/images/equipment/t2/int/chest.jpg');
const equipT2IntFeet = require('~/assets/images/equipment/t2/int/feet.jpg');

const equipT3StrWeapon = require('~/assets/images/equipment/t3/str/weapon.jpg');
const equipT3StrHead = require('~/assets/images/equipment/t3/str/head.jpg');
const equipT3StrChest = require('~/assets/images/equipment/t3/str/chest.jpg');
const equipT3StrFeet = require('~/assets/images/equipment/t3/str/feet.jpg');
const equipT3DexWeapon = require('~/assets/images/equipment/t3/dex/weapon.jpg');
const equipT3DexHead = require('~/assets/images/equipment/t3/dex/head.jpg');
const equipT3DexChest = require('~/assets/images/equipment/t3/dex/chest.jpg');
const equipT3DexFeet = require('~/assets/images/equipment/t3/dex/feet.jpg');
const equipT3IntWeapon = require('~/assets/images/equipment/t3/int/weapon.jpg');
const equipT3IntHead = require('~/assets/images/equipment/t3/int/head.jpg');
const equipT3IntChest = require('~/assets/images/equipment/t3/int/chest.jpg');
const equipT3IntFeet = require('~/assets/images/equipment/t3/int/feet.jpg');

// Image Imports
const eliteEmblem = require('~/assets/images/emblem/emblem-elite.png');
const legendaryEmblem = require('~/assets/images/emblem/emblem-legendary.png');
const mythicEmblem = require('~/assets/images/emblem/emblem-mythic.jpg');
const mythicLightbearerEmblem = require('~/assets/images/emblem/emblem-mythic-lightbearer.jpg');
const mythicMaulerEmblem = require('~/assets/images/emblem/emblem-mythic-mauler.jpg');
const mythicWilderEmblem = require('~/assets/images/emblem/emblem-mythic-wilder.jpg');
const mythicGravebornEmblem = require('~/assets/images/emblem/emblem-mythic-graveborn.jpg');
const mythicCelestialEmblem = require('~/assets/images/emblem/emblem-mythic-celestial.jpg');
const mythicHypogeanEmblem = require('~/assets/images/emblem/emblem-mythic-hypogean.jpg');
const mythicDimensionalEmblem = require('~/assets/images/emblem/emblem-mythic-dimensional.png');

const none = require('~/assets/images/ascension/none.png');
const elite = require('~/assets/images/ascension/elite.png');
const elitePlus = require('~/assets/images/ascension/elite_plus.png');
const legendary = require('~/assets/images/ascension/legendary.png');
const legendaryPlus = require('~/assets/images/ascension/legendary_plus.png');
const mythic = require('~/assets/images/ascension/mythic.png');
const mythicPlus = require('~/assets/images/ascension/mythic_plus.png');
const ascended = require('~/assets/images/ascension/ascended.png');
const ascended1Star = require('~/assets/images/ascension/ascended_1.png');
const ascended2Stars = require('~/assets/images/ascension/ascended_2.png');
const ascended3Stars = require('~/assets/images/ascension/ascended_3.png');
const ascended4Stars = require('~/assets/images/ascension/ascended_4.png');
const ascended5Stars = require('~/assets/images/ascension/ascended_5.png');

const lightbearer = require('~/assets/images/faction/lightbearer.png');
const mauler = require('~/assets/images/faction/mauler.png');
const wilder = require('~/assets/images/faction/wilder.png');
const graveborn = require('~/assets/images/faction/graveborn.png');
const celestial = require('~/assets/images/faction/celestial.png');
const hypogean = require('~/assets/images/faction/hypogean.png');
const dimensional = require('~/assets/images/faction/dimensional.png');

const support = require('~/assets/images/group/support.png');
const mage = require('~/assets/images/group/mage.png');
const warrior = require('~/assets/images/group/warrior.png');
const tank = require('~/assets/images/group/tank.png');
const ranger = require('~/assets/images/group/ranger.png');

const roleAoe = require('~/assets/images/role/aoe.png');
const roleAssassin = require('~/assets/images/role/assassin.png');
const roleBuffer = require('~/assets/images/role/buffer.png');
const roleBurstDamage = require('~/assets/images/role/burst_damage.png');
const roleContinuousDamage = require('~/assets/images/role/continuous_damage.png');
const roleControl = require('~/assets/images/role/control.png');
const roleDebuffer = require('~/assets/images/role/debuffer.png');
const roleRegeneration = require('~/assets/images/role/regeneration.png');
const roleTank = require('~/assets/images/role/tank.png');

const str = require('~/assets/images/type/str.png');
const int = require('~/assets/images/type/int.png');
const dex = require('~/assets/images/type/dex.png');

// Private Load Functions
const loadEquipmentNotAcquired = (type: Type, equipType: HeroEquipType) => {
  switch (type) {
    case Type.STR: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipNotAcquiredStrWeapon; }
        case HeroEquipType.Head: { return equipNotAcquiredStrHead; }
        case HeroEquipType.Chest: { return equipNotAcquiredStrChest; }
        case HeroEquipType.Feet: { return equipNotAcquiredStrFeet; }
        default: { return ''; }
      }
    }
    case Type.DEX: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipNotAcquiredDexWeapon; }
        case HeroEquipType.Head: { return equipNotAcquiredDexHead; }
        case HeroEquipType.Chest: { return equipNotAcquiredDexChest; }
        case HeroEquipType.Feet: { return equipNotAcquiredDexFeet; }
        default: { return ''; }
      }
    }
    case Type.INT: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipNotAcquiredIntWeapon; }
        case HeroEquipType.Head: { return equipNotAcquiredIntHead; }
        case HeroEquipType.Chest: { return equipNotAcquiredIntChest; }
        case HeroEquipType.Feet: { return equipNotAcquiredIntFeet; }
        default: { return ''; }
      }
    }
  }
  return '';
};
const loadEquipmentT0 = (type: Type, equipType: HeroEquipType) => {
  switch (type) {
    case Type.STR: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT0StrWeapon; }
        case HeroEquipType.Head: { return equipT0StrHead; }
        case HeroEquipType.Chest: { return equipT0StrChest; }
        case HeroEquipType.Feet: { return equipT0StrFeet; }
        default: { return ''; }
      }
    }
    case Type.DEX: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT0DexWeapon; }
        case HeroEquipType.Head: { return equipT0DexHead; }
        case HeroEquipType.Chest: { return equipT0DexChest; }
        case HeroEquipType.Feet: { return equipT0DexFeet; }
        default: { return ''; }
      }
    }
    case Type.INT: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT0IntWeapon; }
        case HeroEquipType.Head: { return equipT0IntHead; }
        case HeroEquipType.Chest: { return equipT0IntChest; }
        case HeroEquipType.Feet: { return equipT0IntFeet; }
        default: { return ''; }
      }
    }
  }
  return '';
};
const loadEquipmentT1 = (type: Type, equipType: HeroEquipType) => {
  switch (type) {
    case Type.STR: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT1StrWeapon; }
        case HeroEquipType.Head: { return equipT1StrHead; }
        case HeroEquipType.Chest: { return equipT1StrChest; }
        case HeroEquipType.Feet: { return equipT1StrFeet; }
        default: { return ''; }
      }
    }
    case Type.DEX: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT1DexWeapon; }
        case HeroEquipType.Head: { return equipT1DexHead; }
        case HeroEquipType.Chest: { return equipT1DexChest; }
        case HeroEquipType.Feet: { return equipT1DexFeet; }
        default: { return ''; }
      }
    }
    case Type.INT: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT1IntWeapon; }
        case HeroEquipType.Head: { return equipT1IntHead; }
        case HeroEquipType.Chest: { return equipT1IntChest; }
        case HeroEquipType.Feet: { return equipT1IntFeet; }
        default: { return ''; }
      }
    }
  }
  return '';
};
const loadEquipmentT2 = (type: Type, equipType: HeroEquipType) => {
  switch (type) {
    case Type.STR: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT2StrWeapon; }
        case HeroEquipType.Head: { return equipT2StrHead; }
        case HeroEquipType.Chest: { return equipT2StrChest; }
        case HeroEquipType.Feet: { return equipT2StrFeet; }
        default: { return ''; }
      }
    }
    case Type.DEX: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT2DexWeapon; }
        case HeroEquipType.Head: { return equipT2DexHead; }
        case HeroEquipType.Chest: { return equipT2DexChest; }
        case HeroEquipType.Feet: { return equipT2DexFeet; }
        default: { return ''; }
      }
    }
    case Type.INT: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT2IntWeapon; }
        case HeroEquipType.Head: { return equipT2IntHead; }
        case HeroEquipType.Chest: { return equipT2IntChest; }
        case HeroEquipType.Feet: { return equipT2IntFeet; }
        default: { return ''; }
      }
    }
  }
  return '';
};
const loadEquipmentT3 = (type: Type, equipType: HeroEquipType) => {
  switch (type) {
    case Type.STR: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT3StrWeapon; }
        case HeroEquipType.Head: { return equipT3StrHead; }
        case HeroEquipType.Chest: { return equipT3StrChest; }
        case HeroEquipType.Feet: { return equipT3StrFeet; }
        default: { return ''; }
      }
    }
    case Type.DEX: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT3DexWeapon; }
        case HeroEquipType.Head: { return equipT3DexHead; }
        case HeroEquipType.Chest: { return equipT3DexChest; }
        case HeroEquipType.Feet: { return equipT3DexFeet; }
        default: { return ''; }
      }
    }
    case Type.INT: {
      switch (equipType) {
        case HeroEquipType.Weapon: { return equipT3IntWeapon; }
        case HeroEquipType.Head: { return equipT3IntHead; }
        case HeroEquipType.Chest: { return equipT3IntChest; }
        case HeroEquipType.Feet: { return equipT3IntFeet; }
        default: { return ''; }
      }
    }
  }
  return '';
};

// Load Functions
const loadEmblemsImage = (type: Ascension, faction: Faction = Faction.None) => {
  switch (type) {
    case Ascension.Elite: { return eliteEmblem; }
    case Ascension.Legendary: { return legendaryEmblem; }
    case Ascension.Mythic: {
      switch (faction) {
        case Faction.None: { return mythicEmblem; }
        case Faction.Lightbearer: { return mythicLightbearerEmblem; }
        case Faction.Mauler: { return mythicMaulerEmblem; }
        case Faction.Wilder: { return mythicWilderEmblem; }
        case Faction.Graveborn: { return mythicGravebornEmblem; }
        case Faction.Celestial: { return mythicCelestialEmblem; }
        case Faction.Hypogean: { return mythicHypogeanEmblem; }
        case Faction.Dimensional: { return mythicDimensionalEmblem; }
      }
    }
  }
  return '';
};

const loadEquipmentTierImage = (tier: number, type: Type, equipType: HeroEquipType) => {
  switch (tier) {
    case -1: { return loadEquipmentNotAcquired(type, equipType); }
    case 0: { return loadEquipmentT0(type, equipType); }
    case 1: { return loadEquipmentT1(type, equipType); }
    case 2: { return loadEquipmentT2(type, equipType); }
    case 3: { return loadEquipmentT3(type, equipType); }
  }
  return '';
};

const loadAscensionImage = (option: Ascension) => {
  switch (option) {
    case Ascension.None: { return none; }
    case Ascension.Elite: { return elite; }
    case Ascension.ElitePlus: { return elitePlus; }
    case Ascension.Legendary: { return legendary; }
    case Ascension.LegendaryPlus: { return legendaryPlus; }
    case Ascension.Mythic: { return mythic; }
    case Ascension.MythicPlus: { return mythicPlus; }
    case Ascension.Ascended: { return ascended; }
    case Ascension.Ascended1Star: { return ascended1Star; }
    case Ascension.Ascended2Star: { return ascended2Stars; }
    case Ascension.Ascended3Star: { return ascended3Stars; }
    case Ascension.Ascended4Star: { return ascended4Stars; }
    case Ascension.Ascended5Star: { return ascended5Stars; }
  }
  return '';
};

const loadFactionImage = (option: Faction) => {
  switch (option) {
    case Faction.Lightbearer: { return lightbearer; }
    case Faction.Mauler: { return mauler; }
    case Faction.Wilder: { return wilder; }
    case Faction.Graveborn: { return graveborn; }
    case Faction.Celestial: { return celestial; }
    case Faction.Hypogean: { return hypogean; }
    case Faction.Dimensional: { return dimensional; }
  }
  return '';
};

const loadGroupImage = (option: Group) => {
  switch (option) {
    case Group.Support: { return support; }
    case Group.Mage: { return mage; }
    case Group.Warrior: { return warrior; }
    case Group.Tank: { return tank; }
    case Group.Ranger: { return ranger; }
  }
  return '';
};

const loadRoleImage = (option: Role) => {
  switch (option) {
    case Role.AoE: { return roleAoe; }
    case Role.Assassin: { return roleAssassin; }
    case Role.Buffer: { return roleBuffer; }
    case Role.BurstDamage: { return roleBurstDamage; }
    case Role.ContinuousDamage: { return roleContinuousDamage; }
    case Role.Control: { return roleControl; }
    case Role.Debuffer: { return roleDebuffer; }
    case Role.Regeneration: { return roleRegeneration; }
    case Role.Tank: { return roleTank; }
  }
  return '';
};

const loadTypeImage = (option: Type) => {
  switch (option) {
    case Type.STR: { return str; }
    case Type.INT: { return int; }
    case Type.DEX: { return dex; }
  }
  return '';
};

// Export
export {
  loadEquipmentTierImage,
  loadEmblemsImage,
  loadAscensionImage,
  loadFactionImage,
  loadGroupImage,
  loadRoleImage,
  loadTypeImage,
};
