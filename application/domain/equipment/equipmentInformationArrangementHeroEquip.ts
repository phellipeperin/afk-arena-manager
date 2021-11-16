import Hero from '~/application/domain/hero/hero';
import HeroEquip from '~/application/domain/hero/hero-equip';

export default class EquipmentInformationArrangementHeroEquip {
  equipment: HeroEquip;
  possibleHeroes: Array<Hero>;

  constructor(equipment: HeroEquip, possibleHeroes: Array<Hero>) {
    this.equipment = equipment;
    this.possibleHeroes = possibleHeroes;
  }
}
