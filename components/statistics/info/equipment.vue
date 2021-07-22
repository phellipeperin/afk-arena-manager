<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticEquipmentInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
