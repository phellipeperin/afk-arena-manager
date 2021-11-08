import LadderItem from '~/application/domain/ladder/ladderItem';

export default class Ladder {
  faction: Array<LadderItem>;
  group: Array<LadderItem>;
  type: Array<LadderItem>;
  role: Array<LadderItem>;

  constructor(
    faction: Array<LadderItem> = [],
    group: Array<LadderItem> = [],
    type: Array<LadderItem> = [],
    role: Array<LadderItem> = [],
  ) {
    this.total = total;
    this.faction = faction;
    this.group = group;
    this.type = type;
    this.role = role;
  }
};
