import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

const convertAscensionToNumber = (option: Ascension): number => {
  switch (option) {
    case Ascension.None: { return 0; }
    case Ascension.Elite: { return 1; }
    case Ascension.ElitePlus: { return 2; }
    case Ascension.Legendary: { return 3; }
    case Ascension.LegendaryPlus: { return 4; }
    case Ascension.Mythic: { return 5; }
    case Ascension.MythicPlus: { return 6; }
    case Ascension.Ascended: { return 7; }
    case Ascension.Ascended1Star: { return 8; }
    case Ascension.Ascended2Star: { return 9; }
    case Ascension.Ascended3Star: { return 10; }
    case Ascension.Ascended4Star: { return 11; }
    case Ascension.Ascended5Star: { return 12; }
  }
  return 0;
};

const convertFactionToImageUrlString = (option: Faction): string => {
  switch (option) {
    case Faction.None: { return ''; }
    case Faction.Lightbearer: { return 'lightbearers'; }
    case Faction.Mauler: { return 'maulers'; }
    case Faction.Wilder: { return 'wilders'; }
    case Faction.Graveborn: { return 'graveborns'; }
    case Faction.Celestial: { return 'celestials'; }
    case Faction.Hypogean: { return 'hypogeans'; }
    case Faction.Dimensional: { return 'dimensionals'; }
  }
  return '';
};

export {
  convertAscensionToNumber,
  convertFactionToImageUrlString,
};
