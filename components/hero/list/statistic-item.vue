<template>
  <v-sheet
    shaped
    height="76"
    width="76"
    class="item ma-2"
  >
    <img
      :alt="hero.gameInfo.name"
      :src="hero.gameInfo.images.profile"
    >
    <v-chip
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
    amount: { type: Number, required: true },
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
    border-radius: 20px 4px;
  }

  .copies-needed {
    position: absolute;
    font-weight: 600;
    font-size: 12px;
    bottom: -6px;
  }
}
</style>
