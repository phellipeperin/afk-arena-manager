export default class StatisticSignatureItemInfo {
  key: string;
  label: string;

  eliteEmblemNeeded: number = 0;
  legendaryEmblemNeeded: number = 0;
  mythicEmblemNeeded: number = 0;

  lightbearerEmblemNeeded: number = 0;
  maulerEmblemNeeded: number = 0;
  wilderEmblemNeeded: number = 0;
  gravebornEmblemNeeded: number = 0;
  celestialEmblemNeeded: number = 0;
  hypogeanEmblemNeeded: number = 0;
  dimensionalEmblemNeeded: number = 0;

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}
