import User from '~/application/domain/user/user';

export default class PodiumPosition {
  players: Array<User>;
  value: number;

  constructor(players: Array<User> = [], value = 0) {
    this.players = players;
    this.value = value;
  }
}
