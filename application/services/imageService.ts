// Domain Imports
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';

// Image Imports
const lightbearer = require('~/assets/images/faction/lightbearer.png');
const mauler = require('~/assets/images/faction/mauler.png');
const wilder = require('~/assets/images/faction/lightbearer.png');
const graveborn = require('~/assets/images/faction/graveborn.png');
const celestial = require('~/assets/images/faction/celestial.png');
const hypogean = require('~/assets/images/faction/hypogean.png');
const dimensional = require('~/assets/images/faction/dimensional.png');

const loadFactionImage = (option: Faction) => {
  switch (option) {
    case Faction.Lightbearer: { return lightbearer; }
    case Faction.Mauler: { return mauler; }
    case Faction.Wilder: { return wilder; }
    case Faction.Graveborn: { return graveborn; }
    case Faction.Celestial: { return celestial; }
    case Faction.Hypogean: { return hypogean; }
    case Faction.Dimensional: { return dimensional; }
  }
  return '';
};

export {
  loadFactionImage,
};
