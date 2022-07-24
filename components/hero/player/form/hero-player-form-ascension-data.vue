<template>
  <v-row>
    <v-col
      cols="12"
      :md="simple ? 12 : 8"
    >
      <ui-sub-header text="Ascension" />
      <ui-selector-ascension
        :single-line="$vuetify.breakpoint.smAndUp"
        :value="$store.state.hero.hero.playerInfo.ascension"
        :awakened-hero="!!$store.state.hero.hero.gameInfo.awakened"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_ASCENSION', value)"
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
          :input-value="$store.state.hero.hero.playerInfo.onCrystal"
          :true-value="true"
          :false-value="false"
          label="On Crystal"
          color="accent"
          @change="(value) => $store.commit('hero/SET_PLAYER_INFO_ON_CRYSTAL', value)"
        />
      </div>

      <div v-if="isNoOfCopiesAvailable">
        <v-slider
          label="No. of Copies"
          thumb-label="always"
          color="accent"
          ticks
          hide-details
          :thumb-size="24"
          :min="minCopies"
          :max="maxCopies"
          :value="$store.state.hero.hero.playerInfo.numberOfCopies"
          @input="(value) => $store.commit('hero/SET_PLAYER_INFO_NO_OF_COPIES', value)"
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

export default Vue.extend({
  props: {
    simple: { type: Boolean, required: false, default: false },
  },
  computed: {
    isNoOfCopiesAvailable(): boolean {
      return this.$store.state.hero.hero.playerInfo.ascension !== Ascension.None && !!this.minCopies && this.minCopies !== this.maxCopies;
    },
    isCrystalAvailable(): boolean {
      return this.$store.state.hero.hero.gameInfo.faction !== Faction.Dimensional && this.$store.state.hero.hero.playerInfo.ascension !== Ascension.None;
    },
    minCopies(): number {
      return getMinNumberOfCopies(this.$store.state.hero.hero.gameInfo.faction, this.$store.state.hero.hero.gameInfo.awakened, this.$store.state.hero.hero.playerInfo.ascension);
    },
    maxCopies(): number {
      return getMaxNumberOfCopies(this.$store.state.hero.hero.gameInfo.faction, this.$store.state.hero.hero.gameInfo.awakened);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
