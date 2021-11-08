import LadderFactionItem from '~/application/domain/ladder/ladderFactionItem';
import LadderGroupItem from '~/application/domain/ladder/ladderGroupItem';
import LadderTypeItem from '~/application/domain/ladder/ladderTypeItem';
import LadderRoleItem from '~/application/domain/ladder/ladderRoleItem';

export default class Ladder {
  faction: Array<LadderFactionItem>;
  group: Array<LadderGroupItem>;
  type: Array<LadderTypeItem>;
  role: Array<LadderRoleItem>;

  constructor(
    faction: Array<LadderFactionItem> = [],
    group: Array<LadderGroupItem> = [],
    type: Array<LadderTypeItem> = [],
    role: Array<LadderRoleItem> = [],
  ) {
    this.faction = faction;
    this.group = group;
    this.type = type;
    this.role = role;
  }
};
