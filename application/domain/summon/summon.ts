import SummonPulls from '~/application/domain/summon/summonPulls';

export enum SummonStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  VALIDATING = 'VALIDATING',
  DONE = 'DONE',
}

export default class Summon {
  id: string;
  label: string;
  status: SummonStatus;
  data: SummonPulls;

  constructor(id: string = '', label: string = '', status: SummonStatus = SummonStatus.IN_PROGRESS, data: SummonPulls = new SummonPulls()) {
    this.id = id;
    this.label = label;
    this.status = status;
    this.data = data;
  }
}
