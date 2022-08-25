import Hero from '~/application/domain/hero/hero';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';
import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonResult from '~/application/domain/summon/summonResult';
import SummonResultHero from '~/application/domain/summon/summonResultHero';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';
import {
  getMaxAscensionByNumberOfCopies,
  getMaxNumberOfCopies,
  getNumberOfEliteSacsNeeded,
} from '~/application/services/resource/resourceAscensionService';
import { copyOtherPlayerInfo } from '~/application/services/hero/heroService';
import { isFurnitureAvailable } from '~/application/services/resource/resourceFurnitureService';

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

const getPossibleAscensions = (faction: Faction, awakened: boolean, oldAscension: Ascension, newAscension: Ascension): Array<Ascension> => {
  const possibleAscensions: Array<Ascension> = [];
  if ((faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) && oldAscension !== newAscension) {
    const sacsAlreadyUsed = getNumberOfEliteSacsNeeded(faction, awakened, oldAscension);
    const sacsNeeded = getNumberOfEliteSacsNeeded(faction, awakened, newAscension);

    if (sacsNeeded > sacsAlreadyUsed) {
      // Max of M+ or higher
      if (sacsNeeded === 20) {
        // Currently on Not Acquired, E or E+
        if (sacsAlreadyUsed === 0) {
          possibleAscensions.push(Ascension.ElitePlus);
          possibleAscensions.push(Ascension.LegendaryPlus);
          possibleAscensions.push(Ascension.Mythic);
          possibleAscensions.push(newAscension);
        }
        // Currently on L or L+
        if (sacsAlreadyUsed === 4) {
          possibleAscensions.push(Ascension.LegendaryPlus);
          possibleAscensions.push(Ascension.Mythic);
          possibleAscensions.push(newAscension);
        }
        // Currently on M
        if (sacsAlreadyUsed === 12) {
          possibleAscensions.push(Ascension.Mythic);
          possibleAscensions.push(newAscension);
        }
      }
      // Max of L
      if (sacsNeeded === 4) {
        possibleAscensions.push(Ascension.ElitePlus);
        possibleAscensions.push(Ascension.Legendary);
      }
    }
  }
  return possibleAscensions;
};

const generateSummonResult = (pulls: SummonPulls, currentPlayerHeroes: Array<Hero>): SummonResult => {
  const result = new SummonResult();
  currentPlayerHeroes.forEach((currentHero: Hero) => {
    const summonedNoCopies = getSummonedNoOfCopies(currentHero, pulls);
    const summonedNoFurniture = getSummonedNoFurniture(currentHero, pulls);
    if (summonedNoCopies || summonedNoFurniture) {
      const changes: Array<string> = [];
      const newPlayerInfo: HeroPlayerInfo = copyOtherPlayerInfo(currentHero.playerInfo);

      const maxPossibleCopies = getMaxNumberOfCopies(currentHero.gameInfo.faction, currentHero.gameInfo.awakened);
      let newNumberOfCopies = currentHero.playerInfo.numberOfCopies + summonedNoCopies;
      if (newNumberOfCopies > maxPossibleCopies) {
        newNumberOfCopies = maxPossibleCopies;
      }
      newPlayerInfo.numberOfCopies = newNumberOfCopies;
      if (currentHero.playerInfo.numberOfCopies !== newPlayerInfo.numberOfCopies) {
        changes.push(`Copies: ${currentHero.playerInfo.numberOfCopies} -- ${newPlayerInfo.numberOfCopies}`);
      }

      if (currentHero.gameInfo.faction !== Faction.Dimensional) {
        newPlayerInfo.ascension = getMaxAscensionByNumberOfCopies(currentHero.gameInfo.faction, currentHero.gameInfo.awakened, newPlayerInfo.numberOfCopies);
      }
      const possibleAscensions: Array<Ascension> = getPossibleAscensions(currentHero.gameInfo.faction, currentHero.gameInfo.awakened, currentHero.playerInfo.ascension, newPlayerInfo.ascension);

      if (isFurnitureAvailable(newPlayerInfo.ascension)) {
        let newFurniture = currentHero.playerInfo.furniture + summonedNoFurniture;
        if (newFurniture > 36) {
          newFurniture = 36;
        }
        newPlayerInfo.furniture = newFurniture;
        if (currentHero.playerInfo.furniture !== newPlayerInfo.furniture) {
          changes.push(`Furniture: ${currentHero.playerInfo.furniture} -- ${newPlayerInfo.furniture}`);
        }
      }

      if (changes && changes.length) {
        const newHero: Hero = new Hero(currentHero.id, currentHero.gameInfo, currentHero.systemInfo, newPlayerInfo);
        result.items.push(new SummonResultHero(currentHero, newHero, possibleAscensions, changes));
      }
    }
  });
  return result;
};

export {
  generateSummonResult,
};
