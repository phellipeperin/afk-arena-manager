import Hero from '../../domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import { convertAscensionToNumber, convertFactionToImageUrlString } from '~/application/services/convertService';

const loadHeroImage = (hero: Hero, ascension?: Ascension, signatureItem = hero.playerInfo.signatureItem, furniture = hero.playerInfo.furniture, engrave = hero.playerInfo.engrave): string => {
  const heroName = hero.systemInfo.imageUrlName;
  const faction = convertFactionToImageUrlString(hero.gameInfo.faction);
  const convertedAscension = convertAscensionToNumber(ascension || hero.playerInfo.ascension);

  return `https://afkalc.com/_next/image?url=%2Fapi%2Fhero%3FheroImage%3D%2Fheroes%2F${heroName}.jpg%26faction%3D${faction}%26ascend%3D${convertedAscension}%26si%3D${signatureItem}%26fi%3D${furniture}%26engrave%3D${engrave}&w=128&q=100`;
};

export {
  loadHeroImage,
};
