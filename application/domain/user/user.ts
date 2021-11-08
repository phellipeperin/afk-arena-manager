import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import Resources from '~/application/domain/resources/resources';

export type UserRole = 'ADMIN' | 'PLAYER' | 'PREMIUM';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;
  systemInfo: UserSystemInfo;
  friends: Array<string>;
  resources: Resources;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
    this.systemInfo = new UserSystemInfo();
    this.friends = [];
    this.resources = new Resources();
  }
}
