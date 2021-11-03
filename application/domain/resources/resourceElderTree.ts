export default class ResourceElderTree {
  support: number = 0;
  mage: number = 0;
  warrior: number = 0;
  tank: number = 0;
  ranger: number = 0;
};

export interface ResourceElderTreeMain {
  level: number;
  droplets: number;
}
