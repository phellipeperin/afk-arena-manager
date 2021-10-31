import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import { getMinNumberOfCopies, getNumberOfElitePlusSacsNeeded } from '~/application/services/heroService';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateAscensionChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  // Heroes
  const notAcquiredHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.None);
  const eliteHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Elite || hero.playerInfo.ascension === Ascension.ElitePlus);
  const legendaryHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Legendary || hero.playerInfo.ascension === Ascension.LegendaryPlus);
  const mythicHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Mythic || hero.playerInfo.ascension === Ascension.MythicPlus);
  const ascendedHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended || hero.playerInfo.ascension === Ascension.Ascended1Star || hero.playerInfo.ascension === Ascension.Ascended2Star || hero.playerInfo.ascension === Ascension.Ascended3Star || hero.playerInfo.ascension === Ascension.Ascended4Star);
  const ascendedMaxHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended5Star);

  if (notAcquiredHeroes.length) { heroesChartData.push(new StatisticChartItem(notAcquiredHeroes.length, 'Not Acquired', StatisticColor.NONE, notAcquiredHeroes)); }
  if (eliteHeroes.length) { heroesChartData.push(new StatisticChartItem(eliteHeroes.length, 'Elite', StatisticColor.ELITE, eliteHeroes)); }
  if (legendaryHeroes.length) { heroesChartData.push(new StatisticChartItem(legendaryHeroes.length, 'Legendary', StatisticColor.LEGENDARY, legendaryHeroes)); }
  if (mythicHeroes.length) { heroesChartData.push(new StatisticChartItem(mythicHeroes.length, 'Mythic', StatisticColor.MYTHIC, mythicHeroes)); }
  if (ascendedHeroes.length) { heroesChartData.push(new StatisticChartItem(ascendedHeroes.length, 'Ascended', StatisticColor.ASCENDED, ascendedHeroes)); }
  if (ascendedMaxHeroes.length) { heroesChartData.push(new StatisticChartItem(ascendedMaxHeroes.length, 'Ascended Max', StatisticColor.MAX, ascendedMaxHeroes)); }

  // Progress
  let eliteCopiesNeeded = 0;
  let legendaryCopiesNeeded = 0;
  let mythicCopiesNeeded = 0;
  let ascendedCopiesNeeded = 0;
  let ascendedMaxCopiesNeeded = 0;
  let eliteCopiesAcquired = 0;
  let legendaryCopiesAcquired = 0;
  let mythicCopiesAcquired = 0;
  let ascendedCopiesAcquired = 0;
  let ascendedMaxCopiesAcquired = 0;
  heroList.forEach((hero: Hero) => {
    const { faction } = hero.gameInfo;
    if (faction !== Faction.Dimensional) {
      const heroEliteCopiesNeeded = getMinNumberOfCopies(faction, Ascension.Elite);
      const heroLegendaryCopiesNeeded = getMinNumberOfCopies(faction, Ascension.Legendary);
      const heroMythicCopiesNeeded = getMinNumberOfCopies(faction, Ascension.Mythic);
      const heroAscendedCopiesNeeded = getMinNumberOfCopies(faction, Ascension.Ascended);
      const heroAscendedMaxCopiesNeeded = getMinNumberOfCopies(faction, Ascension.Ascended5Star);

      eliteCopiesNeeded += heroEliteCopiesNeeded;
      legendaryCopiesNeeded += heroLegendaryCopiesNeeded;
      mythicCopiesNeeded += heroMythicCopiesNeeded;
      ascendedCopiesNeeded += heroAscendedCopiesNeeded;
      ascendedMaxCopiesNeeded += heroAscendedMaxCopiesNeeded;

      eliteCopiesAcquired += hero.playerInfo.numberOfCopies >= heroEliteCopiesNeeded ? heroEliteCopiesNeeded : hero.playerInfo.numberOfCopies;
      legendaryCopiesAcquired += hero.playerInfo.numberOfCopies >= heroLegendaryCopiesNeeded ? heroLegendaryCopiesNeeded : hero.playerInfo.numberOfCopies;
      mythicCopiesAcquired += hero.playerInfo.numberOfCopies >= heroMythicCopiesNeeded ? heroMythicCopiesNeeded : hero.playerInfo.numberOfCopies;
      ascendedCopiesAcquired += hero.playerInfo.numberOfCopies >= heroAscendedCopiesNeeded ? heroAscendedCopiesNeeded : hero.playerInfo.numberOfCopies;
      ascendedMaxCopiesAcquired += hero.playerInfo.numberOfCopies >= heroAscendedMaxCopiesNeeded ? heroAscendedMaxCopiesNeeded : hero.playerInfo.numberOfCopies;
    }
  });
  progressChartData.push(new StatisticChartItem(+(100 * eliteCopiesAcquired / eliteCopiesNeeded).toFixed(2), 'Elite', StatisticColor.ELITE));
  progressChartData.push(new StatisticChartItem(+(100 * legendaryCopiesAcquired / legendaryCopiesNeeded).toFixed(2), 'Legendary', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+(100 * mythicCopiesAcquired / mythicCopiesNeeded).toFixed(2), 'Mythic', StatisticColor.MYTHIC));
  progressChartData.push(new StatisticChartItem(+(100 * ascendedCopiesAcquired / ascendedCopiesNeeded).toFixed(2), 'Ascended', StatisticColor.ASCENDED));
  progressChartData.push(new StatisticChartItem(+(100 * ascendedMaxCopiesAcquired / ascendedMaxCopiesNeeded).toFixed(2), 'Ascended Max', StatisticColor.MAX));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (enough copies)', StatisticChartType.RADIAL, progressChartData));
  return chartList;
};

