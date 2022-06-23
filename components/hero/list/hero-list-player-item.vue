<template>
  <v-tooltip
    bottom
    open-delay="200"
    color="primary"
  >
    <template #activator="{ on, attrs }">
      <v-hover v-slot="{ hover }">
        <v-sheet
          height="92"
          width="92"
          :elevation="hover ? '24' : '0'"
          :class="`item ma-2 ${hover ? 'item__hover' : ''} ${isHeroAcquired ? '' : 'item__not-acquired'}`"
          v-bind="attrs"
          v-on="on"
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
    <hero-list-player-item-preview :hero="hero" />
  </v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';
import { Ascension } from '~/application/domain/info/ascension';
import { loadHeroImage } from '~/application/services/hero/heroService';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
  },
  computed: {
    isHeroAcquired(): boolean {
      return this.hero.playerInfo.ascension !== Ascension.None;
    },
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
  opacity: 0.8;
  transition: all ease 0.3s;
  position: relative;
  cursor: pointer;

  &__hover {
    opacity: 1;
    transition: all ease 0.3s;
  }
}
</style>

<style lang="scss">
.v-tooltip__content.primary {
  opacity: 1 !important;
}
</style>
