<template>
  <section>
    <ui-page-help-info>
      <ui-sub-header text="Points Calculation" />
      <p class="text-body-2">
        Please be aware that this values can slightly differ from the ones in-game. That's because the game consider the legendary-tier heroes as well.
      </p>
    </ui-page-help-info>

    <ui-card-skeleton-loader v-if="loading" />
    <section v-else>
      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
        <ladder-faction />
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
        <ladder-division />
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 2">
        <ladder-type />
      </ui-content-container>

      <ui-content-container v-show="$store.state.system.pageState.selectedTab === 3">
        <ladder-role />
      </ui-content-container>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import User from '~/application/domain/user/user';
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
      loading: true,
    };
  },
  async created(): Promise<void> {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Ladders',
      helpInfoEnabled: true,
      tabs: ['Faction', 'Class', 'Type', 'Role'],
    });

    const allUsers: Array<User> = [this.$store.state.user.user, ...this.$store.state.friend.list];
    for (const user of allUsers) {
      const heroList = this.getPlayerBaseHeroList(user.id);
      if (!heroList.length) {
        await this.$store.dispatch('hero/loadHeroesForUser', user.id);
      }
    }
    await this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
    setTimeout(() => {
      this.loading = false;
    }, 50);
  },
  methods: {
    getPlayerBaseHeroList(playerId: string): Array<Hero> {
      return this.$store.getters['hero/baseHeroList'](playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
