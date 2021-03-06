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

const getNumberOfEliteSacsNeeded = (faction: Faction, awakened: boolean, ascension: Ascension): number => {
  if (awakened) {
    return 0;
  }
  if (faction === Faction.Lightbearer || faction === Faction.Mauler || faction === Faction.Wilder || faction === Faction.Graveborn) {
    switch (ascension) {
      case Ascension.None: { return 0; }
      case Ascension.Elite: { return 0; }
      case Ascension.ElitePlus: { return 0; }
      case Ascension.Legendary: { return 4; }
      case Ascension.LegendaryPlus: { return 4; }
      case Ascension.Mythic: { return 12; }
      case Ascension.MythicPlus: { return 20; }
      case Ascension.Ascended: { return 20; }
      case Ascension.Ascended1Star: { return 20; }
      case Ascension.Ascended2Star: { return 20; }
      case Ascension.Ascended3Star: { return 20; }
      case Ascension.Ascended4Star: { return 20; }
      case Ascension.Ascended5Star: { return 20; }
    }
  }
  return 0;
};

export {
  getMinNumberOfCopies,
  getMaxNumberOfCopies,
  getNumberOfEliteSacsNeeded,
};
