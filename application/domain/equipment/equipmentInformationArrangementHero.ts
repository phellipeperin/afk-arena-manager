import Hero from '~/application/domain/hero/hero';
import EquipmentInformationArrangementHeroEquip
  from '~/application/domain/equipment/equipmentInformationArrangementHeroEquip';

export default class EquipmentInformationArrangementHero {
  hero: Hero;
  equipments: Array<EquipmentInformationArrangementHeroEquip>;

  constructor(hero: Hero) {
    this.hero = hero;
    this.equipments = [];
  }
}
