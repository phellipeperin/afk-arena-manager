<template>
  <section>
    <ui-page-help-info>
      <ui-sub-header text="Elder Tree Calculation" />
      <p class="text-body-2">
        Please be aware that if you ever used the swap scroll on your heroes, the tree calculated here can be different from the one in the game.
      </p>
      <p class="text-body-2">
        That happens because after using the swap scroll, the game doesn't remove the droplets earned from the hero that was reverted, giving an inaccurate result.
      </p>
    </ui-page-help-info>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <resources-elder-tree :player-id="$store.state.user.user.id" />

      <template #friend="{ friend }">
        <resources-elder-tree
          disabled
          :player-id="friend.id"
        />
      </template>
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      <resources-artifacts
        :player-id="$store.state.user.user.id"
        :small="$store.state.compare.onCompare"
      />

      <template #friend="{ friend }">
        <resources-artifacts
          disabled
          :player-id="friend.id"
          :small="$store.state.compare.onCompare"
        />
      </template>
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Resources',
      compareEnabled: true,
      helpInfoEnabled: true,
      tabs: ['Elder Tree', 'Artifacts'],
    });
  },
});
</script>

<style scoped lang="scss">

</style>
