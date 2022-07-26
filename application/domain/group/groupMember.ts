import User from '~/application/domain/user/user';

export type GroupMemberRole = 'ADMIN' | 'MEMBER';

export default class GroupMember {
  id: string;
  role: GroupMemberRole;

  constructor(id: string = '', role: GroupMemberRole = 'MEMBER') {
    this.id = id;
    this.role = role;
  }
}

export interface GroupMemberUser {
  id: string;
  role: GroupMemberRole;
  user: User;
}
