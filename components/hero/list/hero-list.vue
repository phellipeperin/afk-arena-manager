<template>
  <section class="d-flex full-width">
    <div
      v-if="type === 'ADMIN'"
      class="full-width"
    >
      <transition-group
        name="fade"
        class="d-flex flex-wrap"
      >
        <hero-list-admin-item
          v-for="hero in adminHeroList"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>
    <div
      v-if="type === 'PLAYER'"
      class="full-width"
    >
      <ui-card-skeleton-loader v-if="loading" />

      <ui-no-result v-if="!loading && !getPlayerHeroList().length" />

      <hero-list-inner
        v-if="!loading && getPlayerHeroList().length"
        :list="getPlayerHeroList()"
        :mode="mode"
        @select="select"
      />
    </div>
    <div
      v-if="type === 'OBJECTIVE'"
      class="full-width"
    >
      <ui-card-skeleton-loader v-if="loading" />

      <ui-no-result v-if="!loading && !getObjectiveHeroList().length" />

      <hero-list-inner
        v-if="!loading && getObjectiveHeroList().length"
        :list="getObjectiveHeroList()"
        :mode="mode"
        simple
        @select="select"
      />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

interface ComponentData {
  loading: boolean;
}

export default Vue.extend({
  props: {
    playerId: { type: String, required: false, default: '' },
    groupId: { type: String, required: false, default: '' },
    type: { type: String, required: false, default: 'PLAYER', validator(value) { return ['ADMIN', 'PLAYER', 'OBJECTIVE'].includes(value); } },
    mode: { type: String, required: false, default: 'NORMAL', validator(value) { return ['NORMAL', 'QUICK'].includes(value); } },
  },
  data(): ComponentData {
    return {
      loading: true,
    };
  },
  computed: {
    adminHeroList(): Array<Hero> {
      const newList = [...this.$store.state.hero.list];
      return newList.sort((a: Hero, b: Hero) => a.gameInfo.name > b.gameInfo.name ? 1 : b.gameInfo.name > a.gameInfo.name ? -1 : 0);
    },
  },
  watch: {
    '$store.state.filter.current': {
      deep: true,
      immediate: true,
      handler(): void {
        this.loading = true;
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        setTimeout(() => {
          this.loading = false;
          this.$forceUpdate();
        }, 50);
      },
    },
    '$store.state.hero.playerHeroList': {
      handler(): void {
        this.$store.dispatch('hero/filterChange', this.$store.state.filter.current);
        this.$forceUpdate();
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.playerId);
    },
    getObjectiveHeroList(): Array<Hero> {
      const newList = [...this.$store.getters['hero/objectiveHeroList'](this.groupId)];
      return newList.sort((a: Hero, b: Hero) => a.gameInfo.name > b.gameInfo.name ? 1 : b.gameInfo.name > a.gameInfo.name ? -1 : 0);
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
