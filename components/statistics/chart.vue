<template>
  <v-col
    cols="12"
    :sm="compact ? 12 : 6"
    :md="compact ? 12 : 4"
    :lg="compact ? 12 : 3"
  >
    <ui-sub-header :text="chart.title" />
    <statistics-chart-donut
      v-if="chart.type === 'DONUT'"
      :data="chart.data"
      @showList="openDialog"
    />
    <statistics-chart-radial
      v-if="chart.type === 'RADIAL'"
      :data="chart.data"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticChart from '~/application/domain/statistic/statisticChart';

interface ComponentData {
  dialog: boolean;
}

export default Vue.extend({
  props: {
    chart: { type: StatisticChart, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      dialog: false,
    };
  },
  methods: {
    openDialog(): void {
      this.dialog = true;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
