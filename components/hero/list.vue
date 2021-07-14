<template>
  <div class="d-flex full-width">
    <div
      v-if="adminView"
      class="full-width"
    >
      <span class="text-body-2">A total of {{ $store.state.hero.list.length }} heroes is registered.</span>

      <transition-group
        name="fade"
        class="d-flex flex-wrap justify-space-around"
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
      <span class="text-body-2">Showing {{ getPlayerHeroList().length }} of {{ $store.state.hero.list.length }} heroes.</span>

      <ui-no-result v-if="!getPlayerHeroList().length" />

      <transition-group
        appear
        name="fade"
        class="d-flex flex-wrap justify-space-around"
      >
        <hero-list-player-item
          v-for="hero in getPlayerHeroList()"
          :key="hero.id"
          :hero="hero"
          @select="() => select(hero)"
        />
      </transition-group>
    </div>

    <hero-filter v-if="!adminView" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Hero from '~/application/domain/hero/hero';

export default Vue.extend({
  props: {
    adminView: { type: Boolean, required: false, default: false },
  },
  watch: {
    '$store.state.filter': {
      deep: true,
      immediate: true,
      handler(): void {
        this.$store.dispatch('hero/filterChange', this.$store.state.filter);
        this.$forceUpdate();
      },
    },
    '$store.state.hero.playerHeroList': {
      deep: true,
      handler(): void {
        this.$store.dispatch('hero/filterChange', this.$store.state.filter);
        this.$forceUpdate();
      },
    },
  },
  methods: {
    getPlayerHeroList(): Array<Hero> {
      return this.$store.getters['hero/heroList'](this.$store.state.user.user.id);
    },
    select(hero: Hero): void {
      this.$store.commit('hero/SET_HERO', hero);
      this.$emit('select');
    },
  },
});
</script>

<style scoped lang="scss">
.fade-enter-active {
  transition: opacity ease .4s .3s;
}
.fade-leave-active {
  transition: opacity ease .3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
