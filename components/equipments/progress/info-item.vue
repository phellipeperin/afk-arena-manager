<template>
  <div class="text-center pb-6">
    <equipments-progress-chart :data="data" />
    <div>
      <p class="text-caption mb-1">
        To max all the <b>{{ totalEquips }}</b> you still need:
      </p>
      <equipments-progress-info-item-chip
        label="Base Equips"
        :amount="neededBaseEquips"
        :total="totalEquips"
      />
      <equipments-progress-info-item-chip
        label="T1 Stones"
        :amount="neededT1Stones"
        :total="totalEquips"
      />
      <equipments-progress-info-item-chip
        label="T2 Stones"
        :amount="neededT2Stones"
        :total="totalEquips"
      />
      <equipments-progress-info-item-chip
        label="T3 Stones"
        :amount="neededT3Stones"
        :total="totalEquips"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import EquipmentInformationProgress from '~/application/domain/equipment/equipmentInformationProgress';
import EquipmentInformationProgressEquipItem
  from '~/application/domain/equipment/equipmentInformationProgressEquipItem';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgress, required: true },
  },
  computed: {
    isLoading(): boolean {
      console.log(this.data.items.length);
      return !this.data.items.length;
    },
    totalEquips(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.total;
      }, 0);
    },
    neededBaseEquips(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired;
      }, 0);
    },
    neededT1Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired + item.values.t0;
      }, 0);
    },
    neededT2Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired + item.values.t0 + item.values.t1;
      }, 0);
    },
    neededT3Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired + item.values.t0 + item.values.t1 + item.values.t2;
      }, 0);
    },
  },
});
</script>

<style scoped lang="scss">
</style>
