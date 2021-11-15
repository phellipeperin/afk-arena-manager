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

    <app-dialog
      :value="dialog"
      title="Heroes"
      max-width="730"
      @input="closeDialog"
    >
      <div class="d-flex flex-wrap">
        <hero-list-player-item
          v-for="hero in dialogHeroList"
          :key="hero.id"
          :hero="hero"
        />
      </div>
    </app-dialog>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticChart from '~/application/domain/statistic/statisticChart';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  dialog: boolean;
  dialogHeroList: Array<Hero>;
}

export default Vue.extend({
  props: {
    chart: { type: StatisticChart, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      dialog: false,
      dialogHeroList: [],
    };
  },
  methods: {
    openDialog(heroList: Array<Hero>): void {
      this.dialogHeroList = heroList;
      this.dialog = true;
    },
    closeDialog(): void {
      this.dialog = false;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
