<template>
  <article>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Charts" />
          <v-row>
            <statistics-chart
              v-for="chart in charts"
              :key="chart.title"
              :chart="chart"
              :compact="compact"
            />
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="my-8" />

      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Information" />
          <statistics-tabs
            v-model="selectedInfoTab"
            :options="information"
          >
            <statistics-info-furniture
              :compact="compact"
              :info="information[selectedInfoTab]"
            />
          </statistics-tabs>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticChart from '~/application/domain/statistic/statisticChart';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import { generateFurnitureChartStatistics, generateFurnitureInfoStatistics } from '~/application/services/statistic/statisticFurnitureService';

interface ComponentData {
  charts: Array<StatisticChart>;
  information: Array<StatisticFurnitureInfo>;
  selectedInfoTab: number;
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      charts: [],
      information: [],
      selectedInfoTab: 0,
      loading: true,
    };
  },
  watch: {
    '$store.state.filter.current': {
      deep: true,
      immediate: true,
      handler(): void {
        this.loading = true;
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        this.charts = generateFurnitureChartStatistics(this.$store.getters['hero/heroList'](this.playerId));
        this.information = generateFurnitureInfoStatistics(this.$store.getters['hero/heroList'](this.playerId));
        setTimeout(() => {
          this.loading = false;
          this.$forceUpdate();
        }, 50);
      },
    },
  },
});
</script>

<style scoped lang="scss">

</style>
