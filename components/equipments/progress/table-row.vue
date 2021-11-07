<template>
  <tr>
    <td class="text-center">
      <img
        :src="factionImage"
        alt="faction"
        class="faction-image"
      >
    </td>
    <td>
      <equipments-progress-chart :data="strData" />
    </td>
    <td>
      <equipments-progress-chart :data="dexData" />
    </td>
    <td>
      <equipments-progress-chart :data="intData" />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadFactionImage } from '~/application/services/imageService';
import EquipmentInformationProgressCollection from '~/application/domain/equipment/equipmentInformationProgressCollection';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import { Type } from '~/application/domain/info/type';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressCollection, required: true },
    faction: { type: String, required: true },
  },
  computed: {
    factionImage(): string { return loadFactionImage(this.faction); },
    strData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => elem.faction === this.faction && elem.type === Type.STR);
    },
    dexData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => elem.faction === this.faction && elem.type === Type.DEX);
    },
    intData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => elem.faction === this.faction && elem.type === Type.INT);
    },
  },
});
</script>

<style scoped lang="scss">
.faction-image {
  width: 32px;
  height: 32px;
}
</style>
