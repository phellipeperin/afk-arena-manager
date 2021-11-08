<template>
  <v-container fluid>
    <v-row
      v-if="loading"
      class="pa-4"
    >
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col cols="12">
        <v-tabs
          :value="selectedTab"
          @change="changeTabs"
        >
          <v-tab>
            Progress
          </v-tab>
          <v-tab>
            Arrangement
          </v-tab>
        </v-tabs>

        <equipments-progress-table
          v-show="selectedTab === 0"
          :data="information.progress"
        />
        <equipments-arrangement
          v-show="selectedTab === 1"
          :data="information.arrangement"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import EquipmentInformation from '~/application/domain/equipment/equipmentInformation';
import { generateEquipmentInformation } from '~/application/services/equipment/equipmentService';

interface ComponentData {
  information: EquipmentInformation;
  selectedTab: number;
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    showFilter: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformation(),
      selectedTab: 0,
      loading: true,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        this.loading = true;
        if (this.playerId) {
          const heroList = this.getBasePlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        this.refresh();
      },
    },
  },
  methods: {
    getBasePlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](this.playerId);
    },
    refresh(): void {
      this.loading = true;
      this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      this.information = generateEquipmentInformation(this.getBasePlayerHeroList());
      setTimeout(() => {
        this.loading = false;
      }, 50);
    },
    changeTabs(index: number): void {
      this.selectedTab = index;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
