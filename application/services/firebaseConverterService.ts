import Hero from '~/application/domain/hero/hero';
import HeroSkin from '~/application/domain/hero/hero-skin';
import HeroEquip from '~/application/domain/hero/hero-equip';

const convertFirebaseHeroList = (list: Array<Hero>): Array<Hero> => {
  const newList: Array<Hero> = [];
  for (const hero of list) {
    const newHero: Hero = new Hero(hero.id, { ...hero.gameInfo }, { ...hero.systemInfo }, { ...hero.playerInfo });

    newHero.gameInfo.skins = [];
    for (const skin of hero.gameInfo.skins) {
      newHero.gameInfo.skins.push(new HeroSkin(skin.id, skin.name, skin.profileImage));
    }

    if (newHero.gameInfo.awakened === undefined) {
      newHero.gameInfo.awakened = false;
    }

    newHero.playerInfo.equipment = [];
    for (const equip of hero.playerInfo.equipment) {
      newHero.playerInfo.equipment.push(new HeroEquip(equip.type, equip.faction, equip.tier, equip.stars));
    }

    if (newHero.playerInfo.engrave === undefined || newHero.playerInfo.engrave === -1) {
      newHero.playerInfo.engrave = 0;
    }

    if (!newHero.playerInfo.priority) {
      newHero.playerInfo.priority = 0;
    }

    newList.push(newHero);
  }
  return newList;
};

export {
  convertFirebaseHeroList,
};
