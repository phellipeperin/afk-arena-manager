<template>
  <v-row>
    <v-col
      v-if="isSignatureItemAvailable"
      cols="12"
      sm="4"
    >
      <ui-sub-header text="Signature Item" />
      <v-slider
        class="mt-8"
        thumb-label="always"
        ticks
        hide-details
        :thumb-size="24"
        :min="-1"
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

      <v-row class="pa-0">
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_SIGNATURE_ITEM', 0)"
          >
            +0
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_SIGNATURE_ITEM', 10)"
          >
            +10
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_SIGNATURE_ITEM', 20)"
          >
            +20
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_SIGNATURE_ITEM', 30)"
          >
            +30
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      v-if="isFurnitureAvailable"
      cols="12"
      sm="4"
    >
      <ui-sub-header text="Furniture" />
      <v-slider
        class="mt-8"
        thumb-label="always"
        ticks
        hide-details
        :thumb-size="24"
        :min="0"
        :max="36"
        :color="furnitureColor"
        track-color="none"
        :track-fill-color="furnitureColor"
        :value="$store.state.hero.hero.playerInfo.furniture"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE', value)"
      />

      <v-row class="pa-0">
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_FURNITURE', 0)"
          >
            0
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_FURNITURE', 3)"
          >
            3
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_FURNITURE', 9)"
          >
            9
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_FURNITURE', 36)"
          >
            36
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      v-if="isEngraveAvailable"
      cols="12"
      sm="4"
    >
      <ui-sub-header text="Engrave" />
      <v-slider
        class="mt-8"
        thumb-label="always"
        ticks
        hide-details
        :thumb-size="24"
        :dark="$store.state.hero.hero.playerInfo.engrave >= 80"
        :min="0"
        :max="maximumEngrave"
        :color="engraveColor"
        track-color="none"
        :track-fill-color="engraveColor"
        :value="$store.state.hero.hero.playerInfo.engrave"
        @input="(value) => $store.commit('hero/SET_PLAYER_INFO_ENGRAVE', value)"
      >
        <template #thumb-label="props">
          <span :class="`${$store.state.hero.hero.playerInfo.engrave >= 80 ? 'black--text' : ''}`"> {{ props.value }}</span>
        </template>
      </v-slider>

      <v-row class="pa-0">
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_ENGRAVE', 0)"
          >
            0
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_ENGRAVE', 30)"
          >
            30
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_ENGRAVE', 60)"
          >
            60
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="py-0"
        >
          <v-btn
            color="none"
            block
            text
            small
            @click="$store.commit('hero/SET_PLAYER_INFO_ENGRAVE', 80)"
          >
            80
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Faction } from '~/application/domain/info/faction';
import { isSignatureItemAvailable, getSignatureItemColor } from '~/application/services/resource/resourceSignatureItemService';
import { isFurnitureAvailable, getFurnitureColor } from '~/application/services/resource/resourceFurnitureService';
import { isEngraveAvailable, getEngraveColor } from '~/application/services/resource/resourceEngraveService';

export default Vue.extend({
  computed: {
    isSignatureItemAvailable(): boolean {
      return isSignatureItemAvailable(this.$store.state.hero.hero.playerInfo.ascension);
    },
    isFurnitureAvailable(): boolean {
      return isFurnitureAvailable(this.$store.state.hero.hero.playerInfo.ascension);
    },
    isEngraveAvailable(): boolean {
      return isEngraveAvailable(this.$store.state.hero.hero.playerInfo.ascension);
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
    furnitureColor(): string {
      return getFurnitureColor(this.$store.state.hero.hero.playerInfo.furniture);
    },
    engraveColor(): string {
      return getEngraveColor(this.$store.state.hero.hero.playerInfo.engrave);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
