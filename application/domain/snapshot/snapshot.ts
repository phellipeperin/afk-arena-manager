export default class Snapshot {
  id: string;
  name: string;
  futureGoal: boolean;
  createdAt: number;

  constructor(
    id: string = '',
    name: string = '',
    futureGoal: boolean = false,
    createdAt: number = new Date().getTime(),
  ) {
    this.id = id;
    this.name = name;
    this.futureGoal = futureGoal;
    this.createdAt = createdAt;
  }
}
