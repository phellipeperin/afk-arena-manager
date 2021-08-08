import Hero from '~/application/domain/hero/hero';

export default class SnapshotHeroDiff {
  hero: Hero;
  diffList: Array<string> = [];

  constructor(hero: Hero = new Hero()) {
    this.hero = hero;
  }

  public addDifference(diff: string): void {
    this.diffList.push(diff);
  }

  public hasAnyDifference(): boolean {
    return !!this.diffList.length;
  }
}
