import Hero from '~/application/domain/hero/hero';
import HeroObjectiveCompare from '~/application/domain/objectives/heroObjectiveCompare';
import HeroObjectiveCompareItem from '~/application/domain/objectives/heroObjectiveCompareItem';
import HeroObjectiveMissingResources from '~/application/domain/objectives/heroObjectiveMissingResources';
import {
  getNumberOfEngraveCoresNeeded,
  getNumberOfEngraveShardsNeeded,
} from '~/application/services/resource/resourceEngraveService';
import { poeCostPerFurniture } from '~/application/domain/statistic/info/statisticFurnitureInfo';
import { getNumberOfEliteEmblemsNeeded, getNumberOfLegendaryEmblemsNeeded, getNumberOfMythicEmblemsNeeded } from '~/application/services/resource/resourceSignatureItemService';
import { getNumberOfEliteSacsNeeded } from '~/application/services/resource/resourceAscensionService';
import { convertAscensionToNumber } from '~/application/services/convertService';
import { loadAscensionLabel } from '~/application/services/textService';

const getHeroObjectiveDifferences = (playerHeroList: Array<Hero>, objectiveHeroList: Array<Hero>): HeroObjectiveCompare => {
  const itemList: Array<HeroObjectiveCompareItem> = [];
  const totalResourcesNeeded = new HeroObjectiveMissingResources();

  playerHeroList.forEach((playerHero: Hero) => {
    const objectiveHero = objectiveHeroList.find((hero: Hero) => hero.id === playerHero.id) || new Hero();
    const differenceInfo: Array<string> = [];
    const resourcesNeeded = new HeroObjectiveMissingResources();

    if (convertAscensionToNumber(playerHero.playerInfo.ascension) < convertAscensionToNumber(objectiveHero.playerInfo.ascension)) {
      differenceInfo.push(`Ascension: ${loadAscensionLabel(playerHero.playerInfo.ascension)} >> ${loadAscensionLabel(objectiveHero.playerInfo.ascension)}`);
      const playerSacsNeeded = getNumberOfEliteSacsNeeded(playerHero.gameInfo.faction, playerHero.gameInfo.awakened, playerHero.playerInfo.ascension);
      const objectiveSacsNeeded = getNumberOfEliteSacsNeeded(objectiveHero.gameInfo.faction, objectiveHero.gameInfo.awakened, objectiveHero.playerInfo.ascension);
      let neededCopies = objectiveHero.playerInfo.numberOfCopies - playerHero.playerInfo.numberOfCopies;
      if (neededCopies < 0) {
        neededCopies = 0;
      }
      let neededSacs = objectiveSacsNeeded - playerSacsNeeded;
      if (neededSacs < 0) {
        neededSacs = 0;
      }
      if (playerHero.gameInfo.awakened) {
        resourcesNeeded.setCopiesLegendary(neededCopies);
        totalResourcesNeeded.addCopiesLegendary(neededCopies);
      } else {
        resourcesNeeded.setCopiesElite(neededCopies);
        totalResourcesNeeded.addCopiesElite(neededCopies);
      }
      resourcesNeeded.setSacs(neededSacs);
      totalResourcesNeeded.addSacs(neededSacs);
    }

    if (playerHero.playerInfo.signatureItem < objectiveHero.playerInfo.signatureItem) {
      differenceInfo.push(`SI: ${playerHero.playerInfo.signatureItem === -1 ? 'N/A' : playerHero.playerInfo.signatureItem} >> ${objectiveHero.playerInfo.signatureItem === -1 ? 'N/A' : objectiveHero.playerInfo.signatureItem}`);
      const neededEliteEmblem = getNumberOfEliteEmblemsNeeded(objectiveHero.playerInfo.signatureItem) - getNumberOfEliteEmblemsNeeded(playerHero.playerInfo.signatureItem);
      const neededLegendaryEmblem = getNumberOfLegendaryEmblemsNeeded(objectiveHero.playerInfo.signatureItem) - getNumberOfLegendaryEmblemsNeeded(playerHero.playerInfo.signatureItem);
      const neededMythicEmblem = getNumberOfMythicEmblemsNeeded(objectiveHero.playerInfo.signatureItem) - getNumberOfMythicEmblemsNeeded(playerHero.playerInfo.signatureItem);
      resourcesNeeded.setEliteEmblem(neededEliteEmblem);
      resourcesNeeded.setLegendaryEmblem(neededLegendaryEmblem);
      resourcesNeeded.setMythicEmblem(neededMythicEmblem);
      totalResourcesNeeded.addEliteEmblem(neededEliteEmblem);
      totalResourcesNeeded.addLegendaryEmblem(neededLegendaryEmblem);
      totalResourcesNeeded.addMythicEmblem(neededMythicEmblem);
    }

    if (playerHero.playerInfo.furniture < objectiveHero.playerInfo.furniture) {
      differenceInfo.push(`Furniture: ${playerHero.playerInfo.furniture}/9 >> ${objectiveHero.playerInfo.furniture}/9`);
      const neededPoe = (objectiveHero.playerInfo.furniture - playerHero.playerInfo.furniture) * poeCostPerFurniture;
      resourcesNeeded.setPoeCoin(neededPoe);
      totalResourcesNeeded.addPoeCoin(neededPoe);
    }

    if (playerHero.playerInfo.engrave < objectiveHero.playerInfo.engrave) {
      differenceInfo.push(`Engrave: e${playerHero.playerInfo.engrave} >> e${objectiveHero.playerInfo.engrave}`);
      const neededShards = getNumberOfEngraveShardsNeeded(objectiveHero.playerInfo.engrave) - getNumberOfEngraveShardsNeeded(playerHero.playerInfo.engrave);
      const neededCores = getNumberOfEngraveCoresNeeded(objectiveHero.playerInfo.engrave) - getNumberOfEngraveCoresNeeded(playerHero.playerInfo.engrave);
      resourcesNeeded.setShards(neededShards);
      resourcesNeeded.setCores(neededCores);
      totalResourcesNeeded.addShards(neededShards);
      totalResourcesNeeded.addCores(neededCores);
    }

    if (differenceInfo.length) {
      itemList.push(new HeroObjectiveCompareItem(playerHero, objectiveHero, differenceInfo, resourcesNeeded));
    }
  });

  return new HeroObjectiveCompare(itemList, totalResourcesNeeded);
};

export {
  getHeroObjectiveDifferences,
};
