<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ui-info-title text="Emblems Needed">
          <div class="d-flex flex-wrap">
            <div class="emblem-container">
              <img
                :src="eliteEmblemImage"
                alt="elite emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.eliteEmblemNeeded }}
              </v-chip>
            </div>

            <div class="emblem-container">
              <img
                :src="legendaryEmblemImage"
                alt="legendary emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.legendaryEmblemNeeded }}
              </v-chip>
            </div>

            <div class="emblem-container">
              <img
                :src="mythicEmblemImage"
                alt="mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.mythicEmblemNeeded }}
              </v-chip>
            </div>
          </div>

          <div class="d-flex flex-wrap mt-2">
            <div class="emblem-container">
              <img
                :src="lightbearerMythicEmblemImage"
                alt="lightbearer mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.lightbearerEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="maulerMythicEmblemImage"
                alt="mauler mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.maulerEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="wilderMythicEmblemImage"
                alt="wilder mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.wilderEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="gravebornMythicEmblemImage"
                alt="graveborn mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.gravebornEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="celestialMythicEmblemImage"
                alt="celestial mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.celestialEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="hypogeanMythicEmblemImage"
                alt="hypogean mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.hypogeanEmblemNeeded }}
              </v-chip>
            </div>
            <div class="emblem-container">
              <img
                :src="dimensionalMythicEmblemImage"
                alt="dimensional mythic emblem"
              >
              <v-chip
                small
                label
                class="amount-needed"
              >
                {{ info.dimensionalEmblemNeeded }}
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
.emblem-container {
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
