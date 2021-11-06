import Resources from '~/application/domain/resources/resources';
import StatisticArtifactInfo from '~/application/domain/statistic/info/statisticArtifactInfo';

const generateArtifactInfoStatistics = (resources: Resources): Array<StatisticArtifactInfo> => {
  const infoList: Array<StatisticArtifactInfo> = [];
  // const maxDroplets = getMaxDroplets(heroList);
  // const currentDroplets = calculateCurrentDroplets(heroList);
  // const maxElderTree = getMaxElderTree(heroList);
  // const currentElderTree = calculateCurrentElderTree(heroList);
  //
  // const currentTree = new StatisticElderTreeInfo('CURRENT_TREE', `Current (Lv. ${currentElderTree.level})`);
  // const maxTree = new StatisticElderTreeInfo('MAX_TREE', `Max (Lv. ${maxElderTree.level})`);
  //
  // const totalCurrentCostPerBranch = getAccumulatedTwistedEssenceCost(currentElderTree.level - 10);
  // const totalMaxCostPerBranch = getAccumulatedTwistedEssenceCost(maxElderTree.level - 10);
  // const supportInvested = getAccumulatedTwistedEssenceCost(resources.elderTree.support);
  // const mageInvested = getAccumulatedTwistedEssenceCost(resources.elderTree.mage);
  // const warriorInvested = getAccumulatedTwistedEssenceCost(resources.elderTree.warrior);
  // const tankInvested = getAccumulatedTwistedEssenceCost(resources.elderTree.tank);
  // const rangerInvested = getAccumulatedTwistedEssenceCost(resources.elderTree.ranger);
  // const totalInvested = supportInvested + mageInvested + warriorInvested + tankInvested + rangerInvested;
  //
  // currentTree.remainingTwistedEssence = (totalCurrentCostPerBranch * 5) - totalInvested;
  // maxTree.remainingTwistedEssence = (totalMaxCostPerBranch * 5) - totalInvested;
  // maxTree.remainingDroplets = maxDroplets - currentDroplets;
  //
  // infoList.push(currentTree);
  // infoList.push(maxTree);
  return infoList;
};

export {
  generateArtifactInfoStatistics,
};
