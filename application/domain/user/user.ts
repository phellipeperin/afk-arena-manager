export type UserRole = 'ADMIN' | 'PLAYER';

export default class User {
  id: string;
  email: string;
  roles: Array<UserRole>;

  constructor() {
    this.id = '';
    this.email = '';
    this.roles = [];
  }
}
