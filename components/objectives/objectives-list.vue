<template>
  <section>
    <ui-no-result
      v-if="!objective.items.length"
      full-width
      text="No Objectives to Achieve."
    />

    <div
      v-if="objective.items.length"
      class="d-flex flex-wrap"
    >
      <objectives-list-item
        v-for="item in objective.items"
        :key="item.playerHero.id"
        :item="item"
      />
    </div>

    <v-divider
      v-if="objective.items.length"
      class="my-4"
    />

    <ui-card
      v-if="objective.items.length"
      title="Totals"
    >
      <template #toolbar-info>
        <p class="text-subtitle font-weight-bold ma-0">
          {{ objective.items.length }} heroes
        </p>
      </template>
      <objectives-resources-needed
        :resources="objective.totalResourcesNeeded"
        class="my-4"
      />
    </ui-card>
  </section>
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
    groupId: { type: String, required: true },
  },
  data(): ComponentData {
    return {
      objective: new HeroObjectiveCompare(),
    };
  },
  created(): void {
    const playerHeroes = this.$store.getters['hero/baseHeroList'](this.playerId);
    const objectiveHeroes = this.$store.getters['hero/objectiveHeroList'](this.groupId);
    this.objective = getHeroObjectiveDifferences(playerHeroes, objectiveHeroes);
  },
});
</script>

<style scoped lang="scss">

</style>
