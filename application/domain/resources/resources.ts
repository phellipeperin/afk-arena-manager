import ResourceElderTree from '~/application/domain/resources/resourceElderTree';

export default class Resources {
  elderTree: ResourceElderTree;

  constructor() {
    this.elderTree = new ResourceElderTree();
  }
};
