import Hero from '~/application/domain/hero/hero';

export default class SnapshotHeroDiff {
  hero: Hero;

  constructor(
    hero: Hero = new Hero(),
  ) {
    this.hero = hero;
  }
}
