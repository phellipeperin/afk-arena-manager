import HeroObjectiveCompareItem from '~/application/domain/objectives/heroObjectiveCompareItem';
import HeroObjectiveMissingResources from '~/application/domain/objectives/heroObjectiveMissingResources';

export default class HeroObjectiveCompare {
  items: Array<HeroObjectiveCompareItem>;
  totalResourcesNeeded: HeroObjectiveMissingResources;

  constructor(items: Array<HeroObjectiveCompareItem>, totalResourcesNeeded: HeroObjectiveMissingResources) {
    this.items = items;
    this.totalResourcesNeeded = totalResourcesNeeded;
  }
}
