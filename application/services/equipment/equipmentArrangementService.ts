import Hero from '~/application/domain/hero/hero';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import { Ascension } from '~/application/domain/info/ascension';
import HeroEquip from '~/application/domain/hero/hero-equip';
import { Faction } from '~/application/domain/info/faction';
import EquipmentInformationArrangementHeroEquip
  from '~/application/domain/equipment/equipmentInformationArrangementHeroEquip';
import EquipmentInformationArrangementHero from '~/application/domain/equipment/equipmentInformationArrangementHero';

const generateEquipmentExtraInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  const arrangement = new EquipmentInformationArrangement();
  heroList.filter((hero: Hero) => hero.playerInfo.ascension !== Ascension.None).forEach((hero: Hero) => {
    const infoHero = new EquipmentInformationArrangementHero(hero);
    const filteredEquipList = hero.playerInfo.equipment.filter((heroEquip: HeroEquip) => heroEquip.tier >= 0 && heroEquip.tier < 3 && heroEquip.faction !== Faction.None && heroEquip.faction !== hero.gameInfo.faction);
    filteredEquipList.forEach((heroEquip: HeroEquip) => {
      const possibleHeroes = heroList.filter((innerHero: Hero) => innerHero.gameInfo.type === hero.gameInfo.type && innerHero.id !== hero.id);
      const possibleHeroesWithCorrectEquipment = possibleHeroes.filter((innerHero: Hero) => {
        const innerHeroEquip = innerHero.playerInfo.equipment.find((innerEquip: HeroEquip) => innerEquip.type === heroEquip.type);
        return innerHeroEquip?.tier !== -1 && innerHeroEquip?.faction === innerHero.gameInfo.faction;
      });
      if (possibleHeroes.length === possibleHeroesWithCorrectEquipment.length) {
        infoHero.equipments.push(new EquipmentInformationArrangementHeroEquip(heroEquip, []));
      }
    });

    if (infoHero.equipments.length) {
      arrangement.list.push(infoHero);
    }
  });
  return arrangement;
};

const generateEquipmentResetInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  const arrangement = new EquipmentInformationArrangement();
  heroList.filter((hero: Hero) => hero.playerInfo.ascension !== Ascension.None).forEach((hero: Hero) => {
    const infoHero = new EquipmentInformationArrangementHero(hero);
    const filteredEquipList = hero.playerInfo.equipment.filter((heroEquip: HeroEquip) => heroEquip.tier >= 0 && heroEquip.tier < 3 && heroEquip.faction !== Faction.None && heroEquip.faction !== hero.gameInfo.faction);
    filteredEquipList.forEach((heroEquip: HeroEquip) => {
      const possibleHeroesGivenCriteria = heroList.filter((innerHero: Hero) => heroEquip.faction !== Faction.None && innerHero.gameInfo.faction !== heroEquip.faction && innerHero.gameInfo.faction !== Faction.Dimensional && innerHero.gameInfo.type === hero.gameInfo.type);
      const possibleHeroes = possibleHeroesGivenCriteria.filter((innerHero: Hero) => {
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
  return arrangement;
};

const generateEquipmentPriorityInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  const arrangement = new EquipmentInformationArrangement();
  heroList.filter((hero: Hero) => hero.playerInfo.ascension !== Ascension.None).forEach((hero: Hero) => {
    const infoHero = new EquipmentInformationArrangementHero(hero);

    const allSimilarHeroes = heroList.filter((innerHero: Hero) => innerHero.gameInfo.faction === hero.gameInfo.faction && innerHero.gameInfo.type === hero.gameInfo.type && innerHero.id !== hero.id);
    const higherPrioritySimilarHeroes = allSimilarHeroes.filter((innerHero: Hero) => innerHero.playerInfo.priority > hero.playerInfo.priority);
    if (higherPrioritySimilarHeroes.length) {
      const filteredEquipList = hero.playerInfo.equipment.filter((heroEquip: HeroEquip) => heroEquip.tier >= 0 && heroEquip.tier < 3 && heroEquip.faction === hero.gameInfo.faction);
      filteredEquipList.forEach((heroEquip: HeroEquip) => {
        const possibleHeroes: Array<Hero> = [];
        higherPrioritySimilarHeroes.forEach((innerHero: Hero) => {
          const similarHeroEquip = innerHero.playerInfo.equipment.find((innerHeroEquip: HeroEquip) => innerHeroEquip.type === heroEquip.type) || new HeroEquip();
          if (similarHeroEquip.tier < heroEquip.tier) {
            possibleHeroes.push(innerHero);
          }
        });
        if (possibleHeroes.length) {
          infoHero.equipments.push(new EquipmentInformationArrangementHeroEquip(heroEquip, possibleHeroes));
        }
      });
    }

    if (infoHero.equipments.length) {
      arrangement.list.push(infoHero);
    }
  });
  return arrangement;
};

const generateEquipmentBasicInformationArrangement = (heroList: Array<Hero>): EquipmentInformationArrangement => {
  const arrangement = new EquipmentInformationArrangement();
  heroList.filter((hero: Hero) => hero.playerInfo.ascension !== Ascension.None).forEach((hero: Hero) => {
    const infoHero = new EquipmentInformationArrangementHero(hero);
    const filteredEquipList = hero.playerInfo.equipment.filter((heroEquip: HeroEquip) => heroEquip.tier >= 0 && heroEquip.tier < 3 && heroEquip.faction !== Faction.None && heroEquip.faction !== hero.gameInfo.faction);
    filteredEquipList.forEach((heroEquip: HeroEquip) => {
      const heroesWithSameCriteria = heroList.filter((innerHero: Hero) => innerHero.gameInfo.faction === heroEquip.faction && innerHero.gameInfo.type === hero.gameInfo.type);
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
  return arrangement;
};

export {
  generateEquipmentBasicInformationArrangement,
  generateEquipmentPriorityInformationArrangement,
  generateEquipmentResetInformationArrangement,
  generateEquipmentExtraInformationArrangement,
};
