import StatisticInfo from '~/application/domain/statistic/info/statisticInfo';
import { Artifact } from '~/application/domain/resources/resourceArtifact';

export interface StatisticArtifactInfoItem {
  id: Artifact;
  amount: number;
}

export default class StatisticArtifactInfo extends StatisticInfo {
  fragments: Array<StatisticArtifactInfoItem> = [];
  totalGold: number = 0;
}
