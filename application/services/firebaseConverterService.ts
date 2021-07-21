import Hero from '~/application/domain/hero/hero';
import HeroSkin from '~/application/domain/hero/hero-skin';
import HeroEquip from '~/application/domain/hero/hero-equip';
import HeroFurniture from '~/application/domain/hero/hero-furniture';

const convertFirebaseHeroList = (list: Array<Hero>): Array<Hero> => {
  const newList: Array<Hero> = [];
  for (const hero of list) {
    const newHero: Hero = new Hero(hero.id, { ...hero.gameInfo }, { ...hero.systemInfo }, { ...hero.playerInfo });

    newHero.gameInfo.skins = [];
    for (const skin of hero.gameInfo.skins) {
      newHero.gameInfo.skins.push(new HeroSkin(skin.id, skin.name, skin.profileImage));
    }

    newHero.playerInfo.equipment = [];
    for (const equip of hero.playerInfo.equipment) {
      newHero.playerInfo.equipment.push(new HeroEquip(equip.type, equip.faction, equip.tier, equip.stars));
    }

    newHero.playerInfo.furniture = [];
    for (const furniture of hero.playerInfo.furniture) {
      newHero.playerInfo.furniture.push(new HeroFurniture(furniture.pos, furniture.type, furniture.plus));
    }

    if (newHero.playerInfo.engrave === undefined) {
      newHero.playerInfo.engrave = -1;
    }

    newList.push(newHero);
  }
  return newList;
};

export {
  convertFirebaseHeroList,
};
