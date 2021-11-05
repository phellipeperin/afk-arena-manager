import { Ascension } from '~/application/domain/info/ascension';

const getNumberOfEliteEmblemsNeeded = (plus: number): number => {
  if (plus >= 10) { return 220; }
  switch (plus) {
    case -1: { return 0; }
    case 0: { return 20; }
    case 1: { return 30; }
    case 2: { return 40; }
    case 3: { return 50; }
    case 4: { return 60; }
    case 5: { return 75; }
    case 6: { return 95; }
    case 7: { return 115; }
    case 8: { return 140; }
    case 9: { return 170; }
  }
  return 0;
};

const getNumberOfLegendaryEmblemsNeeded = (plus: number): number => {
  if (plus <= 10) { return 0; }
  if (plus >= 20) { return 240; }
  switch (plus) {
    case 11: { return 10; }
    case 12: { return 20; }
    case 13: { return 35; }
    case 14: { return 50; }
    case 15: { return 70; }
    case 16: { return 95; }
    case 17: { return 120; }
    case 18: { return 150; }
    case 19: { return 190; }
  }
  return 0;
};

const getNumberOfMythicEmblemsNeeded = (plus: number): number => {
  if (plus <= 20) { return 0; }
  switch (plus) {
    case 21: { return 10; }
    case 22: { return 30; }
    case 23: { return 50; }
    case 24: { return 70; }
    case 25: { return 100; }
    case 26: { return 130; }
    case 27: { return 170; }
    case 28: { return 210; }
    case 29: { return 250; }
    case 30: { return 300; }
    case 31: { return 350; }
    case 32: { return 400; }
    case 33: { return 450; }
    case 34: { return 510; }
    case 35: { return 580; }
    case 36: { return 660; }
    case 37: { return 750; }
    case 38: { return 870; }
    case 39: { return 1050; }
    case 40: { return 1350; }
  }
  return 0;
};

const isSignatureItemAvailable = (ascension: Ascension): boolean => {
  return ascension === Ascension.Mythic ||
    ascension === Ascension.MythicPlus ||
    ascension === Ascension.Ascended ||
    ascension === Ascension.Ascended1Star ||
    ascension === Ascension.Ascended2Star ||
    ascension === Ascension.Ascended3Star ||
    ascension === Ascension.Ascended4Star ||
    ascension === Ascension.Ascended5Star;
};

const getSignatureItemColor = (signatureItem: number): string => {
  if (signatureItem >= 0 && signatureItem < 10) { return 'elite'; }
  if (signatureItem >= 10 && signatureItem < 20) { return 'legendary'; }
  if (signatureItem >= 20 && signatureItem < 30) { return 'mythic'; }
  if (signatureItem >= 30 && signatureItem <= 40) { return 'mythicMaxed'; }
  return 'none';
};

export {
  getNumberOfEliteEmblemsNeeded,
  getNumberOfLegendaryEmblemsNeeded,
  getNumberOfMythicEmblemsNeeded,
  isSignatureItemAvailable,
  getSignatureItemColor,
};
