import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserGameInfo from '~/application/domain/user/userGameInfo';
import UserProgressInfo from '~/application/domain/user/userProgressInfo';

export type UserRole = 'ADMIN' | 'PLAYER';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;
  systemInfo: UserSystemInfo;
  gameInfo: UserGameInfo;
  progressInfo: UserProgressInfo;
  friends: Array<string>;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
    this.systemInfo = new UserSystemInfo();
    this.gameInfo = new UserGameInfo();
    this.progressInfo = new UserProgressInfo();
    this.friends = [];
  }
}
