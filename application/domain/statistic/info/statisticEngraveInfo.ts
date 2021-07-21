export default class StatisticEngraveInfo {
  key: string;
  label: string;

  shardNeeded: number = 0;
  coreNeeded: number = 0;

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}
