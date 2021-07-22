<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticFurnitureInfo, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
