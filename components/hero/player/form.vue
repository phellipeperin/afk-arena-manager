<template>
  <form>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="5"
          md="4"
        >
          <hero-player-form-general-data />
          <div v-if="isHeroAcquired">
            <hero-player-form-skins />
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="7"
          md="8"
        >
          <div v-if="isHeroAcquired">
            <hero-player-form-equipment />
            <hero-player-form-furniture />
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

</style>
