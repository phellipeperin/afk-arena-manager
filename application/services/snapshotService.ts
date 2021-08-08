import Hero from '~/application/domain/hero/hero';
import SnapshotHeroDiff from '~/application/domain/snapshot/snapshotHeroDiff';

const getSnapshotHeroesDifference = (snapshotHeroList: Array<Hero>, playerHeroList: Array<Hero>): Array<SnapshotHeroDiff> => {
  const diff: Array<SnapshotHeroDiff> = [];
  console.log(snapshotHeroList);
  console.log(playerHeroList);
  return diff;
};

// Export
export {
  getSnapshotHeroesDifference,
};
