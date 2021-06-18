import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

const getMinNumberOfCopies = (faction: Faction, ascension: Ascension): number => {
  if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) {
    switch (ascension) {
      case Ascension.None: { return 0; }
      case Ascension.Elite: { return 1; }
      case Ascension.ElitePlus: { return 2; }
      case Ascension.Legendary: { return 2; }
      case Ascension.LegendaryPlus: { return 4; }
      case Ascension.Mythic: { return 4; }
      case Ascension.MythicPlus: { return 4; }
      case Ascension.Ascended: { return 8; }
      case Ascension.Ascended1Star: { return 10; }
      case Ascension.Ascended2Star: { return 12; }
      case Ascension.Ascended3Star: { return 14; }
      case Ascension.Ascended4Star: { return 16; }
      case Ascension.Ascended5Star: { return 18; }
    }
  }
  if (faction === Faction.Celestial || faction === Faction.Hypogean) {
    switch (ascension) {
      case Ascension.None: { return 0; }
      case Ascension.Elite: { return 1; }
      case Ascension.ElitePlus: { return 2; }
      case Ascension.Legendary: { return 4; }
      case Ascension.LegendaryPlus: { return 6; }
      case Ascension.Mythic: { return 8; }
      case Ascension.MythicPlus: { return 10; }
      case Ascension.Ascended: { return 14; }
      case Ascension.Ascended1Star: { return 16; }
      case Ascension.Ascended2Star: { return 18; }
      case Ascension.Ascended3Star: { return 20; }
      case Ascension.Ascended4Star: { return 22; }
      case Ascension.Ascended5Star: { return 24; }
    }
  }
  if (faction === Faction.Dimensional) { return 0; }
  return 0;
};

const getMaxNumberOfCopies = (faction: Faction): number => {
  if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) { return 18; }
  if (faction === Faction.Celestial || faction === Faction.Hypogean) { return 24; }
  if (faction === Faction.Dimensional) { return 0; }
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

const isFurnitureAvailable = (ascension: Ascension): boolean => {
  return ascension === Ascension.Ascended ||
    ascension === Ascension.Ascended1Star ||
    ascension === Ascension.Ascended2Star ||
    ascension === Ascension.Ascended3Star ||
    ascension === Ascension.Ascended4Star ||
    ascension === Ascension.Ascended5Star;
};

const getSignatureItemColor = (signatureItem: number): string => {
  if (signatureItem >= 0 && signatureItem < 10) { return 'elite'; }
  if (signatureItem >= 10 && signatureItem < 20) { return 'legendary'; }
  if (signatureItem >= 20 && signatureItem <= 40) { return 'mythic'; }
  return 'none';
};

export {
  getMinNumberOfCopies,
  getMaxNumberOfCopies,
  isSignatureItemAvailable,
  isFurnitureAvailable,
  getSignatureItemColor,
};
