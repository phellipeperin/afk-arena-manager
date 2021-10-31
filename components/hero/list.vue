<template>
  <div class="d-flex full-width">
    <div
      v-if="!playerId"
      class="full-width"
    >
      <transition-group
        name="fade"
        class="d-flex flex-wrap"
      >
        <hero-list-admin-item
          v-for="hero in $store.state.hero.list"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>
    <div
      v-else
      class="full-width"
    >
      <v-row v-show="loading">
        <v-col
          v-for="n in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
          :key="n"
          cols="12"
          sm="2"
        >
          <v-skeleton-loader type="card" />
        </v-col>
      </v-row>

      <ui-no-result v-if="!loading && !getPlayerHeroList().length" />

      <hero-list-inner
        v-if="!loading && getPlayerHeroList().length"
        :list="getPlayerHeroList()"
        @select="select"
      />
    </div>

    <hero-filter v-if="showFilter" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  loading: boolean;
}

export default Vue.extend({
  props: {
    showFilter: { type: Boolean, required: false, default: false },
    playerId: { type: String, required: false, default: '' },
  },
  data(): ComponentData {
    return {
      loading: true,
    };
  },
  watch: {
    '$store.state.filter.current': {
      deep: true,
      immediate: true,
      handler(): void {
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        this.$emit('update', this.$store.state.hero.list.length, this.getPlayerHeroList().length);
        this.$forceUpdate();
      },
    },
    '$store.state.hero.playerHeroList': {
      deep: true,
      handler(): void {
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        this.$emit('update', this.$store.state.hero.list.length, this.getPlayerHeroList().length);
        this.$forceUpdate();
      },
    },
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
        this.$emit('update', this.$store.state.hero.list.length, this.getPlayerHeroList().length);
        this.loading = false;
        this.$forceUpdate();
      },
    },
  },
  created() {
    this.$emit('update', this.$store.state.hero.list.length, this.getPlayerHeroList().length);
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
    select(hero: Hero): void {
      this.$store.commit('hero/SET_HERO', hero);
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">

</style>
