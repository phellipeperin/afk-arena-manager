import { Faction } from '~/application/domain/info/faction';
import { Group } from '~/application/domain/info/group';
import { Type } from '~/application/domain/info/type';
import { Role } from '~/application/domain/info/role';

export default class LadderItem {
  classification: Faction | Group | Type | Role;
  amount: number;

  constructor(
    classification: Faction | Group | Type | Role,
    amount: number = 0,
  ) {
    this.classification = classification;
    this.amount = amount;
  }
};
