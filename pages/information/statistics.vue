<template>
  <section>
    <ui-page-help-info>
      <p class="text-body-2">
        Progress charts show how much the percentage of resources you already used to fully maximize that category.
      </p>
      <p class="text-body-2">
        For example, let's suppose the copies, to take a non-celepogean hero to ascended is necessary 8 copies. If you already acquired 6 of the hero, you have 75% of the copies. The value on the chart is the average of this calculation for all the heroes.
      </p>
      <p class="text-body-2">
        Another important example is that even if you have no heroes +40, you probably have progress anyway in this regard, because bringing a hero to +30 consumes the same resource.
      </p>
    </ui-page-help-info>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <statistics-tab-ascension
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      <statistics-tab-signature-item
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 2">
      <statistics-tab-furniture
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 3">
      <statistics-tab-engrave
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 4">
      <statistics-tab-equipment
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 5">
      <statistics-tab-other
        :player-id="$store.state.user.user.id"
        :compact="$store.state.compare.onCompare"
      />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';

Vue.use(VueApexCharts);
Vue.component('Apexchart', VueApexCharts);

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Statistics',
      heroFilterEnabled: true,
      compareEnabled: true,
      helpInfoEnabled: true,
      tabs: ['Ascension', 'Signature Item', 'Furniture', 'Engrave', 'Equipment', 'Other'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
