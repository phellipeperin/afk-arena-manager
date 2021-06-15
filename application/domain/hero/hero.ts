import HeroGameInfo from './hero-game-info';
import HeroPlayerInfo from './hero-player-info';

export default class Hero {
  id: string;
  gameInfo: HeroGameInfo;
  playerInfo: HeroPlayerInfo;

  constructor(id: string = '', gameInfo: HeroGameInfo = new HeroGameInfo(), playerInfo: HeroPlayerInfo = new HeroPlayerInfo()) {
    this.id = id;
    this.gameInfo = gameInfo;
    this.playerInfo = playerInfo;
  }
}
