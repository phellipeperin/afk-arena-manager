import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';
import StatisticChart, { StatisticChartType } from '~/application/domain/statistic/statisticChart';

const generateEquipmentChartStatistics = (heroList: Array<Hero>): Array<StatisticChart> => {
  const chartList: Array<StatisticChart> = [];
  const statistics: Array<StatisticChartItem> = [];
  const count = [0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfMaxEquip = (hero.playerInfo.equipment.filter(equip => equip.tier === 3) || []).length;
    count[numberOfMaxEquip]++;
  });

  if (count[0]) { statistics.push(new StatisticChartItem(count[0], 'No T3 Equips', StatisticColor.NONE)); }
  if (count[1]) { statistics.push(new StatisticChartItem(count[1], '1 T3 Equips', StatisticColor.ELITE)); }
  if (count[2]) { statistics.push(new StatisticChartItem(count[2], '2 T3 Equips', StatisticColor.LEGENDARY)); }
  if (count[3]) { statistics.push(new StatisticChartItem(count[3], '3 T3 Equips', StatisticColor.MYTHIC)); }
  if (count[4]) { statistics.push(new StatisticChartItem(count[4], 'Full T3 Equips', StatisticColor.ASCENDED)); }

  chartList.push(new StatisticChart('Statistics', StatisticChartType.DONUT, statistics));
  return chartList;
};

const generateEquipmentInfoStatistics = (heroList: Array<Hero>): Array<StatisticEquipmentInfo> => {
  const infoList: Array<StatisticEquipmentInfo> = [];
  const acquiredInfo = new StatisticEquipmentInfo('ACQUIRED', 'Acquired');
  const allInfo = new StatisticEquipmentInfo('ALL', 'All');

  heroList.forEach((hero: Hero) => {
    hero.playerInfo.equipment.forEach((equip: HeroEquip) => {
      const needThisItem = equip.tier === -1 ? 1 : 0;
      if (needThisItem) {
        allInfo.itemsNeeded += 1;
      } else {
        acquiredInfo.starsNeeded += 5 - equip.stars;
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
