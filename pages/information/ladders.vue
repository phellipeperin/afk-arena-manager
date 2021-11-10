<template>
  <div>
<!--      <template #explanation>-->
<!--        <h6 class="text-h6">-->
<!--          Points Calculation-->
<!--        </h6>-->
<!--        <p class="text-body-2">-->
<!--          Please be aware that this values can slightly differ from the ones in-game. That's because the game consider the legendary-tier heroes as well.-->
<!--        </p>-->
<!--      </template>-->

    <section v-if="!loading">
      <ladder-container :ladder="ladder" />
    </section>

    <v-row v-show="loading">
      <v-col
        v-for="n in 4"
        :key="n"
        cols="12"
        sm="3"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { generateLadder } from '~/application/services/ladder/ladderService';
import Ladder from '~/application/domain/ladder/ladder';
import User from '~/application/domain/user/user';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  loading: boolean;
  ladder: Ladder;
}

export default Vue.extend({
  meta: {
    role: 'PLAYER',
  },
  data(): ComponentData {
    return {
      loading: true,
      ladder: new Ladder(),
    };
  },
  async created(): Promise<void> {
    this.$store.commit('system/SET_PAGE_STATE', {
      title: 'Ladders',
    });

    const allUsers: Array<User> = [this.$store.state.user.user, ...this.$store.state.friend.list];
    for (const user of allUsers) {
      const heroList = this.getPlayerBaseHeroList(user.id);
      if (!heroList.length) {
        await this.$store.dispatch('hero/loadHeroesForUser', user.id);
      }
    }
    await this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);

    this.ladder = generateLadder(this.$store.getters['hero/userHeroList'](allUsers));
    this.loading = false;
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
