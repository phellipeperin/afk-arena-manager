<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Furniture Needed">
          <b>{{ info.totalNeeded }}</b> Total<br>
          - <b>{{ info.largeFurnitureNeeded }}</b> Large<br>
          - <b>{{ info.smallFurnitureNeeded }}</b> Small<br>
          - <b>{{ info.hangingFurnitureNeeded }}</b> Hanging
        </ui-info-title>

        <div class="d-flex flex-wrap">
          <div class="image-container">
            <img
              :src="poeCoinImage"
              alt="poe coin"
            >
            <v-chip
              small
              label
              class="amount-needed"
            >
              {{ formatNumber(info.estimatedPoeNeeded) }}
            </v-chip>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticFurnitureInfo from '~/application/domain/statistic/info/statisticFurnitureInfo';
import { loadPoeCoinImage } from '~/application/services/imageService';

export default Vue.extend({
  props: {
    info: { type: StatisticFurnitureInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    poeCoinImage() {
      return loadPoeCoinImage();
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
