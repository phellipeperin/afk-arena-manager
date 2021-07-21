import Hero from '~/application/domain/hero/hero';
import StatisticItem from '~/application/domain/statistic/statisticItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

const generateEquipmentStatistics = (heroList: Array<Hero>): Array<StatisticItem> => {
  const statistics: Array<StatisticItem> = [];
  const count = [0, 0, 0, 0, 0];

  heroList.forEach((hero: Hero) => {
    const numberOfMaxEquip = (hero.playerInfo.equipment.filter(equip => equip.tier === 3) || []).length;
    count[numberOfMaxEquip]++;
  });

  statistics.push(new StatisticItem(count[0], 'No T3 Equips', StatisticColor.NONE));
  statistics.push(new StatisticItem(count[1], '1 T3 Equips', StatisticColor.ELITE));
  statistics.push(new StatisticItem(count[2], '2 T3 Equips', StatisticColor.LEGENDARY));
  statistics.push(new StatisticItem(count[3], '3 T3 Equips', StatisticColor.MYTHIC));
  statistics.push(new StatisticItem(count[4], 'Full T3 Equips', StatisticColor.ASCENDED));

  return statistics;
};

export {
  generateEquipmentStatistics,
};
