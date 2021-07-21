<template>
  <div>
    <apexchart
      type="donut"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticItem from '~/application/domain/statistic/statisticItem';

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
      },
      series: [],
    };
  },
  created(): void {
    this.data.forEach((item: StatisticItem) => {
      this.series.push(item.amount);
      this.options.labels.push(item.label);
      this.options.colors.push(item.color);
    });
  },
});
</script>

<style scoped lang="scss">

</style>
