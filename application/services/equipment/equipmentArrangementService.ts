import Hero from '~/application/domain/hero/hero';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import { Ascension } from '~/application/domain/info/ascension';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';
import EquipmentInformationArrangementHeroEquip
  from '~/application/domain/equipment/equipmentInformationArrangementHeroEquip';
import EquipmentInformationArrangementHero from '~/application/domain/equipment/equipmentInformationArrangementHero';

const generateEquipmentInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  const arrangement = new EquipmentInformationArrangement();
  heroList.filter((hero: Hero) => hero.playerInfo.ascension !== Ascension.None).forEach((hero: Hero) => {
    const infoHero = new EquipmentInformationArrangementHero(hero);
    const { faction: heroFaction } = hero.gameInfo;
    const filteredEquipList = hero.playerInfo.equipment.filter((heroEquip: HeroEquip) => heroEquip.tier >= 0 && heroEquip.faction !== Faction.None && heroEquip.faction !== heroFaction);
    filteredEquipList.forEach((heroEquip: HeroEquip) => {
      const heroesWithSameCriteria = heroList.filter((innerHero: Hero) => innerHero.gameInfo.faction === heroEquip.faction && innerHero.gameInfo.type === hero.gameInfo.type && innerHero.playerInfo.ascension !== Ascension.None);
      const possibleHeroes = heroesWithSameCriteria.filter((innerHero: Hero) => {
        const innerHeroEquip = innerHero.playerInfo.equipment.find((innerEquip: HeroEquip) => innerEquip.type === heroEquip.type);
        return innerHeroEquip?.tier === -1 || innerHeroEquip?.faction !== innerHero.gameInfo.faction;
      });
      if (possibleHeroes && possibleHeroes.length) {
        infoHero.equipments.push(new EquipmentInformationArrangementHeroEquip(heroEquip, possibleHeroes));
      }
    });

    if (infoHero.equipments.length) {
      arrangement.list.push(infoHero);
    }
  });
  console.log(arrangement);
  return arrangement;
};

export {
  generateEquipmentInformationArrangement,
};
