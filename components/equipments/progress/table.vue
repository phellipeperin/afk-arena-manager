<template>
  <v-simple-table class="progress-table">
    <thead>
      <tr>
        <th />
        <th>
          <img
            :src="strImage"
            alt="str"
            class="type-image"
          >
        </th>
        <th>
          <img
            :src="dexImage"
            alt="dex"
            class="type-image"
          >
        </th>
        <th>
          <img
            :src="intImage"
            alt="int"
            class="type-image"
          >
        </th>
      </tr>
    </thead>
    <tbody>
      <equipments-progress-table-row faction="LIGHTBEARER" />
    </tbody>
  </v-simple-table>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadTypeImage } from '~/application/services/imageService';
import { Type } from '~/application/domain/info/type';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgress, required: true },
  },
  computed: {
    strImage(): string { return loadTypeImage(Type.STR); },
    dexImage(): string { return loadTypeImage(Type.DEX); },
    intImage(): string { return loadTypeImage(Type.INT); },
  },
});
</script>

<style scoped lang="scss">
.progress-table {
  th {
    text-align: center !important;
  }

  .type-image {
    width: 32px;
    height: 32px;
  }
}

</style>
