export default class StatisticFurnitureInfo {
  key: string;
  label: string;

  largeFurnitureNeeded: number = 0;
  smallFurnitureNeeded: number = 0;
  hangingFurnitureNeeded: number = 0;

  constructor(key: string, label: string) {
    this.key = key;
    this.label = label;
  }
}
