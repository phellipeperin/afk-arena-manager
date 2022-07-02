export default class HeroObjectiveMissingResources {
  copies: number = 0;
  sacs: number = 0;
  eliteEmblem: number = 0;
  legendaryEmblem: number = 0;
  mythicEmblem: number = 0;
  poeCoin: number = 0;
  shards: number = 0;
  cores: number = 0;

  public setCopies(amount: number) {
    this.copies = amount;
  }

  public setSacs(amount: number) {
    this.sacs = amount;
  }

  public setEliteEmblem(amount: number) {
    this.eliteEmblem = amount;
  }

  public setLegendaryEmblem(amount: number) {
    this.legendaryEmblem = amount;
  }

  public setMythicEmblem(amount: number) {
    this.mythicEmblem = amount;
  }

  public setPoeCoin(amount: number) {
    this.poeCoin = amount;
  }

  public setShards(amount: number) {
    this.shards = amount;
  }

  public setCores(amount: number) {
    this.cores = amount;
  }

  public addCopies(amount: number) {
    this.copies += amount;
  }

  public addSacs(amount: number) {
    this.sacs += amount;
  }

  public addEliteEmblem(amount: number) {
    this.eliteEmblem += amount;
  }

  public addLegendaryEmblem(amount: number) {
    this.legendaryEmblem += amount;
  }

  public addMythicEmblem(amount: number) {
    this.mythicEmblem += amount;
  }

  public addPoeCoin(amount: number) {
    this.poeCoin += amount;
  }

  public addShards(amount: number) {
    this.shards += amount;
  }

  public addCores(amount: number) {
    this.cores += amount;
  }
}
