import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import {
  getNumberOfEliteEmblemsNeeded,
  getNumberOfLegendaryEmblemsNeeded,
  getNumberOfMythicEmblemsNeeded,
} from '~/application/services/resource/resourceSignatureItemService';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateSignatureItemChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  // Heroes
  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem === -1);
  const elite = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 0 && hero.playerInfo.signatureItem <= 9);
  const legendary = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 10 && hero.playerInfo.signatureItem <= 19);
  const mythic = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 20 && hero.playerInfo.signatureItem <= 29);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 30 && hero.playerInfo.signatureItem <= 39);
  const max40 = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem === 40);

  if (notUnlocked.length) { heroesChartData.push(new StatisticChartItem(notUnlocked.length, 'Not Unlocked', StatisticColor.NONE, notUnlocked)); }
  if (elite.length) { heroesChartData.push(new StatisticChartItem(elite.length, '+0 - +9', StatisticColor.ELITE, elite)); }
  if (legendary.length) { heroesChartData.push(new StatisticChartItem(legendary.length, '+10 - +19', StatisticColor.LEGENDARY, legendary)); }
  if (mythic.length) { heroesChartData.push(new StatisticChartItem(mythic.length, '+20 - +29', StatisticColor.MYTHIC, mythic)); }
  if (max.length) { heroesChartData.push(new StatisticChartItem(max.length, '+30 - +39', StatisticColor.ASCENDED, max)); }
  if (max40.length) { heroesChartData.push(new StatisticChartItem(max40.length, '+40', StatisticColor.MAX, max40)); }

  // Progress
  let totalEliteEmblemsNeeded = 0;
  let totalLegendaryEmblemsNeeded = 0;
  let totalMythic30EmblemsNeeded = 0;
  let totalMythic40EmblemsNeeded = 0;
  let totalEliteEmblemsAcquired = 0;
  let totalLegendaryEmblemsAcquired = 0;
  let totalMythic30EmblemsAcquired = 0;
  let totalMythic40EmblemsAcquired = 0;
  heroList.forEach((hero: Hero) => {
    const { faction } = hero.gameInfo;
    const { signatureItem } = hero.playerInfo;

    totalEliteEmblemsNeeded += getNumberOfEliteEmblemsNeeded(10);
    totalLegendaryEmblemsNeeded += getNumberOfLegendaryEmblemsNeeded(20);
    totalMythic30EmblemsNeeded += getNumberOfMythicEmblemsNeeded(30);

    if (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional) {
      totalMythic40EmblemsNeeded += getNumberOfMythicEmblemsNeeded(40);
    } else {
      totalMythic40EmblemsNeeded += getNumberOfMythicEmblemsNeeded(30);
    }

    totalEliteEmblemsAcquired += getNumberOfEliteEmblemsNeeded(signatureItem);
    totalLegendaryEmblemsAcquired += getNumberOfLegendaryEmblemsNeeded(signatureItem);
    totalMythic30EmblemsAcquired += getNumberOfMythicEmblemsNeeded(signatureItem <= 30 ? signatureItem : 30);
    totalMythic40EmblemsAcquired += getNumberOfMythicEmblemsNeeded(signatureItem);
  });
  progressChartData.push(new StatisticChartItem(+(100 * totalEliteEmblemsAcquired / totalEliteEmblemsNeeded).toFixed(2), '+10', StatisticColor.ELITE));
  progressChartData.push(new StatisticChartItem(+(100 * totalLegendaryEmblemsAcquired / totalLegendaryEmblemsNeeded).toFixed(2), '+20', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+(100 * totalMythic30EmblemsAcquired / totalMythic30EmblemsNeeded).toFixed(2), '+30', StatisticColor.MYTHIC));
  progressChartData.push(new StatisticChartItem(+(100 * totalMythic40EmblemsAcquired / totalMythic40EmblemsNeeded).toFixed(2), '+40', StatisticColor.MAX));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (resources used)', StatisticChartType.RADIAL, progressChartData));
  return chartList;
};

const generateSignatureItemInfoStatistics = (heroList: Array<Hero>): Array<StatisticSignatureItemInfo> => {
  const infoList: Array<StatisticSignatureItemInfo> = [];
  const plus30Info = new StatisticSignatureItemInfo('PLUS_30', '+30');
  const plus40Info = new StatisticSignatureItemInfo('PLUS_40', '+40');

  heroList.forEach((hero: Hero) => {
    const { faction } = hero.gameInfo;
    const { signatureItem } = hero.playerInfo;
    const necessaryEliteEmblems = getNumberOfEliteEmblemsNeeded(10) - getNumberOfEliteEmblemsNeeded(signatureItem);
    const necessaryLegendaryEmblems = getNumberOfLegendaryEmblemsNeeded(20) - getNumberOfLegendaryEmblemsNeeded(signatureItem);
    const necessaryMythicEmblems = getNumberOfMythicEmblemsNeeded(30) - getNumberOfMythicEmblemsNeeded(signatureItem);
    const necessaryPlus40Emblems = getNumberOfMythicEmblemsNeeded(40) - getNumberOfMythicEmblemsNeeded(signatureItem);

    plus30Info.eliteEmblemNeeded += necessaryEliteEmblems;
    plus30Info.legendaryEmblemNeeded += necessaryLegendaryEmblems;
    plus30Info.mythicEmblemNeeded += necessaryMythicEmblems;
    plus40Info.eliteEmblemNeeded += necessaryEliteEmblems;
    plus40Info.legendaryEmblemNeeded += necessaryLegendaryEmblems;

    switch (faction) {
      case Faction.Lightbearer: {
        plus30Info.lightbearerEmblemNeeded += necessaryMythicEmblems;
        plus40Info.lightbearerEmblemNeeded += necessaryMythicEmblems;
        break;
      }
      case Faction.Mauler: {
        plus30Info.maulerEmblemNeeded += necessaryMythicEmblems;
        plus40Info.maulerEmblemNeeded += necessaryMythicEmblems;
        break;
      }
      case Faction.Wilder: {
        plus30Info.wilderEmblemNeeded += necessaryMythicEmblems;
        plus40Info.wilderEmblemNeeded += necessaryMythicEmblems;
        break;
      }
      case Faction.Graveborn: {
        plus30Info.gravebornEmblemNeeded += necessaryMythicEmblems;
        plus40Info.gravebornEmblemNeeded += necessaryMythicEmblems;
        break;
      }
      case Faction.Celestial: {
        plus30Info.celestialEmblemNeeded += necessaryMythicEmblems;
        plus40Info.mythicEmblemNeeded += necessaryPlus40Emblems;
        plus40Info.celestialEmblemNeeded += necessaryPlus40Emblems;
        break;
      }
      case Faction.Hypogean: {
        plus30Info.hypogeanEmblemNeeded += necessaryMythicEmblems;
        plus40Info.mythicEmblemNeeded += necessaryPlus40Emblems;
        plus40Info.hypogeanEmblemNeeded += necessaryPlus40Emblems;
        break;
      }
      case Faction.Dimensional: {
        plus30Info.dimensionalEmblemNeeded += necessaryMythicEmblems;
        plus40Info.mythicEmblemNeeded += necessaryPlus40Emblems;
        plus40Info.dimensionalEmblemNeeded += necessaryPlus40Emblems;
        break;
      }
    }
  });

  infoList.push(plus30Info);
  infoList.push(plus40Info);

  return infoList;
};

export {
  generateSignatureItemChartStatistics,
  generateSignatureItemInfoStatistics,
};
