<template>
  <v-badge
    :value="hasMissingInformation"
    overlap
    color="mythic"
    class="warning-badge"
  >
    <v-hover v-slot="{ hover }">
      <v-sheet
        shaped
        :elevation="hover ? '12' : '0'"
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
  </v-badge>
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
    hasMissingInformation(): boolean {
      return false;
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
  transition: all ease 0.3s;
  cursor: pointer;

  &__hover {
    transition: all ease 0.3s;
  }

  img {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 20px 4px;
  }
}
</style>

<style lang="scss">
.warning-badge .v-badge__badge {
  margin: 0 0 -10px -10px;
}
</style>
