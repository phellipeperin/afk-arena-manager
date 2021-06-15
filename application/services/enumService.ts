// @ts-nocheck
import { Element } from '../domain/base/Element';
import { Rarity } from '../domain/base/Rarity';
import { Role } from '../domain/base/Role';
import { Race } from '../domain/hero/HeroGameInfo';
import { ResourceType } from '../domain/resource/Resource';
import { OfferSection, OfferPeriod } from '../domain/offer/Offer';
import { StageMapCollectionType } from '../domain/stage/Stage';

const getElementValues = (): Array<Element> => Object.keys(Element).map((k) => Element[k]);
const getRarityValues = (): Array<Rarity> => Object.keys(Rarity).map((k) => Rarity[k]);
const getRoleValues = (): Array<Role> => Object.keys(Role).map((k) => Role[k]);
const getRaceValues = (): Array<Race> => Object.keys(Race).map((k) => Race[k]);
const getResourceTypeValues = (): Array<ResourceType> => Object.keys(ResourceType).map((k) => ResourceType[k]);
const getOfferSectionValues = (): Array<OfferSection> => Object.keys(OfferSection).map((k) => OfferSection[k]);
const getOfferPeriodValues = (): Array<OfferPeriod> => Object.keys(OfferPeriod).map((k) => OfferPeriod[k]);
const getStageMapCollectionValues = (): Array<StageMapCollectionType> => Object.keys(StageMapCollectionType).map((k) => StageMapCollectionType[k]);

export {
  getElementValues,
  getRarityValues,
  getRoleValues,
  getRaceValues,
  getResourceTypeValues,
  getOfferSectionValues,
  getOfferPeriodValues,
  getStageMapCollectionValues,
};
