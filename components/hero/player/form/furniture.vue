<template>
  <div>
    <div v-if="isFurnitureAvailable">
      <ui-sub-header text="Furniture" />

      <v-row>
        <v-col
          cols="12"
          sm="4"
        >
          <hero-player-form-inner-furniture-type-list :type="largeFurnitureType" />
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <hero-player-form-inner-furniture-type-list :type="smallFurnitureType" />
        </v-col>
        <v-col
          cols="12"
          sm="4"
        >
          <hero-player-form-inner-furniture-type-list :type="hangingFurnitureType" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { isFurnitureAvailable } from '~/application/services/heroService';
import { HeroFurnitureType } from '~/application/domain/hero/hero-furniture';

export default Vue.extend({
  computed: {
    isFurnitureAvailable(): boolean {
      return isFurnitureAvailable(this.$store.state.hero.hero.playerInfo.ascension);
    },
    largeFurnitureType(): HeroFurnitureType {
      return HeroFurnitureType.Large;
    },
    smallFurnitureType(): HeroFurnitureType {
      return HeroFurnitureType.Small;
    },
    hangingFurnitureType(): HeroFurnitureType {
      return HeroFurnitureType.Hanging;
    },
  },
});
</script>

<style scoped lang="scss">

</style>
