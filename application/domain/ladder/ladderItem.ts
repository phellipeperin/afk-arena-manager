import LadderItemPosition from '~/application/domain/ladder/ladderItemPosition';

export default abstract class LadderItem {
  totalPossible: number = 0;
  positions: Array<LadderItemPosition> = [];
};
