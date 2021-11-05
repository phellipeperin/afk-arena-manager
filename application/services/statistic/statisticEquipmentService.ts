import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';
import { getTotalPointsUpgradeStar } from '../resource/resourceEquipmentService';

const generateEquipmentChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const heroesChartData: Array<StatisticChartItem> = [];
  const progressChartData: Array<StatisticChartItem> = [];

  const count: Array<Array<Hero>> = [[], [], [], [], []];
  const needed = heroList.length * 4;
  let t0Acquired = 0;
  let t1Acquired = 0;
  let t2Acquired = 0;
  let t3Acquired = 0;

  heroList.forEach((hero: Hero) => {
    const numberOfT3Equip = (hero.playerInfo.equipment.filter(equip => equip.tier === 3) || []).length;
    count[numberOfT3Equip].push(hero);

    t0Acquired += (hero.playerInfo.equipment.filter(equip => equip.tier >= 0) || []).length;
    t1Acquired += (hero.playerInfo.equipment.filter(equip => equip.tier >= 1) || []).length;
    t2Acquired += (hero.playerInfo.equipment.filter(equip => equip.tier >= 2) || []).length;
    t3Acquired += numberOfT3Equip;
  });

  if (count[0].length) { heroesChartData.push(new StatisticChartItem(count[0].length, 'No T3 Equips', StatisticColor.NONE, count[0])); }
  if (count[1].length) { heroesChartData.push(new StatisticChartItem(count[1].length, '1 T3 Equips', StatisticColor.ELITE, count[1])); }
  if (count[2].length) { heroesChartData.push(new StatisticChartItem(count[2].length, '2 T3 Equips', StatisticColor.LEGENDARY, count[2])); }
  if (count[3].length) { heroesChartData.push(new StatisticChartItem(count[3].length, '3 T3 Equips', StatisticColor.MYTHIC, count[3])); }
  if (count[4].length) { heroesChartData.push(new StatisticChartItem(count[4].length, 'Full T3 Equips', StatisticColor.ASCENDED, count[4])); }

  progressChartData.push(new StatisticChartItem(+(100 * t0Acquired / needed).toFixed(2), 'T0', StatisticColor.ELITE));
  progressChartData.push(new StatisticChartItem(+(100 * t1Acquired / needed).toFixed(2), 'T1', StatisticColor.LEGENDARY));
  progressChartData.push(new StatisticChartItem(+(100 * t2Acquired / needed).toFixed(2), 'T2', StatisticColor.MYTHIC));
  progressChartData.push(new StatisticChartItem(+(100 * t3Acquired / needed).toFixed(2), 'T3', StatisticColor.ASCENDED));

  chartList.push(new StatisticChart('Heroes', StatisticChartType.DONUT, heroesChartData));
  chartList.push(new StatisticChart('Progress (acquired)', StatisticChartType.RADIAL, progressChartData));
  return chartList;
};

const generateEquipmentInfoStatistics = (heroList: Array<Hero>): Array<StatisticEquipmentInfo> => {
  const infoList: Array<StatisticEquipmentInfo> = [];
  const acquiredInfo = new StatisticEquipmentInfo('ACQUIRED', 'Acquired');
  const allInfo = new StatisticEquipmentInfo('ALL', 'All');

  const pointsCost5Stars = getTotalPointsUpgradeStar(5);

  heroList.forEach((hero: Hero) => {
    hero.playerInfo.equipment.forEach((equip: HeroEquip) => {
      const pointsNeeded = pointsCost5Stars - getTotalPointsUpgradeStar(equip.stars);
      if (equip.tier === -1) {
        allInfo.itemsNeeded += 1;
      } else {
        acquiredInfo.starsNeeded += 5 - equip.stars;
        acquiredInfo.tokensNeeded += pointsNeeded / 10;
        acquiredInfo.goldNeeded += pointsNeeded * 100;
        acquiredInfo.stonesNeeded.t1 += equip.tier < 1 ? 1 : 0;
        acquiredInfo.stonesNeeded.t2 += equip.tier < 2 ? 1 : 0;
        acquiredInfo.stonesNeeded.t3 += equip.tier < 3 ? 1 : 0;

        if (equip.faction === Faction.None) {
          acquiredInfo.noFaction += 1;
          allInfo.noFaction += 1;
        } else if (equip.faction !== hero.gameInfo.faction) {
          acquiredInfo.wrongFaction += 1;
          allInfo.wrongFaction += 1;
        }
      }

      allInfo.starsNeeded += 5 - equip.stars;
      allInfo.tokensNeeded += pointsNeeded / 10;
      allInfo.goldNeeded += pointsNeeded * 100;
      allInfo.stonesNeeded.t1 += equip.tier < 1 ? 1 : 0;
      allInfo.stonesNeeded.t2 += equip.tier < 2 ? 1 : 0;
      allInfo.stonesNeeded.t3 += equip.tier < 3 ? 1 : 0;
    });
  });

  infoList.push(acquiredInfo);
  infoList.push(allInfo);
  return infoList;
};

export {
  generateEquipmentChartStatistics,
  generateEquipmentInfoStatistics,
};
