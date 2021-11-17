<template>
  <form class="player-hero-form">
    <v-tabs
      v-model="selectedTab"
      color="white"
    >
      <v-tab>Game Data</v-tab>
      <v-tab>Preferences</v-tab>
    </v-tabs>

    <v-container
      v-show="selectedTab === 0"
      fluid
    >
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
            <hero-player-form-skins />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container
      v-show="selectedTab === 1"
      fluid
    >
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <hero-player-form-preferences />
        </v-col>
      </v-row>
    </v-container>

  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Ascension } from '~/application/domain/info/ascension';

interface ComponentData {
  selectedTab: number;
}

export default Vue.extend({
  data(): ComponentData {
    return {
      selectedTab: 0,
    };
  },
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
