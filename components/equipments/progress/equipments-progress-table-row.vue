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
      <equipments-progress-info-item
        :data="strData"
        @showList="showList"
      />
    </td>
    <td>
      <equipments-progress-info-item
        :data="dexData"
        @showList="showList"
      />
    </td>
    <td>
      <equipments-progress-info-item
        :data="intData"
        @showList="showList"
      />
    </td>
    <td>
      <equipments-progress-info-item
        :data="totalData"
        @showList="showList"
      />
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
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgressCollection, required: true },
    faction: { type: String, required: false, default: '' },
  },
  computed: {
    factionImage(): string { return loadFactionImage(this.faction as Faction); },
    strData(): EquipmentInformationProgress {
      return this.filterDataByType(Type.STR);
    },
    dexData(): EquipmentInformationProgress {
      return this.filterDataByType(Type.DEX);
    },
    intData(): EquipmentInformationProgress {
      return this.filterDataByType(Type.INT);
    },
    totalData(): EquipmentInformationProgress {
      return this.filterDataByType(undefined);
    },
  },
  methods: {
    filterDataByType(type: Type | undefined): EquipmentInformationProgress {
      return this.data.list.find((elem: EquipmentInformationProgress) => {
        const isFaction = (!this.faction && !elem.faction) || (this.faction && elem.faction === this.faction as Faction);
        const isType = (!type && !elem.type) || (type && elem.type === type);
        return isFaction && isType;
      }) || new EquipmentInformationProgress(this.faction as Faction, type);
    },
    showList(heroList: Array<Hero>): void {
      this.$emit('showList', heroList);
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
