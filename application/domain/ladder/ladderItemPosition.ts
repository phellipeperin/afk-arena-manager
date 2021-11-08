import User from '~/application/domain/user/user';

export default class LadderItemPosition {
  amount: number;
  users: Array<User>;

  constructor(amount: number = 0, users: Array<User> = []) {
    this.amount = amount;
    this.users = users;
  }
};
