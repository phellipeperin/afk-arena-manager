import Hero from '~/application/domain/hero/hero';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';

const generateEquipmentChartStatistics = (heroList: Array<Hero>): Array<StatisticChartItem> => {
  const statistics: Array<StatisticChartItem> = [];
  const count = [0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfMaxEquip = (hero.playerInfo.equipment.filter(equip => equip.tier === 3) || []).length;
    count[numberOfMaxEquip]++;
  });

  statistics.push(new StatisticChartItem(count[0], 'No T3 Equips', StatisticColor.NONE));
  statistics.push(new StatisticChartItem(count[1], '1 T3 Equips', StatisticColor.ELITE));
  statistics.push(new StatisticChartItem(count[2], '2 T3 Equips', StatisticColor.LEGENDARY));
  statistics.push(new StatisticChartItem(count[3], '3 T3 Equips', StatisticColor.MYTHIC));
  statistics.push(new StatisticChartItem(count[4], 'Full T3 Equips', StatisticColor.ASCENDED));

  return statistics;
};

const generateEquipmentInfoStatistics = (heroList: Array<Hero>): Array<StatisticEquipmentInfo> => {
  const infoList: Array<StatisticEquipmentInfo> = [];

  const allInfo = new StatisticEquipmentInfo('ALL', 'All');
  infoList.push(allInfo);

  const strInfo = new StatisticEquipmentInfo('STR', 'Str');
  infoList.push(strInfo);

  const dexInfo = new StatisticEquipmentInfo('DEX', 'Dex');
  infoList.push(dexInfo);

  const intInfo = new StatisticEquipmentInfo('INT', 'Int');
  infoList.push(intInfo);

  return infoList;
};

export {
  generateEquipmentChartStatistics,
  generateEquipmentInfoStatistics,
};
