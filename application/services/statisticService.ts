import Statistic from '~/application/domain/statistic/statistic';

const generateStatistics = (tier: number): Statistic => {
  return new Statistic();
};

// Export
export {
  generateStatistics,
};
