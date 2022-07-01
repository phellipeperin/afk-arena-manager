import Hero from '~/application/domain/hero/hero';
import HeroEquip from '~/application/domain/hero/hero-equip';
import HeroPlayerInfo from '~/application/domain/hero/hero-player-info';

const mergeHeroList = async(collectionRef: any, contextCurrentList: Array<Hero>): Promise<Array<Hero>> => {
  const playerHeroes: Array<Hero> = (await collectionRef.get()).docs.map((doc: any) => new Hero(doc.id, undefined, undefined, doc.data() as HeroPlayerInfo));

  const mergedHeroes: Array<Hero> = [];
  for (const hero of contextCurrentList) {
    const index = playerHeroes.findIndex(elem => elem.id === hero.id);
    let heroPlayerInfo: HeroPlayerInfo = new HeroPlayerInfo();
    if (index === -1) {
      await collectionRef.doc(hero.id).set(JSON.parse(JSON.stringify(new HeroPlayerInfo())));
    } else {
      heroPlayerInfo = playerHeroes[index].playerInfo;
    }
    mergedHeroes.push(new Hero(hero.id, hero.gameInfo, hero.systemInfo, heroPlayerInfo));
  }

  return mergedHeroes;
};

const convertFirebaseHeroList = (list: Array<Hero>): Array<Hero> => {
  const newList: Array<Hero> = [];
  for (const hero of list) {
    const newHero: Hero = new Hero(hero.id, { ...hero.gameInfo }, { ...hero.systemInfo }, { ...hero.playerInfo });

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

    newList.push(newHero);
  }
  return newList;
};

export {
  mergeHeroList,
  convertFirebaseHeroList,
};
