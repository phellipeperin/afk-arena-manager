import { Ascension } from '~/application/domain/info/ascension';

const isFurnitureAvailable = (ascension: Ascension): boolean => {
  return ascension === Ascension.Ascended ||
    ascension === Ascension.Ascended1Star ||
    ascension === Ascension.Ascended2Star ||
    ascension === Ascension.Ascended3Star ||
    ascension === Ascension.Ascended4Star ||
    ascension === Ascension.Ascended5Star;
};

const getFurnitureColor = (furniture: number): string => {
  if (furniture === 0) { return 'none'; }
  if (furniture === 36) { return 'mythicMaxed'; }
  return 'mythic';
};

export {
  isFurnitureAvailable,
  getFurnitureColor,
};
