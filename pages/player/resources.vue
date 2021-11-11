<template>
  <section>
    <ui-page-help-info>
      <h6 class="text-h6">
        Elder Tree
      </h6>
      <p class="text-body-2">
        Please be aware that if you ever used the swap scroll on your heroes, the tree calculated here can be different from the one in the game.
      </p>
      <p class="text-body-2">
        That happens because after using the swap scroll, the game doesn't remove the droplets earned from the hero that was reverted, giving an inaccurate result.
      </p>
    </ui-page-help-info>

<!--    <v-row-->
<!--      v-if="loading"-->
<!--      class="pa-4"-->
<!--    >-->
<!--      <v-col-->
<!--        v-for="n in 2"-->
<!--        :key="n"-->
<!--        cols="12"-->
<!--        sm="6"-->
<!--      >-->
<!--        <v-skeleton-loader type="card" />-->
<!--      </v-col>-->
<!--    </v-row>-->


    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 0">
      <resources-elder-tree
        :player-id="$store.state.user.user.id"
        :on-compare="onCompare"
      />
    </ui-content-container>

    <ui-content-container v-show="$store.state.system.pageState.selectedTab === 1">
      <resources-artifacts
        :player-id="$store.state.user.user.id"
        :on-compare="onCompare"
      />
    </ui-content-container>

<!--    <app-compare-container-->
<!--      :on-compare="onCompare"-->
<!--      @changeFriendOne="changeFriendOne"-->
<!--      @changeFriendTwo="changeFriendTwo"-->
<!--    >-->
<!--      <template #fallback>-->
<!--        <resources-container :player-id="$store.state.user.user.id" />-->
<!--      </template>-->

<!--      <template #user>-->
<!--        <resources-container-->
<!--          on-compare-->
<!--          :player-id="$store.state.user.user.id"-->
<!--        />-->
<!--      </template>-->

<!--      <template #friend-one>-->
<!--        <resources-container-->
<!--          on-compare-->
<!--          disabled-->
<!--          :player-id="friendOneId"-->
<!--        />-->
<!--      </template>-->

<!--      <template #friend-two>-->
<!--        <resources-container-->
<!--          on-compare-->
<!--          disabled-->
<!--          :player-id="friendOneTwo"-->
<!--        />-->
<!--      </template>-->
<!--    </app-compare-container>-->
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  onCompare: boolean;
  friendOneId: string;
  friendOneTwo: string;
  loading: boolean;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      onCompare: false,
      friendOneId: '',
      friendOneTwo: '',
      loading: false,
    };
  },
  watch: {
    playerId: {
      immediate: true,
      async handler(): Promise<void> {
        this.loading = true;
        if (this.playerId) {
          const heroList = this.getPlayerHeroList();
          if (!heroList.length) {
            await this.$store.dispatch('hero/loadHeroesForUser', this.playerId);
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
    setCompare(state: boolean): void {
      this.onCompare = state;
    },
    changeFriendOne(id: string): void {
      this.friendOneId = id;
    },
    changeFriendTwo(id: string): void {
      this.friendOneTwo = id;
    },
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
