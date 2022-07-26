import LadderItem from '~/application/domain/ladder/ladderItem';
import { Division } from '~/application/domain/info/division';

export default class LadderDivisionItem extends LadderItem {
  division: Division;

  constructor(division: Division) {
    super();
    this.division = division;
  }
};
