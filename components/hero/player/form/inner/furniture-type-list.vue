<template>
  <div>
    <v-label class="text-subtitle-2">
      {{ label }}
    </v-label>

    <v-row class="mt-1">
      <v-col
        cols="12"
        sm="4"
      >
        <hero-player-form-inner-furniture-item
          :plus="firstFurniture.plus"
          @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: firstFurniture.pos, type })"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <hero-player-form-inner-furniture-item
          :plus="secondFurniture.plus"
          @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: secondFurniture.pos, type })"
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
      >
        <hero-player-form-inner-furniture-item
          :plus="thirdFurniture.plus"
          @update:plus="(value) => $store.commit('hero/SET_PLAYER_INFO_FURNITURE_PLUS', { plus: value, pos: thirdFurniture.pos, type })"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroFurniture, { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';
import { loadFurnitureTypeLabel } from '~/application/services/textService';

export default Vue.extend({
  props: {
    type: { type: HeroFurnitureType, required: true },
  },
  computed: {
    label(): string {
      return loadFurnitureTypeLabel(this.type);
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
      return this.$store.state.hero.hero.playerInfo.furniture.find(elem => elem.pos === pos && elem.type === this.type);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
