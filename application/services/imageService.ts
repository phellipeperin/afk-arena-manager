// Domain Imports
import { Ascension } from '~/application/domain/info/ascension';
import { Engrave } from '~/application/domain/info/engrave';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';
import { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { Artifact } from '~/application/domain/resources/resourceArtifact';

// Equip Image Imports
const equipNotAcquiredStrWeapon = require('~/assets/images/items/equipment/none/str/weapon.jpg');
const equipNotAcquiredStrHead = require('~/assets/images/items/equipment/none/str/head.jpg');
const equipNotAcquiredStrChest = require('~/assets/images/items/equipment/none/str/chest.jpg');
const equipNotAcquiredStrFeet = require('~/assets/images/items/equipment/none/str/feet.jpg');
const equipNotAcquiredDexWeapon = require('~/assets/images/items/equipment/none/dex/weapon.jpg');
const equipNotAcquiredDexHead = require('~/assets/images/items/equipment/none/dex/head.jpg');
const equipNotAcquiredDexChest = require('~/assets/images/items/equipment/none/dex/chest.jpg');
const equipNotAcquiredDexFeet = require('~/assets/images/items/equipment/none/dex/feet.jpg');
const equipNotAcquiredIntWeapon = require('~/assets/images/items/equipment/none/int/weapon.jpg');
const equipNotAcquiredIntHead = require('~/assets/images/items/equipment/none/int/head.jpg');
const equipNotAcquiredIntChest = require('~/assets/images/items/equipment/none/int/chest.jpg');
const equipNotAcquiredIntFeet = require('~/assets/images/items/equipment/none/int/feet.jpg');

const equipT0StrWeapon = require('~/assets/images/items/equipment/t0/str/weapon.jpg');
const equipT0StrHead = require('~/assets/images/items/equipment/t0/str/head.jpg');
const equipT0StrChest = require('~/assets/images/items/equipment/t0/str/chest.jpg');
const equipT0StrFeet = require('~/assets/images/items/equipment/t0/str/feet.jpg');
const equipT0DexWeapon = require('~/assets/images/items/equipment/t0/dex/weapon.jpg');
const equipT0DexHead = require('~/assets/images/items/equipment/t0/dex/head.jpg');
const equipT0DexChest = require('~/assets/images/items/equipment/t0/dex/chest.jpg');
const equipT0DexFeet = require('~/assets/images/items/equipment/t0/dex/feet.jpg');
const equipT0IntWeapon = require('~/assets/images/items/equipment/t0/int/weapon.jpg');
const equipT0IntHead = require('~/assets/images/items/equipment/t0/int/head.jpg');
const equipT0IntChest = require('~/assets/images/items/equipment/t0/int/chest.jpg');
const equipT0IntFeet = require('~/assets/images/items/equipment/t0/int/feet.jpg');

const equipT1StrWeapon = require('~/assets/images/items/equipment/t1/str/weapon.jpg');
const equipT1StrHead = require('~/assets/images/items/equipment/t1/str/head.jpg');
const equipT1StrChest = require('~/assets/images/items/equipment/t1/str/chest.jpg');
const equipT1StrFeet = require('~/assets/images/items/equipment/t1/str/feet.jpg');
const equipT1DexWeapon = require('~/assets/images/items/equipment/t1/dex/weapon.jpg');
const equipT1DexHead = require('~/assets/images/items/equipment/t1/dex/head.jpg');
const equipT1DexChest = require('~/assets/images/items/equipment/t1/dex/chest.jpg');
const equipT1DexFeet = require('~/assets/images/items/equipment/t1/dex/feet.jpg');
const equipT1IntWeapon = require('~/assets/images/items/equipment/t1/int/weapon.jpg');
const equipT1IntHead = require('~/assets/images/items/equipment/t1/int/head.jpg');
const equipT1IntChest = require('~/assets/images/items/equipment/t1/int/chest.jpg');
const equipT1IntFeet = require('~/assets/images/items/equipment/t1/int/feet.jpg');

const equipT2StrWeapon = require('~/assets/images/items/equipment/t2/str/weapon.jpg');
const equipT2StrHead = require('~/assets/images/items/equipment/t2/str/head.jpg');
const equipT2StrChest = require('~/assets/images/items/equipment/t2/str/chest.jpg');
const equipT2StrFeet = require('~/assets/images/items/equipment/t2/str/feet.jpg');
const equipT2DexWeapon = require('~/assets/images/items/equipment/t2/dex/weapon.jpg');
const equipT2DexHead = require('~/assets/images/items/equipment/t2/dex/head.jpg');
const equipT2DexChest = require('~/assets/images/items/equipment/t2/dex/chest.jpg');
const equipT2DexFeet = require('~/assets/images/items/equipment/t2/dex/feet.jpg');
const equipT2IntWeapon = require('~/assets/images/items/equipment/t2/int/weapon.jpg');
const equipT2IntHead = require('~/assets/images/items/equipment/t2/int/head.jpg');
const equipT2IntChest = require('~/assets/images/items/equipment/t2/int/chest.jpg');
const equipT2IntFeet = require('~/assets/images/items/equipment/t2/int/feet.jpg');

const equipT3StrWeapon = require('~/assets/images/items/equipment/t3/str/weapon.jpg');
const equipT3StrHead = require('~/assets/images/items/equipment/t3/str/head.jpg');
const equipT3StrChest = require('~/assets/images/items/equipment/t3/str/chest.jpg');
const equipT3StrFeet = require('~/assets/images/items/equipment/t3/str/feet.jpg');
const equipT3DexWeapon = require('~/assets/images/items/equipment/t3/dex/weapon.jpg');
const equipT3DexHead = require('~/assets/images/items/equipment/t3/dex/head.jpg');
const equipT3DexChest = require('~/assets/images/items/equipment/t3/dex/chest.jpg');
const equipT3DexFeet = require('~/assets/images/items/equipment/t3/dex/feet.jpg');
const equipT3IntWeapon = require('~/assets/images/items/equipment/t3/int/weapon.jpg');
const equipT3IntHead = require('~/assets/images/items/equipment/t3/int/head.jpg');
const equipT3IntChest = require('~/assets/images/items/equipment/t3/int/chest.jpg');
const equipT3IntFeet = require('~/assets/images/items/equipment/t3/int/feet.jpg');

// Image Imports
const artifactDurasBlade = require('~/assets/images/items/artifact/Duras_Blade_2.jpg');
const artifactDurasCall = require('~/assets/images/items/artifact/Duras_Call.jpg');
const artifactDurasChalice = require('~/assets/images/items/artifact/Duras_Chalice.jpg');
const artifactDurasConviction = require('~/assets/images/items/artifact/Duras_Conviction.jpg');
const artifactDurasDrape = require('~/assets/images/items/artifact/Duras_Drape.jpg');
const artifactDurasEye = require('~/assets/images/items/artifact/Duras_Eye.jpg');
const artifactDurasGrace = require('~/assets/images/items/artifact/Duras_Grace.jpg');
const artifactTidebearer = require('~/assets/images/items/artifact/Tidebearer.jpg');
const artifactSeraphicTide = require('~/assets/images/items/artifact/Seraphic_Tide.jpg');
const artifactOceanicStrings = require('~/assets/images/items/artifact/The_Oceanic_Strings.jpg');
const artifactWindBinder = require('~/assets/images/items/artifact/Windbinder.jpg');
const artifactWardenArcane = require('~/assets/images/items/artifact/Warden_of_the_Arcane.jpg');
const artifactWingedWarden = require('~/assets/images/items/artifact/Winged_Warden.jpg');
const artifactChaosBringer = require('~/assets/images/items/artifact/Chaos_Bringer.jpg');
const artifactCarnage = require('~/assets/images/items/artifact/Carnage.jpg');
const artifactPauldronBurningFury = require('~/assets/images/items/artifact/Pauldron_of_Burning_Fury.jpg');
const artifactBarricade = require('~/assets/images/items/artifact/The_Barricade.jpg');
const artifactWaistbandResilience = require('~/assets/images/items/artifact/Waistband_of_Resilience.jpg');
const artifactLifesLimit = require('~/assets/images/items/artifact/Lifes_Limit.jpg');
const artifactShroudVerdure = require('~/assets/images/items/artifact/Shroud_of_Verdure.jpg');
const artifactVerdantLongbow = require('~/assets/images/items/artifact/Verdant_Longbow.jpg');
const artifactDualDivinity = require('~/assets/images/items/artifact/Dual_Divinity.jpg');

const eliteEmblem = require('~/assets/images/items/emblem/emblem-elite.png');
const legendaryEmblem = require('~/assets/images/items/emblem/emblem-legendary.png');
const mythicEmblem = require('~/assets/images/items/emblem/emblem-mythic.jpg');
const mythicLightbearerEmblem = require('~/assets/images/items/emblem/emblem-mythic-lightbearer.jpg');
const mythicMaulerEmblem = require('~/assets/images/items/emblem/emblem-mythic-mauler.jpg');
const mythicWilderEmblem = require('~/assets/images/items/emblem/emblem-mythic-wilder.jpg');
const mythicGravebornEmblem = require('~/assets/images/items/emblem/emblem-mythic-graveborn.jpg');
const mythicCelestialEmblem = require('~/assets/images/items/emblem/emblem-mythic-celestial.jpg');
const mythicHypogeanEmblem = require('~/assets/images/items/emblem/emblem-mythic-hypogean.jpg');
const mythicDimensionalEmblem = require('~/assets/images/items/emblem/emblem-mythic-dimensional.png');

const elementalShard = require('~/assets/images/items/engrave/elemental-shard.jpg');
const elementalCore = require('~/assets/images/items/engrave/elemental-core.jpg');

const none = require('~/assets/images/icons/ascension/none.png');
const elite = require('~/assets/images/icons/ascension/elite.png');
const elitePlus = require('~/assets/images/icons/ascension/elite_plus.png');
const legendary = require('~/assets/images/icons/ascension/legendary.png');
const legendaryPlus = require('~/assets/images/icons/ascension/legendary_plus.png');
const mythic = require('~/assets/images/icons/ascension/mythic.png');
const mythicPlus = require('~/assets/images/icons/ascension/mythic_plus.png');
const ascended = require('~/assets/images/icons/ascension/ascended.png');
const ascended1Star = require('~/assets/images/icons/ascension/ascended_1.png');
const ascended2Stars = require('~/assets/images/icons/ascension/ascended_2.png');
const ascended3Stars = require('~/assets/images/icons/ascension/ascended_3.png');
const ascended4Stars = require('~/assets/images/icons/ascension/ascended_4.png');
const ascended5Stars = require('~/assets/images/icons/ascension/ascended_5.png');

const lightbearer = require('~/assets/images/icons/faction/lightbearer.png');
const mauler = require('~/assets/images/icons/faction/mauler.png');
const wilder = require('~/assets/images/icons/faction/wilder.png');
const graveborn = require('~/assets/images/icons/faction/graveborn.png');
const celestial = require('~/assets/images/icons/faction/celestial.png');
const hypogean = require('~/assets/images/icons/faction/hypogean.png');
const dimensional = require('~/assets/images/icons/faction/dimensional.png');

const support = require('~/assets/images/icons/group/support.png');
const mage = require('~/assets/images/icons/group/mage.png');
const warrior = require('~/assets/images/icons/group/warrior.png');
const tank = require('~/assets/images/icons/group/tank.png');
const ranger = require('~/assets/images/icons/group/ranger.png');

const roleAoe = require('~/assets/images/icons/role/aoe.png');
const roleAssassin = require('~/assets/images/icons/role/assassin.png');
const roleBuffer = require('~/assets/images/icons/role/buffer.png');
const roleBurstDamage = require('~/assets/images/icons/role/burst_damage.png');
const roleContinuousDamage = require('~/assets/images/icons/role/continuous_damage.png');
const roleControl = require('~/assets/images/icons/role/control.png');
const roleDebuffer = require('~/assets/images/icons/role/debuffer.png');
const roleRegeneration = require('~/assets/images/icons/role/regeneration.png');
const roleTank = require('~/assets/images/icons/role/tank.png');

const str = require('~/assets/images/icons/type/str.png');
const int = require('~/assets/images/icons/type/int.png');
const dex = require('~/assets/images/icons/type/dex.png');

const poeCoin = require('~/assets/images/items/resources/poe_coin.jpg');
const twistedEssence = require('~/assets/images/items/resources/twisted_essence.jpg');
const droplets = require('~/assets/images/items/resources/flawless_drop.jpg');

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
const loadArtifactImage = (artifact: Artifact) => {
  switch (artifact) {
    case Artifact.DURAS_BLADE: { return artifactDurasBlade; }
    case Artifact.DURAS_CALL: { return artifactDurasCall; }
    case Artifact.DURAS_CHALICE: { return artifactDurasChalice; }
    case Artifact.DURAS_CONVICTION: { return artifactDurasConviction; }
    case Artifact.DURAS_DRAPE: { return artifactDurasDrape; }
    case Artifact.DURAS_EYE: { return artifactDurasEye; }
    case Artifact.DURAS_GRACE: { return artifactDurasGrace; }

    case Artifact.TIDEBEARER: { return artifactTidebearer; }
    case Artifact.SERAPHIC_TIDE: { return artifactSeraphicTide; }
    case Artifact.OCEANIC_STRINGS: { return artifactOceanicStrings; }

    case Artifact.WIND_BINDER: { return artifactWindBinder; }
    case Artifact.WARDEN_ARCANE: { return artifactWardenArcane; }
    case Artifact.WINDEG_WARDEN: { return artifactWingedWarden; }

    case Artifact.CHAOS_BRINGER: { return artifactChaosBringer; }
    case Artifact.CARNAGE: { return artifactCarnage; }
    case Artifact.PAULDRON_BURNING_FURY: { return artifactPauldronBurningFury; }

    case Artifact.BARRICADE: { return artifactBarricade; }
    case Artifact.WAISTBAND_RESILIENCE: { return artifactWaistbandResilience; }
    case Artifact.LIFES_LIMIT: { return artifactLifesLimit; }

    case Artifact.SHROUD_VERDURE: { return artifactShroudVerdure; }
    case Artifact.VERDANT_LONGBOW: { return artifactVerdantLongbow; }
    case Artifact.DUAL_DIVINITY: { return artifactDualDivinity; }
  }
  return '';
};

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

const loadEngraveImage = (engrave: Engrave) => {
  switch (engrave) {
    case Engrave.Shard: { return elementalShard; }
    case Engrave.Core: { return elementalCore; }
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

const loadPoeCoinImage = () => { return poeCoin; };
const loadTwistedEssenceImage = () => { return twistedEssence; };
const loadDropletsImage = () => { return droplets; };

// Export
export {
  loadEquipmentTierImage,
  loadArtifactImage,
  loadEmblemsImage,
  loadEngraveImage,
  loadAscensionImage,
  loadFactionImage,
  loadGroupImage,
  loadRoleImage,
  loadTypeImage,
  loadPoeCoinImage,
  loadTwistedEssenceImage,
  loadDropletsImage,
};
