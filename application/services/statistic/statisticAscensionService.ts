import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import { getMinNumberOfCopies, getNumberOfElitePlusSacsNeeded } from '~/application/services/heroService';
import { Faction } from '~/application/domain/info/faction';

const generateAscensionChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];

  const notAcquiredHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.None);
  const eliteHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Elite || hero.playerInfo.ascension === Ascension.ElitePlus);
  const legendaryHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Legendary || hero.playerInfo.ascension === Ascension.LegendaryPlus);
  const mythicHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Mythic || hero.playerInfo.ascension === Ascension.MythicPlus);
  const ascendedHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended || hero.playerInfo.ascension === Ascension.Ascended1Star || hero.playerInfo.ascension === Ascension.Ascended2Star || hero.playerInfo.ascension === Ascension.Ascended3Star || hero.playerInfo.ascension === Ascension.Ascended4Star);
  const ascendedMaxHeroes = heroList.filter((hero: Hero) => hero.playerInfo.ascension === Ascension.Ascended5Star);

  if (notAcquiredHeroes.length) { statistics.push(new StatisticChartItem(notAcquiredHeroes.length, 'Not Acquired', StatisticColor.NONE)); }
  if (eliteHeroes.length) { statistics.push(new StatisticChartItem(eliteHeroes.length, 'Elite', StatisticColor.ELITE)); }
  if (legendaryHeroes.length) { statistics.push(new StatisticChartItem(legendaryHeroes.length, 'Legendary', StatisticColor.LEGENDARY)); }
  if (mythicHeroes.length) { statistics.push(new StatisticChartItem(mythicHeroes.length, 'Mythic', StatisticColor.MYTHIC)); }
  if (ascendedHeroes.length) { statistics.push(new StatisticChartItem(ascendedHeroes.length, 'Ascended', StatisticColor.ASCENDED)); }
  if (ascendedMaxHeroes.length) { statistics.push(new StatisticChartItem(ascendedMaxHeroes.length, 'Ascended Max', StatisticColor.MAX)); }

  return statistics;
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
