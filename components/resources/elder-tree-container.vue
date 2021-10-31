<template>
  <v-container>
    <v-row>
      <v-col
        cols="4"
        class="text-center"
      >
        <h6 class="text-h6">
          Tree Main Level
        </h6>
      </v-col>
      <v-col
        cols="8"
        class="d-flex align-center"
      >
        <span class="text-subtitle font-weight-bold">Lv. 122</span>
        <span class="text-subtitle-2 ml-2">(4 droplets)</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="4"
        class="text-center"
      >
        <img
          width="52"
          :src="supportImage"
          alt="support"
        >
      </v-col>
      <v-col
        cols="8"
        class="d-flex align-center"
      >
        <v-slider
          hide-details
          thumb-label="always"
          ticks="always"
          :thumb-size="24"
          :min="0"
          :max="40"
        />
<!--          :value="$store.state.hero.hero.playerInfo.numberOfCopies"-->
<!--          @input="(value) => $store.commit('hero/SET_PLAYER_INFO_NO_OF_COPIES', value)"-->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { loadGroupImage } from '~/application/services/imageService';
import { Group } from '~/application/domain/info/group';

interface ComponentData {
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
    };
  },
  computed: {
    supportImage(): string {
      return loadGroupImage(Group.Support);
    },
    mageImage(): string {
      return loadGroupImage(Group.Mage);
    },
    warriorImage(): string {
      return loadGroupImage(Group.Warrior);
    },
    tankImage(): string {
      return loadGroupImage(Group.Tank);
    },
    rangerImage(): string {
      return loadGroupImage(Group.Ranger);
    },
  },
  methods: {
  },
});
</script>

<style scoped lang="scss">

</style>
