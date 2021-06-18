// Domain Imports
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';

// Image Imports
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

// Load Functions
const loadAscensionImage = (option: Ascension) => {
  switch (option) {
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
  return ''; // TODO none
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
  loadAscensionImage,
  loadFactionImage,
  loadGroupImage,
  loadRoleImage,
  loadTypeImage,
};
