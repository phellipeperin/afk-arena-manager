import ResourceElderTree from '~/application/domain/resources/resourceElderTree';
import ResourceArtifact, { Artifact } from '~/application/domain/resources/resourceArtifact';
import { Group } from '~/application/domain/info/group';

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

      new ResourceArtifact(Artifact.TIDEBEARER, Group.Support),
      new ResourceArtifact(Artifact.SERAPHIC_TIDE, Group.Support),
      new ResourceArtifact(Artifact.OCEANIC_STRINGS, Group.Support),

      new ResourceArtifact(Artifact.WIND_BINDER, Group.Mage),
      new ResourceArtifact(Artifact.WARDEN_ARCANE, Group.Mage),
      new ResourceArtifact(Artifact.WINDEG_WARDEN, Group.Mage),

      new ResourceArtifact(Artifact.CHAOS_BRINGER, Group.Warrior),
      new ResourceArtifact(Artifact.CARNAGE, Group.Warrior),
      new ResourceArtifact(Artifact.PAULDRON_BURNING_FURY, Group.Warrior),

      new ResourceArtifact(Artifact.BARRICADE, Group.Tank),
      new ResourceArtifact(Artifact.WAISTBAND_RESILIENCE, Group.Tank),
      new ResourceArtifact(Artifact.LIFES_LIMIT, Group.Tank),

      new ResourceArtifact(Artifact.SHROUD_VERDURE, Group.Ranger),
      new ResourceArtifact(Artifact.VERDANT_LONGBOW, Group.Ranger),
      new ResourceArtifact(Artifact.DUAL_DIVINITY, Group.Ranger),
    ];
  }
};
