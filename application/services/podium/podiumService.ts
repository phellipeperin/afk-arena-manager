import Podium, { LadderPodiumTemp } from '~/application/domain/ranking/podium';
import PodiumPosition from '~/application/domain/ranking/podiumPosition';
import { Faction } from '~/application/domain/info/faction';
import { loadFactionLabel } from '~/application/services/textService';

// const generatePositions = (): Array<PodiumPosition> => {
//   const positions: Array<PodiumPosition> = [];
//   for (const tempPodium of tempList) {
//     const value = tempPodium.ladder.faction.find(elem => elem.classification === Faction.Lightbearer)?.amount || 0;
//     positions.push(new PodiumPosition([tempPodium.player], value));
//   }
// };

const generateLadderFactionPodiumList = (tempList: Array<LadderPodiumTemp>): Array<Podium> => {
  const positions: Array<PodiumPosition> = [];
  for (const tempPodium of tempList) {
    const value = tempPodium.ladder.faction.find(elem => elem.classification === Faction.Lightbearer)?.amount || 0;
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
  return [new Podium(loadFactionLabel(Faction.Lightbearer), mergedPositions[0], mergedPositions[1], mergedPositions[2])];
};

const generateLadderTypePodiumList = (tempList: Array<LadderPodiumTemp>): Array<Podium> => {
  return [];
};

const generateLadderGroupPodiumList = (tempList: Array<LadderPodiumTemp>): Array<Podium> => {
  return [];
};

const generateLadderRolePodiumList = (tempList: Array<LadderPodiumTemp>): Array<Podium> => {
  return [];
};

export {
  generateLadderFactionPodiumList,
  generateLadderTypePodiumList,
  generateLadderGroupPodiumList,
  generateLadderRolePodiumList,
};
