<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Ascension"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Signature Item"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
          title="Furniture"
        />
      </v-col>

      <v-col cols="12">
        <statistics-card
          :on-compare="onCompare"
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
import { generateStatistics } from '~/application/services/statisticService';

interface ComponentData {
  statistics: Statistic;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      statistics: new Statistic(),
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
        this.$forceUpdate();
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
