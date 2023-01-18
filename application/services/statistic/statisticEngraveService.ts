import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import { getNumberOfEngraveCoresNeeded, getNumberOfEngraveShardsNeeded } from '~/application/services/resource/resourceEngraveService';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateEngraveChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  // Heroes
  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.engrave === 0);
  const low = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 1 && hero.playerInfo.engrave <= 29);
  const medium = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 30 && hero.playerInfo.engrave <= 59);
  const high = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 60 && hero.playerInfo.signatureItem <= 79);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.engrave >= 80 && hero.playerInfo.signatureItem <= 99);
  const fullMax = heroList.filter((hero: Hero) => hero.playerInfo.engrave === 100);

  if (notUnlocked.length) { heroesChartData.push(new StatisticChartItem(notUnlocked.length, 'No Engraving', StatisticColor.NONE, notUnlocked)); }
  if (low.length) { heroesChartData.push(new StatisticChartItem(low.length, '1 - 29', StatisticColor.ELITE, low)); }
  if (medium.length) { heroesChartData.push(new StatisticChartItem(medium.length, '30 - 59', StatisticColor.LEGENDARY, medium)); }
  if (high.length) { heroesChartData.push(new StatisticChartItem(high.length, '60 - 79', StatisticColor.MYTHIC, high)); }
  if (max.length) { heroesChartData.push(new StatisticChartItem(max.length, '80 - 99', StatisticColor.ASCENDED, max)); }
  if (fullMax.length) { heroesChartData.push(new StatisticChartItem(fullMax.length, '100', StatisticColor.MAX, fullMax)); }

  // Progress
  let totalShardsNeeded = 0;
  let totalCores60Needed = 0;
  let totalCores80Needed = 0;
  let totalCores100Needed = 0;
  let totalShardsAcquired = 0;
  let totalCores60Acquired = 0;
  let totalCores80Acquired = 0;
  let totalCores100Acquired = 0;
  heroList.forEach((hero: Hero) => {
    const { faction, awakened } = hero.gameInfo;
    const { engrave } = hero.playerInfo;

    totalShardsNeeded += getNumberOfEngraveShardsNeeded(30);
    totalCores60Needed += getNumberOfEngraveCoresNeeded(60);
    totalCores80Needed += getNumberOfEngraveCoresNeeded(80);

    if (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional || awakened) {
      totalCores100Needed += getNumberOfEngraveCoresNeeded(100);
    } else {
      totalCores100Needed += getNumberOfEngraveCoresNeeded(80);
    }

    const playerCores = getNumberOfEngraveCoresNeeded(engrave);
    totalShardsAcquired += getNumberOfEngraveShardsNeeded(engrave);
    totalCores60Acquired += playerCores;
    totalCores80Acquired += engrave <= 80 ? playerCores : getNumberOfEngraveCoresNeeded(80);
    totalCores100Acquired += playerCores;
  });
  progressChartData.push(new StatisticChartItem(+(100 * totalShardsAcquired / totalShardsNeeded).toFixed(2), 'Shards', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+(100 * totalCores60Acquired / totalCores60Needed).toFixed(2), 'Cores +60', StatisticColor.MYTHIC));
  progressChartData.push(new StatisticChartItem(+(100 * totalCores80Acquired / totalCores80Needed).toFixed(2), 'Cores +80', StatisticColor.ASCENDED));
  progressChartData.push(new StatisticChartItem(+(100 * totalCores100Acquired / totalCores100Needed).toFixed(2), 'Cores +100', StatisticColor.MAX));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (resources used)', StatisticChartType.RADIAL, progressChartData));
  return chartList;
};

const generateEngraveInfoStatistics = (heroList: Array<Hero>): Array<StatisticEngraveInfo> => {
  const infoList: Array<StatisticEngraveInfo> = [];
  const plus60Info = new StatisticEngraveInfo('PLUS_60', '+60');
  const plus80Info = new StatisticEngraveInfo('PLUS_80', '+80');
  const maxInfo = new StatisticEngraveInfo('MAX', 'Max');

  heroList.forEach((hero: Hero) => {
    const { faction, awakened } = hero.gameInfo;
    const { engrave } = hero.playerInfo;
    const playerCores = getNumberOfEngraveCoresNeeded(engrave);
    const necessaryShard = getNumberOfEngraveShardsNeeded(30) - getNumberOfEngraveShardsNeeded(engrave);

    plus60Info.shardNeeded += necessaryShard;
    plus80Info.shardNeeded += necessaryShard;
    maxInfo.shardNeeded += necessaryShard;

    plus60Info.coreNeeded += getNumberOfEngraveCoresNeeded(60) - playerCores;
    plus80Info.coreNeeded += getNumberOfEngraveCoresNeeded(80) - playerCores;
    if (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional || awakened) {
      maxInfo.coreNeeded += getNumberOfEngraveCoresNeeded(100) - playerCores;
    } else {
      maxInfo.coreNeeded += getNumberOfEngraveCoresNeeded(80) - playerCores;
    }
  });

  infoList.push(plus60Info);
  infoList.push(plus80Info);
  infoList.push(maxInfo);
  return infoList;
};

export {
  generateEngraveChartStatistics,
  generateEngraveInfoStatistics,
};
