import Hero from '~/application/domain/hero/hero';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import EquipmentInformationProgressCollection
  from '~/application/domain/equipment/equipmentInformationProgressCollection';
import EquipmentInformationProgressEquipItem
  from '~/application/domain/equipment/equipmentInformationProgressEquipItem';

const generateEquipItem = (heroList: Array<Hero>, faction: Faction, type: Type, equipType: HeroEquipType): EquipmentInformationProgressEquipItem => {
  const info: EquipmentInformationProgressEquipItem = new EquipmentInformationProgressEquipItem(equipType);
  const filteredHeroList = heroList.filter((hero: Hero) => hero.gameInfo.faction === faction && hero.gameInfo.type === type);
  filteredHeroList.forEach((hero: Hero) => {
    const tier = hero.playerInfo.equipment.find((equip: HeroEquip) => equip.type === equipType)?.tier || -1;
    if (tier === -1) {
      info.values.notAcquired += 1;
    } else if (tier === 0) {
      info.values.t0 += 1;
    } else if (tier === 1) {
      info.values.t1 += 1;
    } else if (tier === 2) {
      info.values.t2 += 1;
    } else if (tier === 3) {
      info.values.t3 += 1;
    }
    info.values.total += 1;
  });
  return info;
};

const generateInfosByFactionAndType = (heroList: Array<Hero>, faction: Faction, type: Type): EquipmentInformationProgress => {
  const info: EquipmentInformationProgress = new EquipmentInformationProgress(faction, type);
  info.items.push(generateEquipItem(heroList, faction, type, HeroEquipType.Weapon));
  info.items.push(generateEquipItem(heroList, faction, type, HeroEquipType.Head));
  info.items.push(generateEquipItem(heroList, faction, type, HeroEquipType.Chest));
  info.items.push(generateEquipItem(heroList, faction, type, HeroEquipType.Feet));
  return info;
};

const generateInfosByFaction = (heroList: Array<Hero>, faction: Faction): Array<EquipmentInformationProgress> => {
  const list: Array<EquipmentInformationProgress> = [];
  list.push(generateInfosByFactionAndType(heroList, faction, Type.STR));
  list.push(generateInfosByFactionAndType(heroList, faction, Type.DEX));
  list.push(generateInfosByFactionAndType(heroList, faction, Type.INT));
  return list;
};

const generateEquipmentInformationProgress = (heroList: Array<Hero>): EquipmentInformationProgressCollection => {
  const data = new EquipmentInformationProgressCollection();
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Lightbearer)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Mauler)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Wilder)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Graveborn)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Celestial)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Hypogean)];
  data.list = [...data.list, ...generateInfosByFaction(heroList, Faction.Dimensional)];
  return data;
};

export {
  generateEquipmentInformationProgress,
};
