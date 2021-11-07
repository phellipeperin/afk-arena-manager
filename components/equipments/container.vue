<template>
  <v-container fluid :key="containerKey">
    <v-row>
      <v-col cols="12">
        <ui-sub-header text="Progress Table" />
        <equipments-progress-table :data="information.progress" />
      </v-col>
    </v-row>

<!--    <v-row>-->
<!--      <v-col cols="12">-->
<!--        <ui-sub-header text="Arrangement" />-->
<!--        <equipments-arrangement :data="information.arrangement" />-->
<!--      </v-col>-->
<!--    </v-row>-->

    <hero-filter v-if="showFilter" />
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import EquipmentInformation from '~/application/domain/equipment/equipmentInformation';
import { generateEquipmentInformation } from '~/application/services/equipment/equipmentService';

interface ComponentData {
  information: EquipmentInformation;
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
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
          }
        }
        this.refresh();
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
    refresh(): void {
      this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
      this.information = generateEquipmentInformation(this.getPlayerHeroList());
      this.containerKey++;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
