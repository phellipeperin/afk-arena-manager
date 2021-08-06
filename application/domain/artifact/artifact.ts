import { ArtifactId } from '~/application/domain/artifact/artifactId';
import { Group } from '~/application/domain/info/group';

export default class Artifact {
  id: ArtifactId;
  group: Group | undefined;
  stars: number;

  constructor(id: ArtifactId, stars: number = -1) {
    this.id = id;
    this.stars = stars;

    if (this.id === ArtifactId.DurasGrave || this.id === ArtifactId.DurasEye || this.id === ArtifactId.DurasCall || this.id === ArtifactId.DurasDrape || this.id === ArtifactId.DurasBlade || this.id === ArtifactId.DurasChalice || this.id === ArtifactId.DurasConviction) {
      this.group = undefined;
    } else if (this.id === ArtifactId.Windbinder || this.id === ArtifactId.WardenArcane || this.id === ArtifactId.WingedWarden) {
      this.group = Group.Mage;
    } else if (this.id === ArtifactId.Barricade || this.id === ArtifactId.WaistbandResilience || this.id === ArtifactId.LifesLimit) {
      this.group = Group.Tank;
    } else if (this.id === ArtifactId.ChaosBringer || this.id === ArtifactId.Carnage || this.id === ArtifactId.PauldronBurningFury) {
      this.group = Group.Warrior;
    } else if (this.id === ArtifactId.ShroudVerdure || this.id === ArtifactId.VerdantLongbow) {
      this.group = Group.Ranger;
    } else if (this.id === ArtifactId.Tidebearer || this.id === ArtifactId.SeraphicTide) {
      this.group = Group.Support;
    }
  }
}
