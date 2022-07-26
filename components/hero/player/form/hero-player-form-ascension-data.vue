<template>
  <v-row>
    <v-col
      cols="12"
      :md="simple ? 12 : 8"
    >
      <ui-sub-header text="Ascension" />
      <ui-selector-ascension
        :single-line="$vuetify.breakpoint.smAndUp"
        :value="hero.playerInfo.ascension"
        :awakened-hero="!!hero.gameInfo.awakened"
        @input="(value) => $emit('updateAscension', value)"
      />
    </v-col>
    <v-col
      v-if="!simple"
      cols="12"
      md="4"
      :class="$vuetify.breakpoint.smAndDown ? 'my-0 py-0' : ''"
    >
      <div v-if="isCrystalAvailable">
        <v-switch
          :input-value="hero.playerInfo.onCrystal"
          :true-value="true"
          :false-value="false"
          label="On Crystal"
          color="accent"
          @change="(value) => $emit('updateOnCrystal', value)"
        />
      </div>

      <div v-if="isNoOfCopiesAvailable">
        <v-slider
          label="No. of Copies"
          thumb-label="always"
          color="accent"
          track-color="none"
          ticks
          hide-details
          :thumb-size="24"
          :min="minCopies"
          :max="maxCopies"
          :value="hero.playerInfo.numberOfCopies"
          @input="(value) => $emit('updateNoOfCopies', value)"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';
import { getMaxNumberOfCopies, getMinNumberOfCopies } from '~/application/services/resource/resourceAscensionService';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    simple: { type: Boolean, required: false, default: false },
  },
  computed: {
    isNoOfCopiesAvailable(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None && !!this.minCopies && this.minCopies !== this.maxCopies;
    },
    isCrystalAvailable(): boolean {
      return this.hero.gameInfo.faction !== Faction.Dimensional && this.hero.playerInfo.ascension !== Ascension.None;
    },
    minCopies(): number {
      return getMinNumberOfCopies(this.hero.gameInfo.faction, this.hero.gameInfo.awakened, this.hero.playerInfo.ascension);
    },
    maxCopies(): number {
      return getMaxNumberOfCopies(this.hero.gameInfo.faction, this.hero.gameInfo.awakened);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
