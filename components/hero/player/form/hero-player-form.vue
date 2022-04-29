<template>
  <form class="player-hero-form">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <hero-player-form-general-data />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <div v-if="isHeroAcquired">
            <hero-player-form-equipment />
          </div>
        </v-col>
      </v-row>
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
