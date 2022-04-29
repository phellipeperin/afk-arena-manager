<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      height="92"
      width="92"
      :elevation="hover ? '24' : '0'"
      :class="`item ma-2 ${hover ? 'item__hover' : ''} ${shadow ? 'item__shadowed' : ''} ${isHeroAcquired ? '' : 'item__not-acquired'}`"
      @click="select"
    >
      <img
        width="100"
        height="100"
        :alt="hero.gameInfo.name"
        :src="heroImage"
      >
    </v-sheet>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import { convertAscensionToNumber, convertFactionToImageUrlString } from '~/application/services/convertService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    shadow: { type: Boolean, required: false, default: false },
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
    heroImage(): string {
      const heroName = this.hero.systemInfo.imageUrlName;
      const faction = convertFactionToImageUrlString(this.hero.gameInfo.faction);
      const ascension = convertAscensionToNumber(this.hero.playerInfo.ascension);
      const signatureItem = this.hero.playerInfo.signatureItem;
      const furniture = this.hero.playerInfo.furniture;
      const engrave = this.hero.playerInfo.engrave;

      return `https://afkalc.com/_next/image?url=%2Fapi%2Fhero%3FheroImage%3D%2Fheroes%2F${heroName}.jpg%26faction%3D${faction}%26ascend%3D${ascension}%26si%3D${signatureItem}%26fi%3D${furniture}%26engrave%3D${engrave}&w=128&q=100`;
    },
  },
  methods: {
    select(): void {
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">
.item {
  opacity: 0.85;
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;

  &__hover {
    opacity: 1;
    transition: all ease 0.3s;
  }
}
</style>
