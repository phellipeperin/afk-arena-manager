<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticAscensionInfo from '~/application/domain/statistic/info/statisticAscensionInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticAscensionInfo, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
