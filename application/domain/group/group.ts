import GroupMember from './groupMember';

export default class Group {
  id: string;
  name: string;
  image: string;
  members: Array<GroupMember>;

  constructor(name: string = '', image: string = '', members: Array<GroupMember> = []) {
    this.id = '';
    this.name = name;
    this.image = image;
    this.members = members;
  }
}
