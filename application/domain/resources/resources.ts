import ResourceElderTree from '~/application/domain/resources/resourceElderTree';
import ResourceArtifact, { Artifact } from '~/application/domain/resources/resourceArtifact';
import { Division } from '~/application/domain/info/division';

export default class Resources {
  elderTree: ResourceElderTree = new ResourceElderTree();
  artifacts: Array<ResourceArtifact> = [];

  constructor() {
    this.startElderTree();
    this.startArtifacts();
  }

  startElderTree(): void {
    this.elderTree = new ResourceElderTree();
  }

  startArtifacts(): void {
    this.artifacts = [
      new ResourceArtifact(Artifact.DURAS_BLADE, undefined),
      new ResourceArtifact(Artifact.DURAS_CALL, undefined),
      new ResourceArtifact(Artifact.DURAS_CHALICE, undefined),
      new ResourceArtifact(Artifact.DURAS_CONVICTION, undefined),
      new ResourceArtifact(Artifact.DURAS_DRAPE, undefined),
      new ResourceArtifact(Artifact.DURAS_EYE, undefined),
      new ResourceArtifact(Artifact.DURAS_GRACE, undefined),

      new ResourceArtifact(Artifact.TIDEBEARER, Division.Support),
      new ResourceArtifact(Artifact.SERAPHIC_TIDE, Division.Support),
      new ResourceArtifact(Artifact.OCEANIC_STRINGS, Division.Support),

      new ResourceArtifact(Artifact.WIND_BINDER, Division.Mage),
      new ResourceArtifact(Artifact.WARDEN_ARCANE, Division.Mage),
      new ResourceArtifact(Artifact.WINDEG_WARDEN, Division.Mage),

      new ResourceArtifact(Artifact.CHAOS_BRINGER, Division.Warrior),
      new ResourceArtifact(Artifact.CARNAGE, Division.Warrior),
      new ResourceArtifact(Artifact.PAULDRON_BURNING_FURY, Division.Warrior),

      new ResourceArtifact(Artifact.BARRICADE, Division.Tank),
      new ResourceArtifact(Artifact.WAISTBAND_RESILIENCE, Division.Tank),
      new ResourceArtifact(Artifact.LIFES_LIMIT, Division.Tank),

      new ResourceArtifact(Artifact.SHROUD_VERDURE, Division.Ranger),
      new ResourceArtifact(Artifact.VERDANT_LONGBOW, Division.Ranger),
      new ResourceArtifact(Artifact.DUAL_DIVINITY, Division.Ranger),
    ];
  }
};
