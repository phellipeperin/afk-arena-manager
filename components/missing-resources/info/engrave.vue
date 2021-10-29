<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div class="d-flex flex-wrap">
          <div class="image-container">
            <img
              :src="elementalShardImage"
              alt="elemental shard"
            >
            <v-chip
              small
              label
              class="amount-needed"
            >
              {{ info.shardNeeded }}
            </v-chip>
          </div>
          <div class="image-container">
            <img
              :src="elementalCoreImage"
              alt="elemental core"
            >
            <v-chip
              small
              label
              class="amount-needed"
            >
              {{ info.coreNeeded }}
            </v-chip>
          </div>
        </div>
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
    onCompare: { type: Boolean, required: false, default: false },
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
.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-right: 12px;
  margin-bottom: 20px;

  img {
    width: 82px;
    height: 82px;
    border-radius: 4px;
  }

  .amount-needed {
    position: absolute;
    font-weight: 600;
    font-size: 14px;
    bottom: -12px;
  }
}
</style>
