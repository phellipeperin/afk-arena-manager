<template>
  <ui-card
    :title="item.playerHero.gameInfo.name"
    class="objective-item my-2 mx-4"
  >
    <div class="image-container d-flex mb-4">
      <hero-list-player-item
        :hero="item.playerHero"
        not-selectable
        small
        class="current-hero"
      />
      <hero-list-player-item
        :hero="item.objectiveHero"
        not-selectable
        simple
      />
    </div>
    <objectives-resources-needed
      :resources="item.resourcesNeeded"
      :faction="item.playerHero.gameInfo.faction"
      class="mt-10 pt-2"
    />
  </ui-card>
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
.objective-item {
  width: 420px;

  .image-container {
    position: absolute;
    top: 0;
    right: 12px;

    .current-hero {
      margin-top: 4px;
      margin-right: -8px;
      filter: grayscale(1);
    }
  }
}
</style>
