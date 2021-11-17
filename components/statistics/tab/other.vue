<template>
  <article>
    <ui-skeleton-loader v-if="loading" />

    <v-container
      v-else
      fluid
    >
      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Elder Tree" />
          <statistics-tabs
            v-model="selectedElderTreeInfoTab"
            :options="elderTreeInformation"
          >
            <statistics-info-elder-tree
              :compact="compact"
              :info="elderTreeInformation[selectedElderTreeInfoTab]"
            />
          </statistics-tabs>
        </v-col>
      </v-row>

      <v-divider class="my-8" />

      <v-row>
        <v-col cols="12">
          <ui-sub-header text="Artifacts" />
          <statistics-tabs
            v-model="selectedArtifactInfoTab"
            :options="artifactInformation"
          >
            <statistics-info-artifact
              :compact="compact"
              :info="artifactInformation[selectedArtifactInfoTab]"
            />
          </statistics-tabs>
        </v-col>
      </v-row>
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticElderTreeInfo from '~/application/domain/statistic/info/statisticElderTreeInfo';
import StatisticArtifactInfo from '~/application/domain/statistic/info/statisticArtifactInfo';
import { generateElderTreeInfoStatistics } from '~/application/services/statistic/statisticElderTreeService';
import { generateArtifactInfoStatistics } from '~/application/services/statistic/statisticArtifactService';

interface ComponentData {
  elderTreeInformation: Array<StatisticElderTreeInfo>;
  artifactInformation: Array<StatisticArtifactInfo>;
  selectedElderTreeInfoTab: number;
  selectedArtifactInfoTab: number;
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      elderTreeInformation: [],
      artifactInformation: [],
      selectedElderTreeInfoTab: 0,
      selectedArtifactInfoTab: 0,
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
        const resources = this.$store.getters['resource/playerResources'](this.playerId);
        this.elderTreeInformation = generateElderTreeInfoStatistics(this.$store.getters['hero/baseHeroList'](this.playerId), resources);
        this.artifactInformation = generateArtifactInfoStatistics(resources);
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
