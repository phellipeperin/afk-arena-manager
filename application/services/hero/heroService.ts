import Hero from '../../domain/hero/hero';
import { convertAscensionToNumber, convertFactionToImageUrlString } from '~/application/services/convertService';

const loadHeroImage = (hero: Hero): string => {
  const heroName = hero.systemInfo.imageUrlName;
  const faction = convertFactionToImageUrlString(hero.gameInfo.faction);
  const ascension = convertAscensionToNumber(hero.playerInfo.ascension);
  const signatureItem = hero.playerInfo.signatureItem;
  const furniture = hero.playerInfo.furniture;
  const engrave = hero.playerInfo.engrave;

  return `https://afkalc.com/_next/image?url=%2Fapi%2Fhero%3FheroImage%3D%2Fheroes%2F${heroName}.jpg%26faction%3D${faction}%26ascend%3D${ascension}%26si%3D${signatureItem}%26fi%3D${furniture}%26engrave%3D${engrave}&w=128&q=100`;
};

export {
  loadHeroImage,
};
