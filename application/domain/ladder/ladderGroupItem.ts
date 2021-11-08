import LadderItem from '~/application/domain/ladder/ladderItem';
import { Group } from '~/application/domain/info/group';

export default class LadderGroupItem extends LadderItem {
  group: Group;

  constructor(group: Group) {
    super();
    this.group = group;
  }
};
