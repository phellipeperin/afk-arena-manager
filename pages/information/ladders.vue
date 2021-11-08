<template>
  <div>
    <ui-page-header title="Ladders">
      <template #explanation>
        <h6 class="text-h6">
          Points Calculation
        </h6>
        <p class="text-body-2">
          Please be aware that this values can slightly differ from the ones in-game. That's because the game consider the legendary-tier heroes as well.
        </p>
      </template>
    </ui-page-header>

    <section v-if="!loading">
      {{ ladder }}
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
  created(): void {
    this.ladder = generateLadder(this.$store.getters['hero/userHeroList'](this.$store.state.friend.list));
    this.loading = false;
  },
});
</script>

<style scoped lang="scss">

</style>
