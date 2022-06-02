<template>
  <form class="player-hero-form">
    <v-container fluid>
      <hero-player-form-ascension-data />
      <hero-player-form-general-data v-if="isHeroAcquired" />
      <hero-player-form-equipment v-if="isHeroAcquired" />
    </v-container>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Ascension } from '~/application/domain/info/ascension';

export default Vue.extend({
  computed: {
    isHeroAcquired(): boolean {
      return this.$store.state.hero.hero.playerInfo.ascension !== Ascension.None;
    },
  },
});
</script>

<style scoped lang="scss">
.player-hero-form {
  min-height: 440px;
}
</style>
