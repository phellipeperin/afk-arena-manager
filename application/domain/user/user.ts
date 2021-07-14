import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserGameInfo from '~/application/domain/user/userGameInfo';

export type UserRole = 'ADMIN' | 'PLAYER';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;
  systemInfo: UserSystemInfo;
  gameInfo: UserGameInfo;
  friends: Array<string>;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
    this.systemInfo = new UserSystemInfo();
    this.gameInfo = new UserGameInfo();
    this.friends = [];
  }
}
