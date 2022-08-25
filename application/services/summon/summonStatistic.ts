import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonStatistics from '~/application/domain/summon/summonStatistics';
import SummonStatisticsItem from '~/application/domain/summon/summonStatisticsItem';

const generateSummonStatistics = (pulls: SummonPulls): SummonStatistics => {
  const statistics = new SummonStatistics();
  statistics.stones = new SummonStatisticsItem(
    pulls.stones.total,
    pulls.stones.normal.length,
    pulls.stones.celepogean.length,
    pulls.stones.awakened.length,
    pulls.stones.mythicFurniture.length,
    pulls.stones.cardHero.length,
    pulls.stones.cardFurniture.length,
  );
  statistics.superbStones = new SummonStatisticsItem(
    pulls.superbStones.total,
    pulls.superbStones.normal.length,
    pulls.superbStones.celepogean.length,
    pulls.superbStones.awakened.length,
    pulls.superbStones.mythicFurniture.length,
    pulls.superbStones.cardHero.length,
    pulls.superbStones.cardFurniture.length,
  );
  statistics.normal = new SummonStatisticsItem(
    pulls.normal.total,
    pulls.normal.normal.length,
    pulls.normal.celepogean.length,
    pulls.normal.awakened.length,
    pulls.normal.mythicFurniture.length,
    pulls.normal.cardHero.length,
    pulls.normal.cardFurniture.length,
  );
  statistics.faction = new SummonStatisticsItem(
    pulls.faction.total,
    pulls.faction.normal.length,
    pulls.faction.celepogean.length,
    pulls.faction.awakened.length,
    pulls.faction.mythicFurniture.length,
    pulls.faction.cardHero.length,
    pulls.faction.cardFurniture.length,
  );
  statistics.companion = new SummonStatisticsItem(
    pulls.companion.total,
    pulls.companion.normal.length,
    pulls.companion.celepogean.length,
    pulls.companion.awakened.length,
    pulls.companion.mythicFurniture.length,
    pulls.companion.cardHero.length,
    pulls.companion.cardFurniture.length,
  );
  statistics.heroChoice = new SummonStatisticsItem(
    pulls.heroChoice.total,
    pulls.heroChoice.normal.length,
    pulls.heroChoice.celepogean.length,
    pulls.heroChoice.awakened.length,
    pulls.heroChoice.mythicFurniture.length,
    pulls.heroChoice.cardHero.length,
    pulls.heroChoice.cardFurniture.length,
  );
  statistics.stargazer = new SummonStatisticsItem(
    pulls.stargazer.total,
    pulls.stargazer.normal.length,
    pulls.stargazer.celepogean.length,
    pulls.stargazer.awakened.length,
    pulls.stargazer.mythicFurniture.length,
    pulls.stargazer.cardHero.length,
    pulls.stargazer.cardFurniture.length,
  );
  statistics.timeTemple = new SummonStatisticsItem(
    pulls.timeTemple.total,
    pulls.timeTemple.normal.length,
    pulls.timeTemple.celepogean.length,
    pulls.timeTemple.awakened.length,
    pulls.timeTemple.mythicFurniture.length,
    pulls.timeTemple.cardHero.length,
    pulls.timeTemple.cardFurniture.length,
  );
  statistics.furniture = new SummonStatisticsItem(
    pulls.furniture.total,
    pulls.furniture.normal.length,
    pulls.furniture.celepogean.length,
    pulls.furniture.awakened.length,
    pulls.furniture.mythicFurniture.length,
    pulls.furniture.cardHero.length,
    pulls.furniture.cardFurniture.length,
  );
  statistics.totals = new SummonStatisticsItem(
    pulls.stones.total + pulls.normal.total + pulls.faction.total + pulls.companion.total + pulls.heroChoice.total + pulls.stargazer.total + pulls.timeTemple.total + pulls.furniture.total + pulls.cards.total,
    pulls.stones.normal.length + pulls.normal.normal.length + pulls.faction.normal.length + pulls.companion.normal.length + pulls.heroChoice.normal.length + pulls.stargazer.normal.length + pulls.timeTemple.normal.length + pulls.furniture.normal.length + pulls.cards.normal.length,
    pulls.stones.celepogean.length + pulls.normal.celepogean.length + pulls.faction.celepogean.length + pulls.companion.celepogean.length + pulls.heroChoice.celepogean.length + pulls.stargazer.celepogean.length + pulls.timeTemple.celepogean.length + pulls.furniture.celepogean.length + pulls.cards.celepogean.length,
    pulls.stones.awakened.length + pulls.normal.awakened.length + pulls.faction.awakened.length + pulls.companion.awakened.length + pulls.heroChoice.awakened.length + pulls.stargazer.awakened.length + pulls.timeTemple.awakened.length + pulls.furniture.awakened.length + pulls.cards.awakened.length,
    pulls.stones.mythicFurniture.length + pulls.normal.mythicFurniture.length + pulls.faction.mythicFurniture.length + pulls.companion.mythicFurniture.length + pulls.heroChoice.mythicFurniture.length + pulls.stargazer.mythicFurniture.length + pulls.timeTemple.mythicFurniture.length + pulls.furniture.mythicFurniture.length + pulls.cards.mythicFurniture.length,
    pulls.stones.cardHero.length + pulls.normal.cardHero.length + pulls.faction.cardHero.length + pulls.companion.cardHero.length + pulls.heroChoice.cardHero.length + pulls.stargazer.cardHero.length + pulls.timeTemple.cardHero.length + pulls.furniture.cardHero.length + pulls.cards.cardHero.length,
    pulls.stones.cardFurniture.length + pulls.normal.cardFurniture.length + pulls.faction.cardFurniture.length + pulls.companion.cardFurniture.length + pulls.heroChoice.cardFurniture.length + pulls.stargazer.cardFurniture.length + pulls.timeTemple.cardFurniture.length + pulls.furniture.cardFurniture.length + pulls.cards.cardFurniture.length,
  );
  return statistics;
};

export {
  generateSummonStatistics,
};
