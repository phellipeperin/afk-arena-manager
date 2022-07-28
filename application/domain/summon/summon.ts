export enum SummonStatus {
  IN_PROGRESS = 'ON_GOING',
  VALIDATING = 'VALIDATING',
  DONE = 'DONE',
}

export default class Summon {
  id: string;
  label: string;
  status: SummonStatus;

  constructor(id: string = '', label: string = '', status: SummonStatus = SummonStatus.IN_PROGRESS) {
    this.id = id;
    this.label = label;
    this.status = status;
  }
}
