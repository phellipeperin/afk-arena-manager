const getTotalPointsUpgradeStar = (stars: number): number => {
  switch (stars) {
    case 1: { return 8000; }
    case 2: { return 24000; }
    case 3: { return 48000; }
    case 4: { return 88000; }
    case 5: { return 160000; }
  }

  return 0;
};

export {
  getTotalPointsUpgradeStar,
};
