import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserGameInfo from '~/application/domain/user/userGameInfo';
import Resources from '~/application/domain/resources/resources';

export type UserRole = 'ADMIN' | 'PLAYER' | 'PREMIUM';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;
  systemInfo: UserSystemInfo;
  gameInfo: UserGameInfo;
  friends: Array<string>;
  resources: Resources;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
    this.systemInfo = new UserSystemInfo();
    this.gameInfo = new UserGameInfo();
    this.friends = [];
    this.resources = new Resources();
  }
}
