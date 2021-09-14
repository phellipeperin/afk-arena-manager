import Podium, { PodiumTemp } from '~/application/domain/ranking/podium';
import PodiumPosition from '~/application/domain/ranking/podiumPosition';
import { Faction } from '~/application/domain/info/faction';
import { loadFactionLabel, loadGroupLabel, loadRoleLabel, loadTypeLabel } from '~/application/services/textService';
import { Type } from '~/application/domain/info/type';
import { Group } from '~/application/domain/info/group';
import { Role } from '~/application/domain/info/role';

const generatePositions = (tempList: Array<PodiumTemp>, callback: Function): Array<PodiumPosition> => {
  const positions: Array<PodiumPosition> = [];
  for (const tempPodium of tempList) {
    const value = callback(tempPodium);
    positions.push(new PodiumPosition([tempPodium.player], value));
  }
  positions.sort(function(a, b) { return b.value - a.value; });
  const mergedPositions: Array<PodiumPosition> = [];
  for (const pos of positions) {
    if (!mergedPositions.length || mergedPositions[mergedPositions.length - 1].value !== pos.value) {
      mergedPositions.push(pos);
    } else {
      mergedPositions[mergedPositions.length - 1].players.push(pos.players[0]);
    }
  }
  return mergedPositions;
};

const generatePodium = (title: string, tempList: Array<PodiumTemp>, callback: Function): Podium => {
  const positions = generatePositions(tempList, callback);
  return new Podium(title, positions[0], positions[1], positions[2]);
};

const generateLadderFactionPodiumList = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Lightbearer),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Lightbearer)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Mauler),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Mauler)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Wilder),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Wilder)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Graveborn),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Graveborn)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Celestial),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Celestial)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Hypogean),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Hypogean)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadFactionLabel(Faction.Dimensional),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.faction.find(elem => elem.classification === Faction.Dimensional)?.amount || 0,
  ));
  return podiumList;
};

const generateLadderTypePodiumList = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    loadTypeLabel(Type.STR),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.type.find(elem => elem.classification === Type.STR)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadTypeLabel(Type.DEX),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.type.find(elem => elem.classification === Type.DEX)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadTypeLabel(Type.INT),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.type.find(elem => elem.classification === Type.INT)?.amount || 0,
  ));
  return podiumList;
};

const generateLadderGroupPodiumList = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    loadGroupLabel(Group.Support),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.group.find(elem => elem.classification === Group.Support)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadGroupLabel(Group.Mage),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.group.find(elem => elem.classification === Group.Mage)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadGroupLabel(Group.Warrior),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.group.find(elem => elem.classification === Group.Warrior)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadGroupLabel(Group.Tank),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.group.find(elem => elem.classification === Group.Tank)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadGroupLabel(Group.Ranger),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.group.find(elem => elem.classification === Group.Ranger)?.amount || 0,
  ));
  return podiumList;
};

const generateLadderRolePodiumList = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    loadRoleLabel(Role.AoE),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.AoE)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Assassin),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Assassin)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Buffer),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Buffer)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.BurstDamage),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.BurstDamage)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.ContinuousDamage),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.ContinuousDamage)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Control),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Control)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Debuffer),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Debuffer)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Regeneration),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Regeneration)?.amount || 0,
  ));
  podiumList.push(generatePodium(
    loadRoleLabel(Role.Tank),
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.ladder?.role.find(elem => elem.classification === Role.Tank)?.amount || 0,
  ));
  return podiumList;
};

const generateMainStagePodium = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    'Campaign',
    tempList,
    (tempPodium: PodiumTemp) => Number(`${tempPodium.player.gameInfo.campaignMap}.${tempPodium.player.gameInfo.campaignLevel}`) || 0,
  ));
  podiumList.push(generatePodium(
    'King\'s Tower',
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.kingsTowerFloor,
  ));
  return podiumList;
};

const generateFactionTowerStagePodium = (tempList: Array<PodiumTemp>): Array<Podium> => {
  const podiumList: Array<Podium> = [];
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Lightbearer)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.lightbearerTowerFloor,
  ));
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Mauler)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.maulerTowerFloor,
  ));
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Wilder)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.wilderTowerFloor,
  ));
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Graveborn)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.gravebornTowerFloor,
  ));
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Celestial)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.celestialTowerFloor,
  ));
  podiumList.push(generatePodium(
    `${loadFactionLabel(Faction.Hypogean)}'s Tower`,
    tempList,
    (tempPodium: PodiumTemp) => tempPodium.player.gameInfo.hypogeanTowerFloor,
  ));
  return podiumList;
};

export {
  generateLadderFactionPodiumList,
  generateLadderTypePodiumList,
  generateLadderGroupPodiumList,
  generateLadderRolePodiumList,
  generateMainStagePodium,
  generateFactionTowerStagePodium,
};
