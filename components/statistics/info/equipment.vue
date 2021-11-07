<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        :sm="onCompare ? 12 : 5"
      >
        <ui-info-title text="Basic Info Needed">
          <span v-show="!!info.itemsNeeded"><b>{{ info.itemsNeeded }}</b> Items<br></span>
          <span><b>{{ info.starsNeeded }}</b> Stars<br></span>
          <span><b>{{ info.wrongFaction }}</b> Wrong Faction<br></span>
          <span><b>{{ info.noFaction }}</b> No Faction</span>
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
        :sm="onCompare ? 12 : 7"
      >
        <ui-info-title text="Stones Needed">
          <b>{{ totalStones }}</b> Total<br>
        </ui-info-title>

        <div class="d-flex flex-wrap">
          <ui-resource-quantity
            :image-src="t1StrImage"
            :amount="info.stonesNeeded.t1.str"
          />
          <ui-resource-quantity
            :image-src="t1DexImage"
            :amount="info.stonesNeeded.t1.dex"
          />
          <ui-resource-quantity
            :image-src="t1IntImage"
            :amount="info.stonesNeeded.t1.int"
          />
        </div>
        <div class="d-flex flex-wrap">
          <ui-resource-quantity
            :image-src="t2StrImage"
            :amount="info.stonesNeeded.t2.str"
          />
          <ui-resource-quantity
            :image-src="t2DexImage"
            :amount="info.stonesNeeded.t2.dex"
          />
          <ui-resource-quantity
            :image-src="t2IntImage"
            :amount="info.stonesNeeded.t2.int"
          />
        </div>
        <div class="d-flex flex-wrap">
          <ui-resource-quantity
            :image-src="t3StrImage"
            :amount="info.stonesNeeded.t3.str"
          />
          <ui-resource-quantity
            :image-src="t3DexImage"
            :amount="info.stonesNeeded.t3.dex"
          />
          <ui-resource-quantity
            :image-src="t3IntImage"
            :amount="info.stonesNeeded.t3.int"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticEquipmentInfo from '~/application/domain/statistic/info/statisticEquipmentInfo';
import { loadEquipmentStoneImage, loadEnhanceTokenRareImage, loadGoldImage } from '~/application/services/imageService';
import { Type } from '~/application/domain/info/type';

export default Vue.extend({
  props: {
    info: { type: StatisticEquipmentInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    totalStones(): number {
      return this.info.stonesNeeded.t1.str + this.info.stonesNeeded.t1.dex + this.info.stonesNeeded.t1.int +
        this.info.stonesNeeded.t2.str + this.info.stonesNeeded.t2.dex + this.info.stonesNeeded.t2.int +
        this.info.stonesNeeded.t3.str + this.info.stonesNeeded.t3.dex + this.info.stonesNeeded.t3.int;
    },
    goldImage(): string {
      return loadGoldImage();
    },
    tokenImage(): string {
      return loadEnhanceTokenRareImage();
    },
    t1StrImage(): string {
      return loadEquipmentStoneImage(Type.STR, 1);
    },
    t1DexImage(): string {
      return loadEquipmentStoneImage(Type.DEX, 1);
    },
    t1IntImage(): string {
      return loadEquipmentStoneImage(Type.INT, 1);
    },
    t2StrImage(): string {
      return loadEquipmentStoneImage(Type.STR, 2);
    },
    t2DexImage(): string {
      return loadEquipmentStoneImage(Type.DEX, 2);
    },
    t2IntImage(): string {
      return loadEquipmentStoneImage(Type.INT, 2);
    },
    t3StrImage(): string {
      return loadEquipmentStoneImage(Type.STR, 3);
    },
    t3DexImage(): string {
      return loadEquipmentStoneImage(Type.DEX, 3);
    },
    t3IntImage(): string {
      return loadEquipmentStoneImage(Type.INT, 3);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
