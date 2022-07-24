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
        :value="hero.playerInfo.signatureItem"
        @input="(value) => $emit('updateSignatureItem', value)"
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
            @click="$emit('updateSignatureItem', 0)"
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
            @click="$emit('updateSignatureItem', 10)"
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
            @click="$emit('updateSignatureItem', 20)"
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
            @click="$emit('updateSignatureItem', 30)"
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
        :value="hero.playerInfo.furniture"
        @input="(value) => $emit('updateFurniture', value)"
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
            @click="$emit('updateFurniture', 0)"
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
            @click="$emit('updateFurniture', 3)"
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
            @click="$emit('updateFurniture', 9)"
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
            @click="$emit('updateFurniture', 36)"
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
        :dark="hero.playerInfo.engrave >= 80"
        :min="0"
        :max="maximumEngrave"
        :color="engraveColor"
        track-color="none"
        :track-fill-color="engraveColor"
        :value="hero.playerInfo.engrave"
        @input="(value) => $emit('updateEngrave', value)"
      >
        <template #thumb-label="props">
          <span :class="`${hero.playerInfo.engrave >= 80 ? 'black--text' : ''}`"> {{ props.value }}</span>
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
            @click="$emit('updateEngrave', 0)"
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
            @click="$emit('updateEngrave', 30)"
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
            @click="$emit('updateEngrave', 60)"
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
            @click="$emit('updateEngrave', 80)"
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
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    isSignatureItemAvailable(): boolean {
      return isSignatureItemAvailable(this.hero.playerInfo.ascension);
    },
    isFurnitureAvailable(): boolean {
      return isFurnitureAvailable(this.hero.playerInfo.ascension);
    },
    isEngraveAvailable(): boolean {
      return isEngraveAvailable(this.hero.playerInfo.ascension);
    },
    maximumSignatureItem(): number {
      const { faction } = this.hero.gameInfo;
      return (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional) ? 40 : 30;
    },
    maximumEngrave(): number {
      const { faction } = this.hero.gameInfo;
      return (faction === Faction.Celestial || faction === Faction.Hypogean || faction === Faction.Dimensional) ? 100 : 80;
    },
    signatureItemColor(): string {
      return getSignatureItemColor(this.hero.playerInfo.signatureItem);
    },
    furnitureColor(): string {
      return getFurnitureColor(this.hero.playerInfo.furniture);
    },
    engraveColor(): string {
      return getEngraveColor(this.hero.playerInfo.engrave);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
