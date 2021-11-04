<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Emblems Needed">
          <div class="d-flex flex-wrap">
            <ui-resource-quantity
              :image-src="eliteEmblemImage"
              :amount="info.eliteEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="legendaryEmblemImage"
              :amount="info.legendaryEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="mythicEmblemImage"
              :amount="info.mythicEmblemNeeded"
            />
          </div>

          <div class="d-flex flex-wrap mt-2">
            <ui-resource-quantity
              :image-src="lightbearerMythicEmblemImage"
              :amount="info.lightbearerEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="maulerMythicEmblemImage"
              :amount="info.maulerEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="wilderMythicEmblemImage"
              :amount="info.wilderEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="gravebornMythicEmblemImage"
              :amount="info.gravebornEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="celestialMythicEmblemImage"
              :amount="info.celestialEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="hypogeanMythicEmblemImage"
              :amount="info.hypogeanEmblemNeeded"
            />
            <ui-resource-quantity
              :image-src="dimensionalMythicEmblemImage"
              :amount="info.dimensionalEmblemNeeded"
            />
          </div>
        </ui-info-title>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import StatisticSignatureItemInfo from '~/application/domain/statistic/info/statisticSignatureItemInfo';
import { loadEmblemsImage } from '~/application/services/imageService';
import { Ascension } from '~/application/domain/info/ascension';
import { Faction } from '~/application/domain/info/faction';

export default Vue.extend({
  props: {
    info: { type: StatisticSignatureItemInfo, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  computed: {
    eliteEmblemImage() {
      return loadEmblemsImage(Ascension.Elite);
    },
    legendaryEmblemImage() {
      return loadEmblemsImage(Ascension.Legendary);
    },
    mythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic);
    },
    lightbearerMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Lightbearer);
    },
    maulerMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Mauler);
    },
    wilderMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Wilder);
    },
    gravebornMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Graveborn);
    },
    celestialMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Celestial);
    },
    hypogeanMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Hypogean);
    },
    dimensionalMythicEmblemImage() {
      return loadEmblemsImage(Ascension.Mythic, Faction.Dimensional);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
