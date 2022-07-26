import { Faction } from '../info/faction';
import { Type } from '../info/type';
import { Division } from '../info/division';
import { Role } from '../info/role';

export default class HeroGameInfo {
  name: string;
  title: string;
  awakened: boolean;
  faction: Faction;
  type: Type;
  division: Division;
  role: Role;

  constructor() {
    this.name = '';
    this.title = '';
    this.awakened = false;
    this.faction = Faction.Lightbearer;
    this.type = Type.STR;
    this.division = Division.Support;
    this.role = Role.AoE;
  }
}
