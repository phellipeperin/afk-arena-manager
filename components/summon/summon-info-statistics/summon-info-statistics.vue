<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Stones"
          color="info"
          :item="data.stones"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Superb Stones"
          color="info"
          :item="data.superbStones"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Normal"
          color="info"
          :item="data.normal"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Faction"
          color="info"
          :item="data.faction"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Companion"
          color="info"
          :item="data.companion"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Hero Choice"
          color="info"
          :item="data.heroChoice"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Stargazer"
          color="accent"
          :item="data.stargazer"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Temple of Time"
          color="legendary"
          :item="data.timeTemple"
        />
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Furniture"
          color="mythic"
          :item="data.furniture"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <summon-info-statistics-card
          label="Totals"
          hide-percentage
          :item="data.totals"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import SummonPulls from '~/application/domain/summon/summonPulls';
import SummonStatistics from '~/application/domain/summon/summonStatistics';
import { generateSummonStatistics } from '~/application/services/summon/summonStatistic';

interface ComponentData {
  data: SummonStatistics;
}

export default Vue.extend({
  props: {
    pulls: { type: SummonPulls, required: true },
  },
  data(): ComponentData {
    return {
      data: new SummonStatistics(),
    };
  },
  created(): void {
    this.data = generateSummonStatistics(this.pulls);
  },
});
</script>

<style scoped lang="scss">

</style>
