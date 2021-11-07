<template>
  <v-simple-table class="progress-table">
    <thead>
      <tr>
        <th style="width: 10%;" />
        <th style="width: 30%;">
          <img
            :src="strImage"
            alt="str"
            class="type-image"
          >
        </th>
        <th style="width: 30%;">
          <img
            :src="dexImage"
            alt="dex"
            class="type-image"
          >
        </th>
        <th style="width: 30%;">
          <img
            :src="intImage"
            alt="int"
            class="type-image"
          >
        </th>
      </tr>
    </thead>
    <tbody>
      <equipments-progress-table-row
        :data="data"
        :faction="lightbearerFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="maulerFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="wilderFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="gravebornFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="celestialFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="hypogeanFaction"
      />
      <equipments-progress-table-row
        :data="data"
        :faction="dimensionalFaction"
      />
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadTypeImage } from '~/application/services/imageService';
import { Type } from '~/application/domain/info/type';
import EquipmentInformationProgressCollection from '~/application/domain/equipment/equipmentInformationProgressCollection';
import { Faction } from '~/application/domain/info/faction';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressCollection, required: true },
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
