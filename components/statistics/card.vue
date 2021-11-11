<template>
  <ui-card :title="title">
    <v-container fluid>
      <v-row>
        <v-col
          v-if="chartList.length"
          cols="12"
          sm="6"
          :lg="onCompare ? 12 : 6"
        >
          <v-row no-gutters>
            <v-col
              v-for="chart in chartList"
              :key="chart.title"
              cols="12"
              :sm="onCompare ? 12 : 6"
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
          </v-row>
        </v-col>
        <v-col
          cols="12"
          :sm="!chartList.length ? 12 : 6"
          :lg="!chartList.length || onCompare ? 12 : 6"
        >
          <slot />
        </v-col>
      </v-row>
    </v-container>

    <app-dialog
      :value="dialog"
      title="Heroes"
      max-width="730"
      @input="cancel"
    >
      <div class="d-flex flex-wrap">
        <hero-list-player-item
          v-for="hero in dialogHeroList"
          :key="hero.id"
          :hero="hero"
        />
      </div>
    </app-dialog>
  </ui-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  dialog: boolean;
  dialogHeroList: Array<Hero>;
}

export default Vue.extend({
  props: {
    title: { type: String, required: false, default: '' },
    chartList: { type: Array, required: false, default: () => [] },
    onCompare: { type: Boolean, required: false, default: false },
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
    cancel(): void {
      this.dialog = false;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
