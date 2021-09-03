export default class UserGameInfo {
  playerLevel: number;
  crystalLevel: number;

  campaignMap: number;
  campaignLevel: number;
  kingsTowerFloor: number;
  lightbearerTowerFloor: number;
  maulerTowerFloor: number;
  wilderTowerFloor: number;
  gravebornTowerFloor: number;
  celestialTowerFloor: number;
  hypogeanTowerFloor: number;

  constructor() {
    this.playerLevel = 0;
    this.crystalLevel = 0;

    this.campaignMap = 0;
    this.campaignLevel = 0;
    this.kingsTowerFloor = 0;
    this.lightbearerTowerFloor = 0;
    this.maulerTowerFloor = 0;
    this.wilderTowerFloor = 0;
    this.gravebornTowerFloor = 0;
    this.celestialTowerFloor = 0;
    this.hypogeanTowerFloor = 0;
  }
}
