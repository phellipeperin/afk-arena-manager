export interface ArtifactCost {
  gold: number;
  fragments: number;
}

const getArtifactTotalCost = (isDurasArtifact: boolean, stars: number): ArtifactCost => {
  let gold = 0;
  let fragments = 0;

  if (isDurasArtifact) {
    switch (stars) {
      case 1: { gold = 600000; fragments = 20; break; }
      case 2: { gold = 2100000; fragments = 70; break; }
      case 3: { gold = 6600000; fragments = 220; break; }
      case 4: { gold = 15600000; fragments = 520; break; }
      case 5: { gold = 33600000; fragments = 1020; break; }
    }
  } else {
    switch (stars) {
      case 1: { gold = 600000; fragments = 300; break; }
      case 2: { gold = 2100000; fragments = 600; break; }
      case 3: { gold = 6600000; fragments = 900; break; }
      case 4: { gold = 15600000; fragments = 1300; break; }
      case 5: { gold = 33600000; fragments = 1800; break; }
    }
  }

  return { gold, fragments };
};

export {
  getArtifactTotalCost,
};
