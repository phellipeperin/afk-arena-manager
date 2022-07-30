import SummonResultHero from '~/application/domain/summon/summonResultHero';

export default class SummonResult {
  items: Array<SummonResultHero>;

  constructor(items: Array<SummonResultHero> = []) {
    this.items = items;
  }
}
