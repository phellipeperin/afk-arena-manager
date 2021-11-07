<template>
  <tr>
    <td class="text-center">
      <img
        v-show="faction"
        :src="factionImage"
        alt="faction"
        class="faction-image"
      >
      <span v-show="!faction">Total</span>
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
    <td>
      <equipments-progress-chart :data="totalData" />
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadFactionImage } from '~/application/services/imageService';
import EquipmentInformationProgressCollection from '~/application/domain/equipment/equipmentInformationProgressCollection';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import { Type } from '~/application/domain/info/type';
import { Faction } from '~/application/domain/info/faction';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressCollection, required: true },
    faction: { type: String, required: false, default: '' },
  },
  computed: {
    factionImage(): string { return loadFactionImage(this.faction); },
    strData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => ((!this.faction && !elem.faction) || (this.faction && elem.faction === this.faction as Faction)) && elem.type === Type.STR);
    },
    dexData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => ((!this.faction && !elem.faction) || (this.faction && elem.faction === this.faction as Faction)) && elem.type === Type.DEX);
    },
    intData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => ((!this.faction && !elem.faction) || (this.faction && elem.faction === this.faction as Faction)) && elem.type === Type.INT);
    },
    totalData(): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => ((!this.faction && !elem.faction) || (this.faction && elem.faction === this.faction as Faction)) && !elem.type);
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
