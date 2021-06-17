// Domain Imports
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';

// Load Functions
const loadAscensionLabel = (option: Ascension): string => {
  switch (option) {
    case Ascension.Elite: { return 'Elite'; }
    case Ascension.Legendary: { return 'Legendary'; }
    case Ascension.Mythic: { return 'Mythic'; }
    case Ascension.Ascended: { return 'Ascended'; }
  }
  return '';
};

const loadFactionLabel = (option: Faction): string => {
  switch (option) {
    case Faction.Lightbearer: { return 'Lightbearer'; }
    case Faction.Mauler: { return 'Mauler'; }
    case Faction.Wilder: { return 'Wilder'; }
    case Faction.Graveborn: { return 'Graveborn'; }
    case Faction.Celestial: { return 'Celestial'; }
    case Faction.Hypogean: { return 'Hypogean'; }
    case Faction.Dimensional: { return 'Dimensional'; }
  }
  return ''; // TODO none
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

// Export
export {
  loadAscensionLabel,
  loadFactionLabel,
  loadGroupLabel,
  loadRoleLabel,
  loadTypeLabel,
};
