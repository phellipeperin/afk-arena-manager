<template>
  <div>
    <ui-sub-header text="General Data" />
    <ui-selector-ascension
      :value="$store.state.hero.hero.playerInfo.ascension"
      show-label
      :class="`${isCrystalAvailable ? '' : 'mb-10'}`"
      @input="(value) => $store.commit('hero/SET_PLAYER_INFO_ASCENSION', value)"
    />

    <div v-if="isCrystalAvailable">
      <v-switch
        :input-value="$store.state.hero.hero.playerInfo.onCrystal"
        :true-value="true"
        :false-value="false"
        label="On Crystal"
        @change="(value) => $store.commit('hero/SET_PLAYER_INFO_ON_CRYSTAL', value)"
      />
    </div>

    <div v-if="isNoOfCopiesAvailable">
      <v-slider
        label="No. of Copies"
        thumb-label="always"
        ticks="always"
        :thumb-size="24"
        :min="minCopies"
        :max="maxCopies"
        :value="$store.state.hero.hero.playerInfo.numberOfCopies"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_NO_OF_COPIES', value)"
      />
    </div>

    <div v-if="isSignatureItemAvailable">
      <v-slider
        label="Signature Item"
        thumb-label="always"
        ticks="always"
        :thumb-size="24"
        min="-1"
        :max="maximumSignatureItem"
        :color="signatureItemColor"
        track-color="none"
        :track-fill-color="signatureItemColor"
        :value="$store.state.hero.hero.playerInfo.signatureItem"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_SIGNATURE_ITEM', value)"
      >
        <template #thumb-label="props">
          {{ props.value === -1 ? 'NA' : `+${props.value}` }}
        </template>
      </v-slider>
    </div>

    <div v-if="isEngraveAvailable">
      <v-slider
        label="Engrave"
        thumb-label="always"
        ticks="always"
        :thumb-size="24"
        min="0"
        :max="maximumEngrave"
        :color="engraveColor"
        track-color="none"
        :track-fill-color="engraveColor"
        :value="$store.state.hero.hero.playerInfo.engrave"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_ENGRAVE', value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Faction } from '~/application/domain/info/faction';
import { Ascension } from '~/application/domain/info/ascension';
import {
  getMaxNumberOfCopies,
  getMinNumberOfCopies,
  isSignatureItemAvailable,
  isEngraveAvailable,
  getSignatureItemColor,
  getEngraveColor, getAscensionColor,
} from '~/application/services/heroService';

export default Vue.extend({
  computed: {
    isSignatureItemAvailable(): boolean {
      return isSignatureItemAvailable(this.$store.state.hero.hero.playerInfo.ascension);
    },
    isEngraveAvailable(): boolean {
      return isEngraveAvailable(this.$store.state.hero.hero.playerInfo.ascension);
    },
    isNoOfCopiesAvailable(): boolean {
      return this.$store.state.hero.hero.playerInfo.ascension !== Ascension.None && !!this.minCopies && this.minCopies !== this.maxCopies;
    },
    isCrystalAvailable(): boolean {
      return this.$store.state.hero.hero.gameInfo.faction !== Faction.Dimensional && this.$store.state.hero.hero.playerInfo.ascension !== Ascension.None;
    },
    maximumSignatureItem(): number {
      const { faction } = this.$store.state.hero.hero.gameInfo;
      return (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional) ? 40 : 30;
    },
    maximumEngrave(): number {
      const { faction } = this.$store.state.hero.hero.gameInfo;
      return (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional) ? 100 : 80;
    },
    signatureItemColor(): string {
      return getSignatureItemColor(this.$store.state.hero.hero.playerInfo.signatureItem);
    },
    engraveColor(): string {
      return getEngraveColor(this.$store.state.hero.hero.playerInfo.engrave);
    },
    minCopies(): number {
      return getMinNumberOfCopies(this.$store.state.hero.hero.gameInfo.faction, this.$store.state.hero.hero.playerInfo.ascension);
    },
    maxCopies(): number {
      return getMaxNumberOfCopies(this.$store.state.hero.hero.gameInfo.faction);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
