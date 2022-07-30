import Hero from '~/application/domain/hero/hero';
import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonResult from '~/application/domain/summon/summonResult';
import SummonResultHero from '~/application/domain/summon/summonResultHero';
import { Faction } from '~/application/domain/info/faction';

const getSummonedNoOfCopies = (hero: Hero, pulls: SummonPulls): number => {
  let copies = 0;
  if (hero.gameInfo.awakened) {
    copies += pulls.normal.awakened.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.faction.awakened.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.companion.awakened.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stones.awakened.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stargazer.awakened.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.timeTemple.awakened.filter((heroId: string) => heroId === hero.id).length;
  } else if (hero.gameInfo.faction === Faction.Lightbearer || hero.gameInfo.faction === Faction.Mauler || hero.gameInfo.faction === Faction.Wilder || hero.gameInfo.faction === Faction.Graveborn) {
    copies += pulls.normal.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.faction.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.companion.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stones.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.heroChoice.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stargazer.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.timeTemple.normal.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.cards.cardHero.filter((heroId: string) => heroId === hero.id).length;
  } else if (hero.gameInfo.faction === Faction.Celestial || hero.gameInfo.faction === Faction.Hypogean) {
    copies += pulls.normal.celepogean.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.faction.celepogean.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.companion.celepogean.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stones.celepogean.filter((heroId: string) => heroId === hero.id).length;
    copies += pulls.stargazer.celepogean.filter((heroId: string) => heroId === hero.id).length;
  }
  return copies;
};

const getSummonedNoFurniture = (hero: Hero, pulls: SummonPulls): number => {
  let copies = 0;
  copies += pulls.furniture.mythicFurniture.filter((heroId: string) => heroId === hero.id).length;
  copies += pulls.cards.cardFurniture.filter((heroId: string) => heroId === hero.id).length;
  return copies;
};

const generateSummonResult = (pulls: SummonPulls, currentPlayerHeroes: Array<Hero>): SummonResult => {
  const result = new SummonResult();
  currentPlayerHeroes.forEach((currentHero: Hero) => {
    const summonedNoCopies = getSummonedNoOfCopies(currentHero, pulls);
    const summonedNoFurniture = getSummonedNoFurniture(currentHero, pulls);
    if (summonedNoCopies || summonedNoFurniture) {
      const newHero: Hero = JSON.parse(JSON.stringify(currentHero)) as Hero;
      const changes: Array<string> = [];

      // TODO

      result.items.push(new SummonResultHero(currentHero, newHero));
    }
  });
  return result;
};

export {
  generateSummonResult,
};
