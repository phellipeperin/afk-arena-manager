import PodiumPosition from '~/application/domain/ranking/podiumPosition';

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
