<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Resources Needed">
          <div class="d-flex flex-wrap">
            <div class="image-container">
              <img
                :src="twistedEssenceImage"
                alt="twisted essence"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ formatNumber(info.remainingTwistedEssence) }}
              </v-chip>
            </div>
            <div
              v-if="info.remainingDroplets"
              class="image-container"
            >
              <img
                :src="dropletsImage"
                alt="flawless droplet"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ formatNumber(info.remainingDroplets) }}
              </v-chip>
            </div>
          </div>
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticElderTreeInfo from '~/application/domain/statistic/info/statisticElderTreeInfo';
import { loadTwistedEssenceImage, loadDropletsImage } from '~/application/services/imageService';

export default Vue.extend({
  props: {
    info: { type: StatisticElderTreeInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    twistedEssenceImage() {
      return loadTwistedEssenceImage();
    },
    dropletsImage() {
      return loadDropletsImage();
    },
  },
  methods: {
    formatNumber(value: number): string {
      return value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.');
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
