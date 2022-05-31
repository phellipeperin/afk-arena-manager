import { Faction } from '../info/faction';
import { Type } from '../info/type';
import { Group } from '../info/group';
import { Role } from '../info/role';

export default class HeroGameInfo {
  name: string;
  title: string;
  awakened: boolean;
  faction: Faction;
  type: Type;
  group: Group;
  role: Role;

  constructor() {
    this.name = '';
    this.title = '';
    this.awakened = false;
    this.faction = Faction.Lightbearer;
    this.type = Type.STR;
    this.group = Group.Support;
    this.role = Role.AoE;
  }
}
