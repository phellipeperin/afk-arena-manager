<template>
  <v-hover v-slot="{ hover }">
    <v-sheet
      shaped
      :elevation="hover ? '8' : '1'"
      height="120"
      width="120"
      :class="`item ma-2 ${hover ? 'item__hover' : ''}`"
      @click="select"
    >
      <img
        :alt="hero.gameInfo.name"
        :src="hero.gameInfo.images.profile"
      >
    </v-sheet>
  </v-hover>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
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
