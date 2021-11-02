import Hero from '~/application/domain/hero/hero';
import Resources from '~/application/domain/resources/resources';
import StatisticElderTreeInfo from '~/application/domain/statistic/info/statisticElderTreeInfo';
import { getMaxDroplets, getMaxElderTree, calculateCurrentElderTree } from '~/application/services/resource/resourceElderTreeService';

const generateElderTreeInfoStatistics = (heroList: Array<Hero>, resources: Resources): Array<StatisticElderTreeInfo> => {
  const infoList: Array<StatisticElderTreeInfo> = [];
  const maxDroplets = getMaxDroplets(heroList);
  const maxElderTree = getMaxElderTree(heroList);
  const currentElderTree = calculateCurrentElderTree(heroList);

  const currentTree = new StatisticElderTreeInfo('CURRENT_TREE', `Current (Lv. ${currentElderTree.level})`);
  const maxTree = new StatisticElderTreeInfo('MAX_TREE', `Max (Lv. ${maxElderTree.level})`);

  infoList.push(currentTree);
  infoList.push(maxTree);
  return infoList;
};

export {
  generateElderTreeInfoStatistics,
};
