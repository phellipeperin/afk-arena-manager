import LadderItemPosition from '~/application/domain/ladder/ladderItemPosition';

export default class LadderItem {
  totalPossible: number = 0;
  positions: Array<LadderItemPosition> = [];
};