const generateAscensionInfoStatistics = (heroList: Array<Hero>): Array<StatisticAscensionInfo> => {
  const infoList: Array<StatisticAscensionInfo> = [];
  const ascendedInfo = new StatisticAscensionInfo('ASCENDED', 'Ascended');
  const ascendedMaxInfo = new StatisticAscensionInfo('ASCENDED_MAX', 'Ascended Max');

  heroList.forEach((hero: Hero) => {
    const { faction } = hero.gameInfo;
    const ascendedNeededCopies = getMinNumberOfCopies(faction, Ascension.Ascended) - hero.playerInfo.numberOfCopies;
    const ascendedMaxNeededCopies = getMinNumberOfCopies(faction, Ascension.Ascended5Star) - hero.playerInfo.numberOfCopies;

    if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) {
      const sacsNeeded = getNumberOfElitePlusSacsNeeded(faction, Ascension.Ascended) - getNumberOfElitePlusSacsNeeded(faction, hero.playerInfo.ascension);
      if (sacsNeeded > 0) {
        ascendedInfo.elitePlusSacNeeded += sacsNeeded;
        ascendedMaxInfo.elitePlusSacNeeded += sacsNeeded;
      }

      if (ascendedNeededCopies > 0) {
        ascendedInfo.totalNormalCopiesNeeded += ascendedNeededCopies;
        ascendedInfo.copiesNormalNeeded.push({ amount: ascendedNeededCopies, hero });
      }
      if (ascendedMaxNeededCopies > 0) {
        ascendedMaxInfo.totalNormalCopiesNeeded += ascendedMaxNeededCopies;
        ascendedMaxInfo.copiesNormalNeeded.push({ amount: ascendedMaxNeededCopies, hero });
      }
    }

    if (faction === Faction.Celestial || faction === Faction.Hypogean) {
      if (ascendedNeededCopies > 0) {
        ascendedInfo.totalCelepogeanCopiesNeeded += ascendedNeededCopies;
        ascendedInfo.copiesCelepogeanNeeded.push({ amount: ascendedNeededCopies, hero });
      }
      if (ascendedMaxNeededCopies > 0) {
        ascendedMaxInfo.totalCelepogeanCopiesNeeded += ascendedMaxNeededCopies;
        ascendedMaxInfo.copiesCelepogeanNeeded.push({ amount: ascendedMaxNeededCopies, hero });
      }
    }
  });

  infoList.push(ascendedInfo);
  infoList.push(ascendedMaxInfo);
  return infoList;
};

export {
  generateAscensionChartStatistics,
  generateAscensionInfoStatistics,
};
