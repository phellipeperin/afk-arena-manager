import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

const getMinNumberOfCopies = (faction: Faction, awakened: boolean, ascension: Ascension): number => {
  if (awakened) {
    switch (ascension) {
      case Ascension.Legendary: { return 1; }
      case Ascension.LegendaryPlus: { return 3; }
      case Ascension.Mythic: { return 6; }
      case Ascension.MythicPlus: { return 9; }
      case Ascension.Ascended: { return 12; }
      case Ascension.Ascended1Star: { return 15; }
      case Ascension.Ascended2Star: { return 18; }
      case Ascension.Ascended3Star: { return 21; }
      case Ascension.Ascended4Star: { return 24; }
      case Ascension.Ascended5Star: { return 27; }
    }
    return 0;
  }
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

const getMaxNumberOfCopies = (faction: Faction, awakened: boolean): number => {
  if (awakened) { return 27; }
  if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) { return 18; }
  if (faction === Faction.Celestial || faction === Faction.Hypogean) { return 24; }
  if (faction === Faction.Dimensional) { return 0; }
  return 0;
};

const getNumberOfElitePlusSacsNeeded = (faction: Faction, awakened: boolean, ascension: Ascension): number => {
  if (awakened) {
    return 0;
  }
  if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) {
    switch (ascension) {
      case Ascension.None: { return 0; }
      case Ascension.Elite: { return 0; }
      case Ascension.ElitePlus: { return 0; }
      case Ascension.Legendary: { return 2; }
      case Ascension.LegendaryPlus: { return 2; }
      case Ascension.Mythic: { return 6; }
      case Ascension.MythicPlus: { return 10; }
      case Ascension.Ascended: { return 10; }
      case Ascension.Ascended1Star: { return 10; }
      case Ascension.Ascended2Star: { return 10; }
      case Ascension.Ascended3Star: { return 10; }
      case Ascension.Ascended4Star: { return 10; }
      case Ascension.Ascended5Star: { return 10; }
    }
  }
  return 0;
};

const getAscensionColor = (ascension: Ascension): string => {
  if (ascension === Ascension.Elite || ascension === Ascension.ElitePlus) { return 'elite'; }
  if (ascension === Ascension.Legendary || ascension === Ascension.LegendaryPlus) { return 'legendary'; }
  if (ascension === Ascension.Mythic || ascension === Ascension.MythicPlus) { return 'mythic'; }
  if (ascension === Ascension.Ascended ||
    ascension === Ascension.Ascended1Star ||
    ascension === Ascension.Ascended2Star ||
    ascension === Ascension.Ascended3Star ||
    ascension === Ascension.Ascended4Star ||
    ascension === Ascension.Ascended5Star) {
    return 'ascended';
  }
  return 'none';
};

const getAscensionStarColor = (engrave: number): string => {
  if (engrave < 30) { return 'starLow'; }
  if (engrave >= 30 && engrave < 60) { return 'starMedium'; }
  if (engrave >= 60 && engrave < 80) { return 'starHigh'; }
  if (engrave >= 80 && engrave <= 100) { return 'starMax'; }
  return 'starLow';
};

export {
  getMinNumberOfCopies,
  getMaxNumberOfCopies,
  getNumberOfElitePlusSacsNeeded,
  getAscensionColor,
  getAscensionStarColor,
};
