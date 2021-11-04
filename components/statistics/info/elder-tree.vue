<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Resources Needed">
          <div class="d-flex flex-wrap">
            <ui-resource-quantity
              :image-src="twistedEssenceImage"
              :amount="info.remainingTwistedEssence"
            />
            <ui-resource-quantity
              v-if="info.remainingDroplets"
              :image-src="dropletsImage"
              :amount="info.remainingDroplets"
            />
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
});
</script>

<style scoped lang="scss">

</style>
