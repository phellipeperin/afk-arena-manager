export default class HeroSkin {
  id: string;
  name: string;
  profileImage: string;

  constructor(id: string = '', name: string = '', profileImage: string = '') {
    this.id = id;
    this.name = name;
    this.profileImage = profileImage;
  }
}
