import PodiumPosition from '~/application/domain/ranking/podiumPosition';
import User from '~/application/domain/user/user';
import Ladder from '~/application/domain/ladder/ladder';

export default class Podium {
  first: PodiumPosition;
  second: PodiumPosition;
  third: PodiumPosition;

  constructor(first?: PodiumPosition, second?: PodiumPosition, third?: PodiumPosition) {
    this.first = first || new PodiumPosition();
    this.second = second || new PodiumPosition();
    this.third = third || new PodiumPosition();
  }
}

export interface LadderPodiumTemp {
  player: User;
  ladder: Ladder;
}
