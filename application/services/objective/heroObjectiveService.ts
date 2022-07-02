import Hero from '~/application/domain/hero/hero';
import HeroObjectiveCompare from '~/application/domain/objectives/heroObjectiveCompare';
import HeroObjectiveMissingResources from '~/application/domain/objectives/heroObjectiveMissingResources';

const getHeroObjectiveDifferences = (playerHeroList: Array<Hero>, objectiveHeroList: Array<Hero>): Array<HeroObjectiveCompare> => {
  const list: Array<HeroObjectiveCompare> = [];
  playerHeroList.forEach((playerHero: Hero) => {
    const objectiveHero = objectiveHeroList.find((hero: Hero) => hero.id === playerHero.id) || new Hero();
    list.push(new HeroObjectiveCompare(playerHero, objectiveHero, [], new HeroObjectiveMissingResources()));
  });
  console.log(list);
  return list;
};

export {
  getHeroObjectiveDifferences,
};
