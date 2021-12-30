<template>
  <v-sheet
    height="72"
    width="72"
    class="item mx-2 my-3"
  >
    <img
      :src="hero.gameInfo.images.profile"
      :alt="hero.gameInfo.name"
    >
    <v-chip
      v-if="amount"
      x-small
      label
      class="copies-needed"
    >
      {{ amount }}
    </v-chip>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    hero: { type: Hero, required: true },
    amount: { type: Number, required: false, default: 0 },
  },
});
</script>

<style scoped lang="scss">
.item {
  position: relative;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 4px;
  }

  .copies-needed {
    position: absolute;
    padding: 4px 8px;
    font-weight: 600;
    font-size: 12px;
    bottom: -6px;
  }
}
</style>
