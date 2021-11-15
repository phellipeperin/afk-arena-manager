<template>
  <section>
    <ui-page-help-info>
      <p class="text-body-2">
        Please be aware that if you ever used the swap scroll on your heroes, the tree calculated here can be different from the one in the game.
      </p>
      <p class="text-body-2">
        That happens because after using the swap scroll, the game doesn't remove the droplets earned from the hero that was reverted, giving an inaccurate result.
      </p>
    </ui-page-help-info>

    <ui-content-container
      v-show="$store.state.system.pageState.selectedTab === 0"
      :loading="loading"
    >
      <app-compare>
        <template #user>
          <resources-elder-tree :player-id="$store.state.user.user.id" />
        </template>

        <template v-slot:friend="{ friend }">
          <resources-elder-tree
            disabled
            :player-id="friend.id"
          />
        </template>
      </app-compare>
    </ui-content-container>

    <ui-content-container
      v-show="$store.state.system.pageState.selectedTab === 1"
      :loading="loading"
    >
      <app-compare>
        <template #user>
          <resources-artifacts
            :player-id="$store.state.user.user.id"
            :small="$store.state.compare.onCompare"
          />
        </template>

        <template v-slot:friend="{ friend }">
          <resources-artifacts
            disabled
            :player-id="friend.id"
            :small="$store.state.compare.onCompare"
          />
        </template>
      </app-compare>
    </ui-content-container>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  loading: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      loading: false,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        this.loading = true;
        if (this.$store.state.user.user.id) {
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.$store.state.user.user.id);
          }
        }
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        setTimeout(() => {
          this.loading = false;
        }, 50);
      },
    },
  },
  created(): void {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Resources',
      compareEnabled: true,
      helpInfoEnabled: true,
      tabs: ['Elder Tree', 'Artifacts'],
    });
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.$store.state.user.user.id);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
