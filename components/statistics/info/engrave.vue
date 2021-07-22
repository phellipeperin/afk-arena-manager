<template>
  <div>
    {{ info }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';

export default Vue.extend({
  props: {
    info: { type: StatisticEngraveInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
});
</script>

<style scoped lang="scss">

</style>
