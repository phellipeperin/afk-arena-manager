<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Shards Needed">
          <b>{{ info.shardNeeded }}</b> Estimated Total<br>
        </ui-info-title>

        <ui-info-title text="Core Needed">
          <b>{{ info.coreNeeded }}</b> Estimated Total<br>
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
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
