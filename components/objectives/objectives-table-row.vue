<template>
  <v-row>
    <v-col
      cols="6"
      sm="3"
      md="2"
      class="d-flex align-center justify-center"
    >
      <hero-list-player-item :hero="item.playerHero" />
    </v-col>
    <v-col
      cols="6"
      sm="3"
      md="2"
      class="d-flex align-center justify-center"
    >
      <hero-list-player-item :hero="item.objectiveHero" />
    </v-col>
    <v-col
      v-show="$vuetify.breakpoint.smAndUp"
      sm="6"
      md="4"
      class="d-flex align-center justify-center"
    >
      Missing Info
    </v-col>
    <v-col
      v-show="$vuetify.breakpoint.mdAndUp"
      md="4"
      class="d-flex align-center justify-center"
    >
      Resources Needed
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroObjectiveCompare from '~/application/domain/objectives/heroObjectiveCompare';

export default Vue.extend({
  props: {
    item: { type: HeroObjectiveCompare, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
