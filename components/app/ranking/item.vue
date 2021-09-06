<template>
  <div class="ranking-item">
    <ui-card :title="title">
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
  width: 260px;
}
</style>
