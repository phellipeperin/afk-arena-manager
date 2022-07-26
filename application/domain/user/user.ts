import UserSystemInfo from '~/application/domain/user/userSystemInfo';
import UserSystemSettings from '~/application/domain/user/userSystemSettings';
import Resources from '~/application/domain/resources/resources';

export type UserRole = 'ADMIN' | 'PLAYER' | 'PREMIUM';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;
  systemInfo: UserSystemInfo;
  systemSettings: UserSystemSettings;
  friends: Array<string>;
  groups: Array<string>;
  resources: Resources;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
    this.systemInfo = new UserSystemInfo();
    this.systemSettings = new UserSystemSettings();
    this.friends = [];
    this.groups = [];
    this.resources = new Resources();
  }
}
