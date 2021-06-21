<template>
  <div>
    <v-label class="text-subtitle-2">
      {{ label }}
    </v-label>

    <div class="mt-5">
      <hero-player-form-inner-furniture-item
        :plus="firstFurniture.plus"
        @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: firstFurniture.pos, type })"
      />
      <hero-player-form-inner-furniture-item
        :plus="secondFurniture.plus"
        @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: secondFurniture.pos, type })"
      />
      <hero-player-form-inner-furniture-item
        :plus="thirdFurniture.plus"
        @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: thirdFurniture.pos, type })"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroFurniture, { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import { loadFurnitureTypeLabel } from '~/application/services/textService';

export default Vue.extend({
  props: {
    type: { type: String, required: true },
  },
  computed: {
    label(): string {
      return loadFurnitureTypeLabel(this.type as HeroFurnitureType);
    },
    firstFurniture(): HeroFurniture {
      return this.findFurniture(1);
    },
    secondFurniture(): HeroFurniture {
      return this.findFurniture(2);
    },
    thirdFurniture(): HeroFurniture {
      return this.findFurniture(3);
    },
  },
  methods: {
    findFurniture(pos: number): HeroFurniture {
      return this.$store.state.hero.hero.playerInfo.furniture.find((elem: HeroFurniture) => elem.pos === pos && elem.type === this.type as HeroFurnitureType);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
