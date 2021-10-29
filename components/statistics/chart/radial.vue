<template>
  <div>
    <apexchart
      v-if="data && data.length"
      type="radialBar"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticChartItem from '~/application/domain/statistic/statisticChartItem';

interface ComponentData {
  options: any;
  series: Array<number>;
}

export default Vue.extend({
  props: {
    data: { type: Array, required: true },
  },
  data(): ComponentData {
    return {
      options: {
        legend: {
          show: false,
        },
        labels: [],
        colors: [],
        chart: {
          fontFamily: 'Source Sans Pro, sans-serif',
        },
        // fill: {
        //   type: 'gradient',
        //   gradient: {
        //     shade: 'dark',
        //     type: 'vertical',
        //     shadeIntensity: 0.5,
        //     stops: [0, 100],
        //   },
        // },
      },
      series: [],
    };
  },
  created(): void {
    this.data?.forEach((item) => {
      const convertedItem = item as StatisticChartItem;
      this.series.push(convertedItem.amount);
      this.options.labels.push(convertedItem.label);
      this.options.colors.push(convertedItem.color);
    });
  },
});
</script>

<style scoped lang="scss">

</style>
