<template>
  <section>
    <ui-card-skeleton-loader v-if="loading" />
    <v-simple-table
      v-else
      class="progress-table"
    >
      <thead>
        <tr>
          <th style="width: 8%;" />
          <th style="width: 23%;">
            <img
              :src="strImage"
              alt="str"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            <img
              :src="dexImage"
              alt="dex"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            <img
              :src="intImage"
              alt="int"
              class="type-image"
            >
          </th>
          <th style="width: 23%;">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        <equipments-progress-table-row
          :data="information"
          :faction="lightbearerFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="maulerFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="wilderFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="gravebornFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="celestialFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="hypogeanFaction"
        />
        <equipments-progress-table-row
          :data="information"
          :faction="dimensionalFaction"
        />
        <equipments-progress-table-row :data="information" />
      </tbody>
    </v-simple-table>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadTypeImage } from '~/application/services/imageService';
import { Type } from '~/application/domain/info/type';
import EquipmentInformationProgressCollection from '~/application/domain/equipment/equipmentInformationProgressCollection';
import { Faction } from '~/application/domain/info/faction';
import { generateEquipmentInformationProgress } from '~/application/services/equipment/equipmentProgressService';

interface ComponentData {
  information: EquipmentInformationProgressCollection;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      information: new EquipmentInformationProgressCollection(),
      loading: true,
    };
  },
  computed: {
    strImage(): string { return loadTypeImage(Type.STR); },
    dexImage(): string { return loadTypeImage(Type.DEX); },
    intImage(): string { return loadTypeImage(Type.INT); },

    lightbearerFaction(): Faction { return Faction.Lightbearer; },
    maulerFaction(): Faction { return Faction.Mauler; },
    wilderFaction(): Faction { return Faction.Wilder; },
    gravebornFaction(): Faction { return Faction.Graveborn; },
    celestialFaction(): Faction { return Faction.Celestial; },
    hypogeanFaction(): Faction { return Faction.Hypogean; },
    dimensionalFaction(): Faction { return Faction.Dimensional; },
  },
  created(): void {
    this.information = generateEquipmentInformationProgress(this.$store.getters['hero/baseHeroList'](this.playerId));
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">
.progress-table {
  background-color: transparent;

  th {
    text-align: center !important;
  }

  .type-image {
    width: 32px;
    height: 32px;
  }
}
</style>
