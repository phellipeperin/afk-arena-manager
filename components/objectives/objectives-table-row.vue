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
      <hero-list-player-item
        :hero="item.objectiveHero"
        simple
      />
    </v-col>
    <v-col
      v-if="$vuetify.breakpoint.mdAndUp"
      md="3"
      class="d-flex justify-center flex-column"
    >
      <p
        v-for="diff in item.differenceInfo"
        :key="diff"
        class="mb-0"
      >
        {{ diff }}
      </p>
    </v-col>
    <v-col
      v-if="$vuetify.breakpoint.smAndUp"
      sm="6"
      md="5"
      class="d-flex align-center justify-center"
    >
      <objectives-resources-needed
        :resources="item.resourcesNeeded"
        :faction="item.playerHero.gameInfo.faction"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroObjectiveCompareItem from '~/application/domain/objectives/heroObjectiveCompareItem';

export default Vue.extend({
  props: {
    item: { type: HeroObjectiveCompareItem, required: true },
  },
});
</script>

<style scoped lang="scss">

</style>
