import LadderItem from '~/application/domain/ladder/ladderItem';
import { Role } from '~/application/domain/info/role';

export default class LadderRoleItem extends LadderItem {
  role: Role;

  constructor(role: Role) {
    super();
    this.role = role;
  }
};
