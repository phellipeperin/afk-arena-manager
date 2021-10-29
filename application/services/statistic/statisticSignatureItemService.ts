import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import {
  getNumberOfEliteEmblemsNeeded,
  getNumberOfLegendaryEmblemsNeeded,
  getNumberOfMythicEmblemsNeeded,
} from '~/application/services/heroService';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateSignatureItemChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];

  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem === -1);
  const elite = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 0 && hero.playerInfo.signatureItem <= 9);
  const legendary = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 10 && hero.playerInfo.signatureItem <= 19);
  const mythic = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 20 && hero.playerInfo.signatureItem <= 29);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 30 && hero.playerInfo.signatureItem <= 40);

  if (notUnlocked.length) { heroesChartData.push(new StatisticChartItem(notUnlocked.length, 'Not Unlocked', StatisticColor.NONE)); }
  if (elite.length) { heroesChartData.push(new StatisticChartItem(elite.length, '+0 - +9', StatisticColor.ELITE)); }
  if (legendary.length) { heroesChartData.push(new StatisticChartItem(legendary.length, '+10 - +19', StatisticColor.LEGENDARY)); }
  if (mythic.length) { heroesChartData.push(new StatisticChartItem(mythic.length, '+20 - +29', StatisticColor.MYTHIC)); }
  if (max.length) { heroesChartData.push(new StatisticChartItem(max.length, '+30 - +40', StatisticColor.ASCENDED)); }

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
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
