import User from '~/application/domain/user/user';
import Hero from '~/application/domain/hero/hero';

export default class UserHeroList {
  user: User;
  heroList: Array<Hero>;

  constructor(user: User, heroList: Array<Hero>) {
    this.user = user;
    this.heroList = heroList;
  }
}
