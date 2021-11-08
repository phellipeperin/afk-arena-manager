import LadderItem from '~/application/domain/ladder/ladderItem';
import { Faction } from '~/application/domain/info/faction';

export default class LadderFactionItem extends LadderItem {
  faction: Faction;

  constructor(faction: Faction) {
    super();
    this.faction = faction;
  }
};
