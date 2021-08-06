import Artifact from '~/application/domain/artifact/artifact';
import { ArtifactId } from '~/application/domain/artifact/artifactId';

export default class UserProgressInfo {
  artifacts: Array<Artifact>;

  constructor(artifacts: Array<Artifact> = []) {
    this.artifacts = artifacts;

    if (!this.artifacts.length) {
      this.artifacts = [
        new Artifact(ArtifactId.DurasGrace),
        new Artifact(ArtifactId.DurasEye),
        new Artifact(ArtifactId.DurasCall),
        new Artifact(ArtifactId.DurasDrape),
        new Artifact(ArtifactId.DurasBlade),
        new Artifact(ArtifactId.DurasChalice),
        new Artifact(ArtifactId.DurasConviction),

        new Artifact(ArtifactId.Windbinder),
        new Artifact(ArtifactId.WardenArcane),
        new Artifact(ArtifactId.WingedWarden),

        new Artifact(ArtifactId.Barricade),
        new Artifact(ArtifactId.WaistbandResilience),
        new Artifact(ArtifactId.LifesLimit),

        new Artifact(ArtifactId.ChaosBringer),
        new Artifact(ArtifactId.Carnage),
        new Artifact(ArtifactId.PauldronBurningFury),

        new Artifact(ArtifactId.ShroudVerdure),
        new Artifact(ArtifactId.VerdantLongbow),

        new Artifact(ArtifactId.Tidebearer),
        new Artifact(ArtifactId.SeraphicTide),
      ];
    }
  }
}
