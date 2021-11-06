import Resources from '~/application/domain/resources/resources';
import StatisticArtifactInfo from '~/application/domain/statistic/info/statisticArtifactInfo';
import ResourceArtifact from '~/application/domain/resources/resourceArtifact';
import { getArtifactTotalCost } from '~/application/services/resource/resourceArtifactService';

const generateArtifactInfoStatistics = (resources: Resources): Array<StatisticArtifactInfo> => {
  const infoList: Array<StatisticArtifactInfo> = [];
  const maxArtifact = new StatisticArtifactInfo('MAX_ARTIFACT', 'Max');
  maxArtifact.fragments.push({
    id: 'CLASS',
    amount: 0,
  });

  resources.artifacts.forEach((artifact: ResourceArtifact) => {
    const isDurasArtifact: boolean = !artifact.group;
    const totalCost = getArtifactTotalCost(isDurasArtifact, 5);
    const spentCost = getArtifactTotalCost(isDurasArtifact, artifact.stars);
    const missingFragmentsCost = totalCost.fragments - spentCost.fragments;

    maxArtifact.totalGold += totalCost.gold - spentCost.gold;
    if (missingFragmentsCost > 0) {
      if (isDurasArtifact) {
        maxArtifact.fragments.push({
          id: artifact.id,
          amount: missingFragmentsCost,
        });
      } else {
        maxArtifact.fragments[0].amount += missingFragmentsCost;
      }
    }
  });

  infoList.push(maxArtifact);
  return infoList;
};

export {
  generateArtifactInfoStatistics,
};
