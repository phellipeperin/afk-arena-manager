import { Faction } from '../info/faction';
import { Type } from '../info/type';
import { Group } from '../info/group';
import { Role } from '../info/role';
import HeroSkin from './hero-skin';

interface HeroGameImages {
  profile: string;
  banner: string;
}

export default class HeroGameInfo {
  name: string;
  title: string;
  faction: Faction;
  type: Type;
  group: Group;
  role: Role;
  images: HeroGameImages;
  skins: Array<HeroSkin>;

  // name: string = '', title: string = '', faction: Faction, type: Type, group: Group, role: Role, images: HeroGameImages
  constructor() {
    this.name = '';
    this.title = '';
    this.faction = Faction.Lightbearer;
    this.type = Type.STR;
    this.group = Group.Support;
    this.role = Role.AoE;
    this.images = {
      profile: '',
      banner: '',
    };
    this.skins = [];
  }
}
