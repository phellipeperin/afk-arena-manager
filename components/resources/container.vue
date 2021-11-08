<template>
  <v-container fluid>
    <v-row
      v-if="loading"
      class="pa-4"
    >
      <v-col
        v-for="n in 2"
        :key="n"
        cols="12"
        sm="6"
      >
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <v-row v-if="!loading">
      <v-col
        cols="12"
        :sm="onCompare ? 12 : 6"
      >
        <resources-artifacts
          :player-id="playerId"
          :on-compare="onCompare"
          :disabled="disabled"
        />
      </v-col>
      <v-col
        cols="12"
        :sm="onCompare ? 12 : 6"
      >
        <resources-elder-tree
          :player-id="playerId"
          :on-compare="onCompare"
          :disabled="disabled"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: true },
    onCompare: { type: Boolean, required: false, default: false },
    disabled: { type: Boolean, required: false, default: false },
  },
  data(): ComponentData {
    return {
      loading: true,
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
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
  },
});
</script>

<style scoped lang="scss">

</style>
