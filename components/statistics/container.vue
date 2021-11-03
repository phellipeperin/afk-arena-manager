<template>
  <v-container>
    <v-row :key="containerKey">
      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :chart-list="statistics.ascensionChartList"
          title="Ascension"
        >
          <statistics-tabs
            v-model="selectedTabs.ascension"
            :options="statistics.ascensionInfo"
          >
            <statistics-info-ascension
              :on-compare="onCompare"
              :info="statistics.ascensionInfo[selectedTabs.ascension]"
            />
          </statistics-tabs>
        </statistics-card>
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :chart-list="statistics.signatureItemChartList"
          title="Signature Item"
        >
          <statistics-tabs
            v-model="selectedTabs.signatureItem"
            :options="statistics.signatureItemInfo"
          >
            <statistics-info-signature-item
              :on-compare="onCompare"
              :info="statistics.signatureItemInfo[selectedTabs.signatureItem]"
            />
          </statistics-tabs>
        </statistics-card>
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :chart-list="statistics.furnitureChartList"
          title="Furniture"
        >
          <statistics-tabs
            v-model="selectedTabs.furniture"
            :options="statistics.furnitureInfo"
          >
            <statistics-info-furniture
              :on-compare="onCompare"
              :info="statistics.furnitureInfo[selectedTabs.furniture]"
            />
          </statistics-tabs>
        </statistics-card>
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :chart-list="statistics.engraveChartList"
          title="Engrave"
        >
          <statistics-tabs
            v-model="selectedTabs.engrave"
            :options="statistics.engraveInfo"
          >
            <statistics-info-engrave
              :on-compare="onCompare"
              :info="statistics.engraveInfo[selectedTabs.engrave]"
            />
          </statistics-tabs>
        </statistics-card>
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :chart-list="statistics.equipmentChartList"
          title="Equipment"
        >
          <statistics-tabs
            v-model="selectedTabs.equipment"
            :options="statistics.equipmentInfo"
          >
            <statistics-info-equipment
              :on-compare="onCompare"
              :info="statistics.equipmentInfo[selectedTabs.equipment]"
            />
          </statistics-tabs>
        </statistics-card>
      </v-col>

      <v-col cols="12">
        <v-row no-gutters>
          <v-col
            cols="12"
            md="6"
          >
            <statistics-card
              :on-compare="onCompare"
              title="Elder Tree"
            >
              <statistics-tabs
                v-model="selectedTabs.elderTree"
                :options="statistics.elderTreeInfo"
              >
                <statistics-info-elder-tree
                  :on-compare="onCompare"
                  :info="statistics.elderTreeInfo[selectedTabs.elderTree]"
                />
              </statistics-tabs>
            </statistics-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <hero-filter v-if="showFilter" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';
import { generateStatistics } from '~/application/services/statistic/statisticService';
import Resources from '~/application/domain/resources/resources';

interface Tabs {
  ascension: number;
  signatureItem: number;
  furniture: number;
  equipment: number;
  engrave: number;
  elderTree: number;
}

interface ComponentData {
  statistics: Statistic;
  selectedTabs: Tabs;
  containerKey: number;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    showFilter: { type: Boolean, required: false, default: false },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      statistics: new Statistic(),
      selectedTabs: {
        ascension: 0,
        signatureItem: 0,
        furniture: 0,
        equipment: 0,
        engrave: 0,
        elderTree: 0,
      },
      containerKey: 1,
    };
  },
  watch: {
    '$store.state.filter.current': {
      deep: true,
      immediate: true,
      handler(): void {
        this.refresh();
      },
    },
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        if (this.playerId) {
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        this.refresh();
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
    getPlayerResources(): Resources {
      return this.$store.getters['resource/playerResources'](this.playerId);
    },
    refresh(): void {
      this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      this.statistics = generateStatistics(this.getPlayerHeroList(), this.getPlayerResources());
      this.containerKey++;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
