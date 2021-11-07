<template>
  <div>
    <apexchart
      v-if="data && data.length"
      type="bar"
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
        // labels: [],
        // colors: [],
        // chart: {
        //   fontFamily: 'Source Sans Pro, sans-serif',
        // },
        // fill: {
        //   type: 'gradient',
        //   gradient: {
        //     shade: 'dark',
        //     type: 'horizontal',
        //     shadeIntensity: 0.2,
        //     stops: [0, 100],
        //   },
        // },
      },
      series: [],
    };
  },
  created(): void {
    this.series = [{
      name: 'PRODUCT A',
      data: [44, 55, 41, 67, 22, 43],
    }, {
      name: 'PRODUCT B',
      data: [13, 23, 20, 8, 13, 27],
    }, {
      name: 'PRODUCT C',
      data: [11, 17, 15, 15, 21, 14],
    }, {
      name: 'PRODUCT D',
      data: [21, 7, 25, 13, 22, 8],
    }];
    // this.data?.forEach((item) => {
    //   const convertedItem = item as StatisticChartItem;
    //   this.series.push(convertedItem.amount);
    //   this.options.labels.push(convertedItem.label);
    //   this.options.colors.push(convertedItem.color);
    // });
  },
});
</script>

<style scoped lang="scss">

</style>
