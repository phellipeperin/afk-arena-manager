<template>
  <v-container>
    <v-row :key="containerKey">
      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :data="statistics.ascension"
          title="Ascension"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :data="statistics.signatureItem"
          title="Signature Item"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :data="statistics.furniture"
          title="Furniture"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          :data="statistics.equipment"
          title="Equipment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import Statistic from '~/application/domain/statistic/statistic';
import { generateStatistics } from '~/application/services/statistic/statisticService';

interface ComponentData {
  statistics: Statistic;
  containerKey: number;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      statistics: new Statistic(),
      containerKey: 1,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        if (this.playerId) {
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        this.$store.dispatch('hero/filterChange', this.$store.state.filter);
        this.statistics = generateStatistics(this.getPlayerHeroList());
        this.containerKey++;
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
