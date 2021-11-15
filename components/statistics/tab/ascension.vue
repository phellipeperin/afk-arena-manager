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

      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Information" />
          <statistics-tabs
            v-model="selectedInfoTab"
            :options="information"
          >
            <statistics-info-ascension
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
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';
import {
  generateAscensionChartStatistics,
  generateAscensionInfoStatistics,
} from '~/application/services/statistic/statisticAscensionService';

interface ComponentData {
  charts: Array<StatisticChart>;
  information: Array<StatisticAscensionInfo>;
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
        this.charts = generateAscensionChartStatistics(this.$store.getters['hero/heroList'](this.playerId));
        this.information = generateAscensionInfoStatistics(this.$store.getters['hero/heroList'](this.playerId));
        setTimeout(() => {
          this.loading = false;
          this.$forceUpdate();
        }, 50);
      },
    },
  },
  //   generateSignatureItemChartStatistics(filteredHeroList),
  //   generateFurnitureChartStatistics(filteredHeroList),
  //   generateEngraveChartStatistics(filteredHeroList),
  //   generateEquipmentChartStatistics(filteredHeroList),
  //   generateSignatureItemInfoStatistics(filteredHeroList),
  //   generateFurnitureInfoStatistics(filteredHeroList),
  //   generateEngraveInfoStatistics(filteredHeroList),
  //   generateEquipmentInfoStatistics(filteredHeroList),
  //   generateArtifactInfoStatistics(resources),
  //   generateElderTreeInfoStatistics(baseHeroList, resources),
});
</script>

<style scoped lang="scss">

</style>
