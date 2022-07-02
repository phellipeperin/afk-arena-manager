<template>
  <article>
    <v-container fluid>
      <ui-no-result
        v-if="!objectiveList.length"
        full-width
        text="No Objectives to Achieve."
      />

      <v-row v-if="objectiveList.length">
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
          v-show="$vuetify.breakpoint.smAndUp"
          sm="6"
          md="4"
          class="d-flex align-center justify-center"
        />
        <v-col
          v-show="$vuetify.breakpoint.mdAndUp"
          md="4"
          class="d-flex align-center justify-center"
        >
          Resources Needed
        </v-col>
      </v-row>

      <objectives-table-row
        v-for="item in objectiveList"
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
  objectiveList: Array<HeroObjectiveCompare>;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    guildId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      objectiveList: [],
    };
  },
  created(): void {
    const playerHeroes = this.$store.getters['hero/baseHeroList'](this.playerId);
    const objectiveHeroes = this.$store.getters['hero/objectiveHeroList'](this.guildId);
    this.objectiveList = getHeroObjectiveDifferences(playerHeroes, objectiveHeroes);
  },
});
</script>

<style scoped lang="scss">

</style>
