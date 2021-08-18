import Hero from '~/application/domain/hero/hero';
import SnapshotHeroDiff from '~/application/domain/snapshot/snapshotHeroDiff';
import { loadAscensionLabel } from '~/application/services/textService';
import HeroEquip from '~/application/domain/hero/hero-equip';

const getPastSnapshotHeroesDifference = (snapshotHeroList: Array<Hero>, playerHeroList: Array<Hero>): Array<SnapshotHeroDiff> => {
  const diff: Array<SnapshotHeroDiff> = [];
  playerHeroList.forEach((playerHero: Hero) => {
    const snapshotHero = snapshotHeroList.find((elem: Hero) => elem.id === playerHero.id) || new Hero();
    const newDiff = new SnapshotHeroDiff(snapshotHero);

    const { ascension, signatureItem, engrave, numberOfCopies, equipment, furniture } = playerHero.playerInfo;
    const {
      ascension: snapshotAscension,
      signatureItem: snapshotSignatureItem,
      engrave: snapshotEngrave,
      numberOfCopies: snapshotNumberOfCopies,
      equipment: snapshotEquipment,
      furniture: snapshotFurniture,
    } = snapshotHero.playerInfo;

    if (ascension !== snapshotAscension) {
      newDiff.addDifference(`
        <b>Ascension</b><br>
        ${loadAscensionLabel(snapshotAscension)} -- ${loadAscensionLabel(ascension)}
      `);
    }
    if (signatureItem !== snapshotSignatureItem) {
      newDiff.addDifference(`
        <b>Signature Item</b><br>
        ${snapshotSignatureItem === -1 ? 'NA' : snapshotSignatureItem} -- ${signatureItem === -1 ? 'NA' : signatureItem}
      `);
    }
    if (engrave !== snapshotEngrave) {
      newDiff.addDifference(`
        <b>Engrave</b><br>
        ${snapshotEngrave} -- ${engrave}
      `);
    }
    if (numberOfCopies !== snapshotNumberOfCopies) {
      newDiff.addDifference(`
        <b>Number of Copies</b><br>
        ${snapshotNumberOfCopies} -- ${numberOfCopies}
      `);
    }

    let currentUnlockedFurniture = 0;
    let currentTotalFurniture = 0;
    let previousUnlockedFurniture = 0;
    let previousTotalFurniture = 0;
    furniture.forEach((furnitureItem) => {
      if (furnitureItem.plus >= 0) {
        currentUnlockedFurniture++;
        currentTotalFurniture += furnitureItem.plus;
      }
    });
    snapshotFurniture.forEach((furnitureItem) => {
      if (furnitureItem.plus >= 0) {
        previousUnlockedFurniture++;
        previousTotalFurniture += furnitureItem.plus;
      }
    });
    if (currentUnlockedFurniture !== previousUnlockedFurniture || currentTotalFurniture !== previousTotalFurniture) {
      const unlockedDiff = currentUnlockedFurniture !== previousUnlockedFurniture ? `Unlocked: ${previousUnlockedFurniture} -- ${currentUnlockedFurniture}/9<br>` : '';
      const totalDiff = currentTotalFurniture !== previousTotalFurniture ? `Total: ${previousUnlockedFurniture} -- ${currentUnlockedFurniture}/36` : '';
      newDiff.addDifference(`
        <b>Furniture</b><br>
        ${unlockedDiff}
        ${totalDiff}
      `);
    }

    let equipDiff: string = '';
    equipment.forEach((equipItem) => {
      const snapEquipItem: HeroEquip = snapshotEquipment.find(elem => elem.type === equipItem.type) || new HeroEquip();
      if (equipItem.tier !== snapEquipItem.tier) {
        const previousTier = snapEquipItem.tier === -1 ? 'NA' : `T${snapEquipItem.tier}`;
        const currentTier = equipItem.tier === -1 ? 'NA' : `T${equipItem.tier}`;
        equipDiff += `${equipItem.type}: ${previousTier} -- ${currentTier}<br>`;
      }
    });
    if (equipDiff) {
      newDiff.addDifference(`
        <b>Equipment</b><br>
        ${equipDiff}
      `);
    }

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
