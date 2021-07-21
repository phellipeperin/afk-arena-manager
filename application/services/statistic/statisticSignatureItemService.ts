import Hero from '~/application/domain/hero/hero';
import StatisticItem from '~/application/domain/statistic/statisticItem';
import { StatisticColor } from '~/application/domain/statistic/statisticColor';

const generateSignatureItemStatistics = (heroList: Array<Hero>): Array<StatisticItem> => {
  const statistics: Array<StatisticItem> = [];

  const notUnlocked = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem === -1);
  const elite = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 0 && hero.playerInfo.signatureItem <= 9);
  const legendary = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 10 && hero.playerInfo.signatureItem <= 19);
  const mythic = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 20 && hero.playerInfo.signatureItem <= 29);
  const max = heroList.filter((hero: Hero) => hero.playerInfo.signatureItem >= 30 && hero.playerInfo.signatureItem <= 40);

  statistics.push(new StatisticItem(notUnlocked.length, 'Not Unlocked', StatisticColor.NONE));
  statistics.push(new StatisticItem(elite.length, '+0 - +9', StatisticColor.ELITE));
  statistics.push(new StatisticItem(legendary.length, '+10 - +19', StatisticColor.LEGENDARY));
  statistics.push(new StatisticItem(mythic.length, '+20 - +29', StatisticColor.MYTHIC));
  statistics.push(new StatisticItem(max.length, '+30 - +40', StatisticColor.ASCENDED));

  return statistics;
};

export {
  generateSignatureItemStatistics,
};
