import PodiumPosition from '~/application/domain/ranking/podiumPosition';
import User from '~/application/domain/user/user';
import Ladder from '~/application/domain/ladder/ladder';

export default class Podium {
  title: string;
  total: number;
  positions: Array<PodiumPosition>;

  constructor(title: string, total: number = 0, positions: Array<PodiumPosition> = []) {
    this.title = title;
    this.total = total;
    this.positions = positions;
  }
}

export interface PodiumTemp {
  player: User;
  ladder?: Ladder;
}
