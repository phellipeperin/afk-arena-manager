import LadderItem from '~/application/domain/ladder/ladderItem';
import { Type } from '~/application/domain/info/type';

export default class LadderTypeItem extends LadderItem {
  type: Type;

  constructor(type: Type) {
    super();
    this.type = type;
  }
};
