<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticSignatureItemInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
