<template>
  <v-container>
    <v-row :key="containerKey">
      <v-col cols="12">
        <missing-resources-card
          :on-compare="onCompare"
          :chart-data="statistics.ascensionChart"
          title="Ascension"
        >
          <missing-resources-tabs
            v-model="selectedTabs.ascension"
            :options="statistics.ascensionInfo"
          >
            <missing-resources-info-ascension
              :on-compare="onCompare"
              :info="statistics.ascensionInfo[selectedTabs.ascension]"
            />
          </missing-resources-tabs>
        </missing-resources-card>
      </v-col>

      <v-col cols="12">
        <missing-resources-card
          :on-compare="onCompare"
          :chart-data="statistics.signatureItemChart"
          title="Signature Item"
        >
          <missing-resources-tabs
            v-model="selectedTabs.signatureItem"
            :options="statistics.signatureItemInfo"
          >
            <missing-resources-info-signature-item
              :on-compare="onCompare"
              :info="statistics.signatureItemInfo[selectedTabs.signatureItem]"
            />
          </missing-resources-tabs>
        </missing-resources-card>
      </v-col>

      <v-col cols="12">
        <missing-resources-card
          :on-compare="onCompare"
          :chart-data="statistics.furnitureChart"
          title="Furniture"
        >
          <missing-resources-tabs
            v-model="selectedTabs.furniture"
            :options="statistics.furnitureInfo"
          >
            <missing-resources-info-furniture
              :on-compare="onCompare"
              :info="statistics.furnitureInfo[selectedTabs.furniture]"
            />
          </missing-resources-tabs>
        </missing-resources-card>
      </v-col>

      <v-col cols="12">
        <missing-resources-card
          :on-compare="onCompare"
          :chart-data="statistics.equipmentChart"
          title="Equipment"
        >
          <missing-resources-tabs
            v-model="selectedTabs.equipment"
            :options="statistics.equipmentInfo"
          >
            <missing-resources-info-equipment
              :on-compare="onCompare"
              :info="statistics.equipmentInfo[selectedTabs.equipment]"
            />
          </missing-resources-tabs>
        </missing-resources-card>
      </v-col>

      <v-col cols="12">
        <missing-resources-card
          :on-compare="onCompare"
          :chart-data="statistics.engraveChart"
          title="Engrave"
        >
          <missing-resources-tabs
            v-model="selectedTabs.engrave"
            :options="statistics.engraveInfo"
          >
            <missing-resources-info-engrave
              :on-compare="onCompare"
              :info="statistics.engraveInfo[selectedTabs.engrave]"
            />
          </missing-resources-tabs>
        </missing-resources-card>
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

interface Tabs {
  ascension: number;
  signatureItem: number;
  furniture: number;
  equipment: number;
  engrave: number;
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
      },
      containerKey: 1,
    };
  },
  watch: {
    '$store.state.filter': {
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
    refresh(): void {
      this.$store.dispatch('hero/filterChange', this.$store.state.filter);
      this.statistics = generateStatistics(this.getPlayerHeroList());
      this.containerKey++;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
