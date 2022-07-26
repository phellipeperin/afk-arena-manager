<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      shaped
      height="92"
      width="92"
      :class="`item ma-2 ${hover ? 'item__hover' : ''}`"
      @click="select"
    >
      <img
        :alt="hero.gameInfo.name"
        :src="heroImage"
      >
    </v-sheet>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { loadHeroImage } from '~/application/services/hero/heroService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    heroImage(): string {
      return loadHeroImage(this.hero);
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
  cursor: pointer;

  img {
    margin: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 20px 4px;
    transition: all linear 0.1s;
  }

  &__hover {
    img {
      margin: -5%;
      width: 110%;
      height: 110%;
      transition: all linear 0.1s;
    }
  }
}
</style>
