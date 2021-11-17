<template>
  <section>
    <ui-page-help-info>
      <ui-sub-header text="Progress Table" />
      <p class="text-body-2">
        The progress table does NOT consider equipments with wrong and no faction. To re-arrange the equipments in a better position, use the arrangement section.
      </p>

      <ui-sub-header text="Arrangement" />
      <p class="text-body-2">
        There are 2 sections in arrangement, one for basic, which considers only equipments with wrong faction that can be reallocated to a right faction hero. The priority section takes in consideration only right faction equipments and arrange them according to the priority set on each hero, trying to maximize higher priority ones.
      </p>
    </ui-page-help-info>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <equipments-progress-table :player-id="$store.state.user.user.id" />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      <equipments-arrangement-tab :player-id="$store.state.user.user.id" />
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
      title: 'Equipments',
      helpInfoEnabled: true,
      tabs: ['Progress', 'Arrangement'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
