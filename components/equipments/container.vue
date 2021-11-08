<template>
  <v-container fluid>
    <v-row :key="containerKey">
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
          v-show="selectedTab === 2"
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
  containerKey: number;
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
      containerKey: 1,
    };
  },
  watch: {
    '$store.state.filter.current': {
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
      this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      this.information = generateEquipmentInformation(this.getBasePlayerHeroList());
      this.containerKey++;
    },
    changeTabs(index: number): void {
      this.selectedTab = index;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
