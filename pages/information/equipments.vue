<template>
  <section>
    <ui-page-help-info>
      <p class="text-body-2">
        The progress table does NOT consider equipments with wrong and no faction. To re-arrange the equipments in a better position, use the arrangement section.
      </p>
    </ui-page-help-info>

    <ui-content-container
      v-show="$store.state.system.pageState.selectedTab === 0"
      :loading="loading"
    >
      <equipments-progress-table :data="information.progress" />
    </ui-content-container>

    <ui-content-container
      v-show="$store.state.system.pageState.selectedTab === 1"
      :loading="loading"
    >
      <equipments-arrangement :data="information.arrangement" />
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import EquipmentInformation from '~/application/domain/equipment/equipmentInformation';
import Hero from '~/application/domain/hero/hero';
import { generateEquipmentInformation } from '~/application/services/equipment/equipmentService';

Vue.use(VueApexCharts);
Vue.component('Apexchart', VueApexCharts);

interface ComponentData {
  information: EquipmentInformation;
  loading: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformation(),
      loading: true,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        this.loading = true;
        if (this.$store.state.user.user.id) {
          const heroList = this.getBasePlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.$store.state.user.user.id);
          }
        }
        this.refresh();
      },
    },
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Equipments',
      helpInfoEnabled: true,
      tabs: ['Progress', 'Arrangement'],
    });
  },
  methods: {
    getBasePlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](this.$store.state.user.user.id);
    },
    refresh(): void {
      this.loading = true;
      this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      this.information = generateEquipmentInformation(this.getBasePlayerHeroList());
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
