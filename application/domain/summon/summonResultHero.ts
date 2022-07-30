import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';

export default class SummonResultHero {
  currentHero: Hero;
  finalHero: Hero;
  possibleAscensions: Array<Ascension>;
  changes: Array<string>;

  constructor(
    currentHero: Hero,
    finalHero: Hero,
    possibleAscensions: Array<Ascension> = [],
    changes: Array<string> = [],
  ) {
    this.currentHero = currentHero;
    this.finalHero = finalHero;
    this.possibleAscensions = possibleAscensions;
    this.changes = changes;
  }
}
