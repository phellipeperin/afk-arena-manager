import { Ascension } from '../info/ascension';

export default class HeroPlayerInfo {
  ascension: Ascension;
  signatureItem: number; // -1 to 30 (or 40)
  // TODO furniture, equipment
  onCrystal: boolean;
  numberOfCopies: number;
  // TODO skins

  constructor() {
    this.ascension = Ascension.None;
    this.signatureItem = -1;
    this.numberOfCopies = 0;
    this.onCrystal = false;
  }
}
