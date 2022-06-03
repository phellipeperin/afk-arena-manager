<template>
  <div class="text-center pb-6">
    <equipments-progress-chart
      :data="data"
      @showList="showList"
    />
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
      <equipments-progress-info-item-chip
        label="T4 Stones"
        :amount="neededT4Stones"
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
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    data: { type: EquipmentInformationProgress, required: true },
  },
  computed: {
    totalEquips(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.total.amount;
      }, 0);
    },
    neededBaseEquips(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired.amount;
      }, 0);
    },
    neededT1Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired.amount + item.values.t0.amount;
      }, 0);
    },
    neededT2Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired.amount + item.values.t0.amount + item.values.t1.amount;
      }, 0);
    },
    neededT3Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired.amount + item.values.t0.amount + item.values.t1.amount + item.values.t2.amount;
      }, 0);
    },
    neededT4Stones(): number {
      return this.data.items.reduce((previousValue: number, item: EquipmentInformationProgressEquipItem) => {
        return previousValue + item.values.notAcquired.amount + item.values.t0.amount + item.values.t1.amount + item.values.t2.amount + item.values.t3.amount;
      }, 0);
    },
  },
  methods: {
    showList(heroList: Array<Hero>): void {
      this.$emit('showList', heroList);
    },
  },
});
</script>

<style scoped lang="scss">
</style>
