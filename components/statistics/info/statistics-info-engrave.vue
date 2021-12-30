<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Resources Needed">
          <div class="d-flex flex-wrap">
            <ui-resource-quantity
              :image-src="elementalShardImage"
              :amount="info.shardNeeded"
            />
            <ui-resource-quantity
              :image-src="elementalCoreImage"
              :amount="info.coreNeeded"
            />
          </div>
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticEngraveInfo from '~/application/domain/statistic/info/statisticEngraveInfo';
import { loadEngraveImage } from '~/application/services/imageService';
import { Engrave } from '~/application/domain/info/engrave';

export default Vue.extend({
  props: {
    info: { type: StatisticEngraveInfo, required: true },
    compact: { type: Boolean, required: false, default: false },
  },
  computed: {
    elementalShardImage() {
      return loadEngraveImage(Engrave.Shard);
    },
    elementalCoreImage() {
      return loadEngraveImage(Engrave.Core);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
