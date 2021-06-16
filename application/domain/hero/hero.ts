import HeroGameInfo from './hero-game-info';
import HeroSystemInfo from './hero-system-info';
import HeroPlayerInfo from './hero-player-info';

export default class Hero {
  id: string;
  gameInfo: HeroGameInfo;
  systemInfo: HeroSystemInfo;
  playerInfo: HeroPlayerInfo;

  constructor(
    id: string = '',
    gameInfo: HeroGameInfo = new HeroGameInfo(),
    systemInfo: HeroSystemInfo = new HeroSystemInfo(),
    playerInfo: HeroPlayerInfo = new HeroPlayerInfo(),
  ) {
    this.id = id;
    this.gameInfo = gameInfo;
    this.systemInfo = systemInfo;
    this.playerInfo = playerInfo;
  }
}
