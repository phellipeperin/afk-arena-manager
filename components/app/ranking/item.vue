<template>
  <div class="ranking-item ma-2">
    <ui-card
      :title="title"
      class="ranking-item--card"
    >
      <app-ranking-podium :podium="podium" />
    </ui-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Podium from '~/application/domain/ranking/podium';

export default Vue.extend({
  props: {
    title: { type: String, required: true },
    podium: { type: Podium, required: true },
  },
});
</script>

<style scoped lang="scss">
.ranking-item {
  width: 240px;
  height: 200px;

  &--card {
    height: 200px;
  }
}
</style>
