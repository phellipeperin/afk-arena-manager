import Hero from '~/application/domain/hero/hero';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import EquipmentInformationProgressItem from '~/application/domain/equipment/equipmentInformationProgressItem';
import { Faction } from '~/application/domain/info/faction';
import { Type } from '~/application/domain/info/type';

const generateEquipmentInformationProgress = (heroList: Array<Hero>): EquipmentInformationProgress => {
  const data = new EquipmentInformationProgress();

  data.list.push(new EquipmentInformationProgressItem(Faction.Lightbearer, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Lightbearer, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Lightbearer, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Mauler, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Mauler, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Mauler, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Wilder, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Wilder, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Wilder, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Graveborn, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Graveborn, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Graveborn, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Celestial, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Celestial, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Celestial, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Hypogean, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Hypogean, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Hypogean, Type.INT));

  data.list.push(new EquipmentInformationProgressItem(Faction.Dimensional, Type.STR));
  data.list.push(new EquipmentInformationProgressItem(Faction.Dimensional, Type.DEX));
  data.list.push(new EquipmentInformationProgressItem(Faction.Dimensional, Type.INT));

  return data;
};

export {
  generateEquipmentInformationProgress,
};
