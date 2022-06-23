<template>
  <section class="text-center">
    <p class="mb-0 font-weight-bold">
      {{ ascensionLabel }}
    </p>
    <v-divider
      v-if="hero.playerInfo.signatureItem >= 0 || hero.playerInfo.furniture >= 1 || hero.playerInfo.engrave >= 1"
      class="my-2"
    />
    <span
      v-if="hero.playerInfo.signatureItem >= 0"
      class="mb-0 mx-2 font-weight-bold"
    >
      SI +{{ hero.playerInfo.signatureItem }}
    </span>
    <span
      v-if="hero.playerInfo.furniture >= 1"
      class="mb-0 mx-2 font-weight-bold"
    >
      {{ hero.playerInfo.furniture }}/9
    </span>
    <span
      v-if="hero.playerInfo.engrave >= 1"
      class="mb-0 mx-2 font-weight-bold"
    >
      e{{ hero.playerInfo.engrave }}
    </span>
    <v-divider
      v-if="isHeroAcquired"
      class="my-2"
    />
    <div class="d-flex justify-center">
      <img
        v-for="equip in equipmentImagesList"
        :key="equip"
        :src="equip"
        alt="equip"
        class="hero-equip-image"
      >
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { loadAscensionLabel } from '~/application/services/textService';
import { loadEquipmentTierImage } from '~/application/services/imageService';
import HeroEquip, { HeroEquipType } from '~/application/domain/hero/hero-equip';
import { Ascension } from '~/application/domain/info/ascension';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
    ascensionLabel(): string {
      return loadAscensionLabel(this.hero.playerInfo.ascension);
    },
    equipmentImagesList(): Array<string> {
      return this.hero.playerInfo.equipment.map((equip: HeroEquip) => loadEquipmentTierImage(equip.tier, this.$store.state.hero.hero.gameInfo.type, equip.type as HeroEquipType));
    },
  },
});
</script>

<style scoped lang="scss">
.hero-equip-image {
  width: 32px;
  margin: 0 4px;
}
</style>
