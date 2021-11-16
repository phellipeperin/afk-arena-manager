<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <section
      v-else
      class="progress-table"
    >
      <ui-no-result
        v-if="!information.list.length"
        text="It seems you are all good !!"
      />
      <v-container
        v-else
        fluid
      >
        <v-row>
          <equipments-arrangement-hero
            v-for="heroInfo in information.list"
            :key="heroInfo.hero.id"
            :info="heroInfo"
          />
        </v-row>
      </v-container>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationArrangement from '~/application/domain/equipment/equipmentInformationArrangement';
import { generateEquipmentInformationArrangement } from '~/application/services/equipment/equipmentArrangementService';

interface ComponentData {
  information: EquipmentInformationArrangement;
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformationArrangement(),
      loading: true,
    };
  },
  created(): void {
    this.information = generateEquipmentInformationArrangement(this.$store.getters['hero/baseHeroList'](this.playerId));
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">

</style>
