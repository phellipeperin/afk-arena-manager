<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="6"
      >
        <ui-info-title text="Basic Info Needed">
          <span v-show="!!info.itemsNeeded"><b>{{ info.itemsNeeded }}</b> Items<br></span>
          <span><b>{{ info.starsNeeded }}</b> Stars<br></span>
          <span><b>{{ info.wrongFaction }}</b> With Wrong Faction<br></span>
          <span><b>{{ info.noFaction }}</b> Without Faction</span>
        </ui-info-title>

        <div class="d-flex flex-wrap">
          <ui-resource-quantity
            :image-src="tokenImage"
            :amount="info.tokensNeeded"
          />
          <ui-resource-quantity
            :image-src="goldImage"
            :amount="info.goldNeeded"
          />
        </div>
      </v-col>

      <v-col
        cols="12"
        sm="6"
      >
        <ui-info-title text="Stones Needed">
          <b>{{ info.stonesNeeded.t1 + info.stonesNeeded.t2 + info.stonesNeeded.t3 }}</b> Total<br>
          - <b>{{ info.stonesNeeded.t1 }}</b> T1<br>
          - <b>{{ info.stonesNeeded.t2 }}</b> T2<br>
          - <b>{{ info.stonesNeeded.t3 }}</b> T3
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import { loadEnhanceTokenRareImage, loadGoldImage } from '~/application/services/imageService';

export default Vue.extend({
  props: {
    info: { type: StatisticEquipmentInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    goldImage() {
      return loadGoldImage();
    },
    tokenImage() {
      return loadEnhanceTokenRareImage();
    },
  },
});
</script>

<style scoped lang="scss">

</style>
