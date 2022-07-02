import Hero from '~/application/domain/hero/hero';
import HeroObjectiveMissingResources from '~/application/domain/objectives/heroObjectiveMissingResources';

export default class HeroObjectiveCompare {
  playerHero: Hero;
  objectiveHero: Hero;
  differenceInfo: Array<string>;
  resourcesNeeded: HeroObjectiveMissingResources;

  constructor(playerHero: Hero, objectiveHero: Hero, differenceInfo: Array<string>, resourcesNeeded: HeroObjectiveMissingResources) {
    this.playerHero = playerHero;
    this.objectiveHero = objectiveHero;
    this.differenceInfo = differenceInfo;
    this.resourcesNeeded = resourcesNeeded;
  }
}
