import { Division } from '~/application/domain/info/division';

export enum Artifact {
  DURAS_BLADE = 'DURAS_BLADE',
  DURAS_CALL = 'DURAS_CALL',
  DURAS_CHALICE = 'DURAS_CHALICE',
  DURAS_CONVICTION = 'DURAS_CONVICTION',
  DURAS_DRAPE = 'DURAS_DRAPE',
  DURAS_EYE = 'DURAS_EYE',
  DURAS_GRACE = 'DURAS_GRACE',

  TIDEBEARER = 'TIDEBEARER',
  SERAPHIC_TIDE = 'SERAPHIC_TIDE',
  OCEANIC_STRINGS = 'OCEANIC_STRINGS',

  WIND_BINDER = 'WIND_BINDER',
  WARDEN_ARCANE = 'WARDEN_ARCANE',
  WINDEG_WARDEN = 'WINDEG_WARDEN',

  CHAOS_BRINGER = 'CHAOS_BRINGER',
  CARNAGE = 'CARNAGE',
  PAULDRON_BURNING_FURY = 'PAULDRON_BURNING_FURY',

  BARRICADE = 'BARRICADE',
  WAISTBAND_RESILIENCE = 'WAISTBAND_RESILIENCE',
  LIFES_LIMIT = 'LIFES_LIMIT',

  SHROUD_VERDURE = 'SHROUD_VERDURE',
  VERDANT_LONGBOW = 'VERDANT_LONGBOW',
  DUAL_DIVINITY = 'DUAL_DIVINITY',
}

export default class ResourceArtifact {
  id: Artifact;
  division: Division | undefined;
  stars: number;

  constructor(id: Artifact, division: Division | undefined, stars: number = 0) {
    this.id = id;
    this.division = division;
    this.stars = stars;
  }
};
