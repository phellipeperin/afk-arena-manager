<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Resources Needed">
          <b>{{ info.totalNeeded }}</b> Furnitures<br>
        </ui-info-title>

        <div class="d-flex flex-wrap">
          <ui-resource-quantity
            :image-src="poeCoinImage"
            :amount="info.estimatedPoeNeeded"
          />
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
});
</script>

<style scoped lang="scss">

</style>
