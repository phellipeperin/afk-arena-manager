<template>
  <article>
    <v-container fluid>
      <ui-no-result
        v-if="!objective.items.length"
        full-width
        text="No Objectives to Achieve."
      />

      <v-row v-if="objective.items.length">
        <v-col
          cols="6"
          sm="3"
          md="2"
          class="d-flex align-center justify-center"
        >
          Current Hero
        </v-col>
        <v-col
          cols="6"
          sm="3"
          md="2"
          class="d-flex align-center justify-center"
        >
          Target Hero
        </v-col>
        <v-col
          v-if="$vuetify.breakpoint.mdAndUp"
          md="3"
          class="d-flex align-center justify-center"
        />
        <v-col
          v-if="$vuetify.breakpoint.smAndUp"
          sm="6"
          md="5"
          class="d-flex align-center justify-center"
        >
          Resources Needed
        </v-col>
      </v-row>

      <objectives-table-row
        v-for="item in objective.items"
        :key="item.playerHero.id"
        :item="item"
      />
    </v-container>
  </article>
</template>

<script lang="ts">
import Vue from 'vue';
import HeroObjectiveCompare from '~/application/domain/objectives/heroObjectiveCompare';
import { getHeroObjectiveDifferences } from '~/application/services/objective/heroObjectiveService';

interface ComponentData {
  objective: HeroObjectiveCompare;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    guildId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      objective: [],
    };
  },
  created(): void {
    const playerHeroes = this.$store.getters['hero/baseHeroList'](this.playerId);
    const objectiveHeroes = this.$store.getters['hero/objectiveHeroList'](this.guildId);
    this.objective = getHeroObjectiveDifferences(playerHeroes, objectiveHeroes);
  },
});
</script>

<style scoped lang="scss">

</style>
