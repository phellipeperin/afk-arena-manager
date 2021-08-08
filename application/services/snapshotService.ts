import Hero from '~/application/domain/hero/hero';
import SnapshotHeroDiff from '~/application/domain/snapshot/snapshotHeroDiff';

const getPastSnapshotHeroesDifference = (snapshotHeroList: Array<Hero>, playerHeroList: Array<Hero>): Array<SnapshotHeroDiff> => {
  const diff: Array<SnapshotHeroDiff> = [];
  playerHeroList.forEach((playerHero: Hero) => {
    const snapshotHero = snapshotHeroList.find((elem: Hero) => elem.id === playerHero.id);
    const newDiff = new SnapshotHeroDiff(snapshotHero);

    // TODO

    if (newDiff.hasAnyDifference()) {
      diff.push(newDiff);
    }
  });
  return diff;
};

const getFutureSnapshotHeroesDifference = (snapshotHeroList: Array<Hero>, playerHeroList: Array<Hero>): Array<SnapshotHeroDiff> => {
  const diff: Array<SnapshotHeroDiff> = [];
  playerHeroList.forEach((playerHero: Hero) => {
    const snapshotHero = snapshotHeroList.find((elem: Hero) => elem.id === playerHero.id);
    const newDiff = new SnapshotHeroDiff(snapshotHero);

    // TODO

    if (newDiff.hasAnyDifference()) {
      diff.push(newDiff);
    }
  });
  return diff;
};

// Export
export {
  getPastSnapshotHeroesDifference,
  getFutureSnapshotHeroesDifference,
};
