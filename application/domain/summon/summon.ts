export enum SummonStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  VALIDATING = 'VALIDATING',
  DONE = 'DONE',
}

export default class Summon {
  id: string;
  label: string;
  status: SummonStatus;
  data: any;

  constructor(id: string = '', label: string = '', status: SummonStatus = SummonStatus.IN_PROGRESS, data: any = {}) {
    this.id = id;
    this.label = label;
    this.status = status;
    this.data = data;
  }
}
