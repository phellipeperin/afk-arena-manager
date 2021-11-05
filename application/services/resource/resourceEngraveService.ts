import { Ascension } from '~/application/domain/info/ascension';

const getNumberOfEngraveShardsNeeded = (engrave: number): number => {
  if (engrave >= 30) { return 3750; }
  if (engrave >= 1 && engrave <= 3) { return engrave * 50; }
  if (engrave >= 4 && engrave <= 6) { return 150 + (engrave - 3) * 100; }
  if (engrave >= 7 && engrave <= 9) { return 450 + (engrave - 6) * 150; }
  if (engrave >= 10 && engrave <= 12) { return 900 + (engrave - 9) * 200; }
  if (engrave >= 13 && engrave <= 15) { return 1500 + (engrave - 12) * 250; }
  if (engrave >= 16 && engrave <= 20) { return 2250 + (engrave - 15) * 50; }
  if (engrave >= 21 && engrave <= 25) { return 2500 + (engrave - 20) * 100; }
  if (engrave >= 26 && engrave <= 30) { return 3000 + (engrave - 25) * 150; }
  return 0;
};

const getNumberOfEngraveCoresNeeded = (engrave: number): number => {
  if (engrave <= 30) { return 0; }
  if (engrave >= 31 && engrave <= 33) { return engrave * 50; }
  if (engrave >= 34 && engrave <= 36) { return 150 + (engrave - 33) * 100; }
  if (engrave >= 37 && engrave <= 39) { return 450 + (engrave - 36) * 150; }
  if (engrave >= 40 && engrave <= 42) { return 900 + (engrave - 39) * 200; }
  if (engrave >= 43 && engrave <= 45) { return 1500 + (engrave - 42) * 250; }
  if (engrave >= 46 && engrave <= 50) { return 2250 + (engrave - 45) * 50; }
  if (engrave >= 51 && engrave <= 55) { return 2500 + (engrave - 50) * 150; }
  if (engrave >= 56 && engrave <= 60) { return 3250 + (engrave - 55) * 250; }
  if (engrave >= 61 && engrave <= 80) { return 4500 + (engrave - 60) * 300; }
  if (engrave >= 81 && engrave <= 86) { return 10500 + (engrave - 80) * 350; }
  if (engrave >= 87 && engrave <= 100) { return 12600 + (engrave - 86) * 400; }
  return 0;
};

const isEngraveAvailable = (ascension: Ascension): boolean => {
  return ascension === Ascension.Ascended1Star ||
    ascension === Ascension.Ascended2Star ||
    ascension === Ascension.Ascended3Star ||
    ascension === Ascension.Ascended4Star ||
    ascension === Ascension.Ascended5Star;
};

const getEngraveColor = (engrave: number): string => {
  if (engrave >= 1 && engrave < 30) { return 'starLow'; }
  if (engrave >= 30 && engrave < 60) { return 'starMedium'; }
  if (engrave >= 60 && engrave < 80) { return 'starHigh'; }
  if (engrave >= 80 && engrave <= 100) { return 'starMax'; }
  return 'none';
};

export {
  getNumberOfEngraveShardsNeeded,
  getNumberOfEngraveCoresNeeded,
  isEngraveAvailable,
  getEngraveColor,
};
